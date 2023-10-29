import { readFile, writeFile } from "./filesystem.js";

const CHANGELOG_TEMPLATE = 'next-changelog.tmpl';

export const getVersion = async () => {
	const packageString = await readFile('package.json');
	const packageStruct = JSON.parse(packageString);
	return packageStruct.version;
};

export const getTemplate = async () => {
	const template = await readFile(CHANGELOG_TEMPLATE);
	return template;
};

export const generateChangelog = ({template, version, date}) => {
	const changelog = template.replace('{{NEXT}}', `${version} - ${date}`);

	return changelog;
}

export const updateTemplate = ({template, version, date}) => {
	const newTemplate = template.replace('{{NEXT}}', `{{NEXT}}\n\n${version} - ${date}`);

	return newTemplate;
}

export const writeChangelog = ({filename, changelog}) => {
	writeFile({filename, contents: changelog});
}

export const writeTemplate = ({template}) => {
	writeFile({filename: CHANGELOG_TEMPLATE, contents: template});
}
