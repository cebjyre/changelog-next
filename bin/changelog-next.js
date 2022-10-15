#!/usr/bin/env node

import { getTemplate, getVersion, generateChangelog, updateTemplate, writeChangelog, writeTemplate } from "../lib/index.js";

const version = await getVersion();
const template = await getTemplate();
const now = new Date();
const currDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;

writeTemplate({template: updateTemplate({template, version, date: currDate})});
writeChangelog({changelog: generateChangelog({template, version, date: currDate})});
