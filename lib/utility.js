import { readFile, writeFile } from "./filesystem.js";

const CHANGELOG = 'CHANGELOG';
const CHANGELOG_TEMPLATE = 'next-changelog.tmpl';

const getVersion = async () => {
	const packageString = await readFile('package.json');
	const packageStruct = JSON.parse(packageString);
	return packageStruct.version;
};

const getTemplate = async () => {
	const template = await readFile(CHANGELOG_TEMPLATE);
	return template;
};

const generateChangelog = ({template, version, date}) => {
	const changelog = template.replace('{{NEXT}}', `${version} - ${date}`);

	return changelog;
}

const updateTemplate = ({template, version, date}) => {
	const newTemplate = template.replace('{{NEXT}}', `{{NEXT}}\n\n${version} - ${date}`);

	return newTemplate;
}

const writeChangelog = ({changelog}) => {
	writeFile({filename: CHANGELOG, contents: changelog});
}

const writeTemplate = ({template}) => {
	writeFile({filename: CHANGELOG_TEMPLATE, contents: template});
}

export {getVersion, getTemplate, generateChangelog, updateTemplate, writeChangelog, writeTemplate};
