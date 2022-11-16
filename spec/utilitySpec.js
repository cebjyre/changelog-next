import { generateChangelog, updateTemplate } from "../lib/utility.js";

describe('generateChangelog', () => {
	const template = `Header
{{NEXT}}
stuff

1.0.0 - 2022-10-10
previous stuff
`;
	const version = '1.1.0';
	const date = '2022-11-11';
	const expectedChangelog = `Header
1.1.0 - 2022-11-11
stuff

1.0.0 - 2022-10-10
previous stuff
`;
	it('Should convert the template to a changelog', () => {
		expect(generateChangelog({template, version, date})).toBe(expectedChangelog);
	});
});

describe('updateTemplate', () => {
	const template = `Header
{{NEXT}}
stuff

1.0.0 - 2022-10-10
previous stuff
`;
		const version = '1.1.0';
		const date = '2022-11-11';
		const expectedTemplate = `Header
{{NEXT}}

1.1.0 - 2022-11-11
stuff

1.0.0 - 2022-10-10
previous stuff
`;
		it('Should convert the template to a changelog', () => {
			expect(updateTemplate({template, version, date})).toBe(expectedTemplate);
		});
});
