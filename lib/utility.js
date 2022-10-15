import { open } from 'fs/promises';

const CHANGELOG = 'CHANGELOG';
const CHANGELOG_TEMPLATE = 'next-changelog.tmpl';

const readFile = async (filename) => {
	let filehandle;
	let contents = undefined;
	
	try {
		filehandle = await open(filename, 'r');
		contents = await filehandle.readFile();
	} finally {
		await filehandle?.close();
	}

	return contents?.toString();
};

const writeFile = async ({filename, contents}) => {
	let filehandle;

	try {
		filehandle = await open(filename, 'w');
		await filehandle.writeFile(contents);
	} finally {
		await filehandle?.close();
	}
}

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
