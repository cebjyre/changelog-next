#!/usr/bin/env node

import { getTemplate, getVersion, generateChangelog, updateTemplate, writeChangelog, writeTemplate, filenameIsAllowed } from "../lib/index.js";

let filename = 'CHANGELOG';
if(process.argv[2] === '-o') { // If arguments get trickier, use something smarter
	const providedFilename = process.argv[3];
	if (filenameIsAllowed(providedFilename)){
		filename = providedFilename;
	}
}

const version = await getVersion();
const template = await getTemplate();
const now = new Date();
const currDate = now.toISOString().split('T')[0];

writeTemplate({template: updateTemplate({template, version, date: currDate})});
writeChangelog({filename, changelog: generateChangelog({template, version, date: currDate})});
