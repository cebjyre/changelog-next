# @glenn.fowler/changelog-next
Changelog generator based on perl's [Dist::Zilla](https://dzil.org) distribution builder (specifically (part of) [Dist::Zilla::Plugin::NextRelease](https://metacpan.org/pod/Dist::Zilla::Plugin::NextRelease)) for use with npm packages.

## Usage

### Install the package

```shell
npm install -D @glenn.fowler/changelog-next
```

### Create a _`next-changelog.tmpl`_ template file that will serve as the basis for the actual changelog:

```
This is my shiny changelog!

{{NEXT}}
Security fix
Support for custom configuration

1.0.0 - 2022-01-01
The initial release, it was pretty good.
```

This needs a `{{NEXT}}` placeholder token which marks the location for you to specify the changes that belong to the current development cycle.

When the changelog generator is run, the current version and date will replace the `{{NEXT}}` token and this will be saved to the _`CHANGELOG`_ file; the _`next-changelog.tmpl`_ file will have this version & date locked in for the current changes, but will also preserve the `{{NEXT}}` placeholder ready for noting future changes:

Generated _`CHANGELOG`_
```
This is my shiny changelog!

1.1.0 - 2022-10-10
Security fix
Support for custom configuration

1.0.0 - 2022-01-01
The initial release, it was pretty good.
```

Updated _`next-changelog.tmpl`_
```
This is my shiny changelog!

{{NEXT}}

1.1.0 - 2022-10-10
Security fix
Support for custom configuration

1.0.0 - 2022-01-01
The initial release, it was pretty good.
```

### Additional configuration

Add the generator script to your _`package.json`_'s `script.version` section to automatically update the changelog files when running `npm version`:

_`package.json`_
```json
{
	// ...
	"scripts": {
		"version": "changelog-next && git add next-changelog.tmpl CHANGELOG",
		// ...
	},
	// ...
}
```

To use a different changelog filename, use the `-o` flag (currently the available filenames are limited, see the code in `filesystem.js`) - update the `git add` code appropriately as well:

_`package.json`_
```json
{
	// ...
	"scripts": {
		"version": "changelog-next -o CHANGELOG.md && git add next-changelog.tmpl CHANGELOG.md",
		// ...
	},
	// ...
}
```

#### Optionally prevent the changelog template from being included in your package when you publish it:

If you are using the _`.npmignore`_ file you can add to it:

_`.npmignore`_
```
# Whatever may already be in this file
next-changelog.tmpl
```

**Note the (potentially) unintended consequence of using a _`.npmignore`_ file being that the _`.gitignore`_ that may otherwise be filtering out files from your generated package will be disregarded - see https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d**

Otherwise you can use the `files` property of _`package.json`_ to whitelist exactly the files you wish to be included in your package. If this seems like too much effort, you can just let the changelog template be included in the generated package - it really isn't that big a deal.

## Questions

### Why not just use conventional commits and generate the changelog using one of the existing packages fully automatically?
I haven't (so far) been sold on the conventional commits approach - I can see the value in it, but personally I like being able to be more flexible with commit messages, and able to precisely craft changelog items without impacting the commit log. This package is scratching my own itch, and if there are other tools that serve your needs better, great!

### This package is pretty limited and inflexible; why no configuration ability?
I currently have no expectation that this will get any real usage from other people; complexity that doesn't actually help anyone doesn't seem worthwhile at this stage. If you do want to use it but are running into limitations, please create an issue (or a pull request).
