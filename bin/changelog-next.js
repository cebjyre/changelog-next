#!/usr/bin/env node

import { getVersion } from "../lib/index.js";

console.log(await getVersion())
