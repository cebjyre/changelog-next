import { filenameIsAllowed } from "../lib/filesystem.js";

describe('filenameIsAllowed', () => {
	const validFilenames = ['CHANGELOG', 'Changelog', 'CHANGES', 'Changes', 'CHANGELOG.md', 'CHANGES.md'];

	validFilenames.forEach((filename) => {
		it(`Should allow valid filename ${filename}`, () => {
			expect(filenameIsAllowed(filename)).toBe(true);
		});
	});

	const invalidFilenames = ['../CHANGELOG', 'Change\nlog', 'CHANGES.exe', 'something else entirely'];

	invalidFilenames.forEach((filename) => {
		it(`Should deny invalid filename ${filename}`, () => {
			expect(filenameIsAllowed(filename)).toBe(false);
		});
	});
})
