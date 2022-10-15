import { open } from 'fs/promises';

const getVersion = async () => {
	let filehandle;
	let version = undefined;
	try {
		filehandle = await open('package.json', 'r');
		const packageString = await filehandle.readFile();
		const packageStruct = JSON.parse(packageString);
		version = packageStruct.version;
	} finally {
		await filehandle?.close();
	}
	return version;
}

export {getVersion};
