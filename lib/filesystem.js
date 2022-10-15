import { open } from 'fs/promises';

export const readFile = async (filename) => {
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

export const writeFile = async ({filename, contents}) => {
	let filehandle;

	try {
		filehandle = await open(filename, 'w');
		await filehandle.writeFile(contents);
	} finally {
		await filehandle?.close();
	}
}
