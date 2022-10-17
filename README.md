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

Create (or update) your _`.npmignore`_ file to prevent the changelog template from being included in your package when you publish it:

_`.npmignore`_
```
# Whatever may already be in this file
next-changelog.tmpl
```
