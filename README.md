⚠️ [Native browser support](https://github.com/sass/dart-sass#dart-sass-in-the-browser) has landed in Dart Sass! This repository is no longer useful or necessary ⚠️

# Dart Sass running in the browser

## Quickstart

Install dependencies and start the Vite dev server. Notice that Vite is only
used to pre-process JS. All Sass styles are placed in `public/` and are not
pre-processed.

```
yarn
yarn dev
```

Visit http://localhost:8080. This executes `main.ts` to demonstrate two `sass`
functions running in the browser:

1. `public/style.scss` is downloaded, compiled, and inserted as the page's
   stylesheet.
1. The contents of the `#style-input` textarea are parsed and the output is
   shown in the `#style-output` textarea. It supports both regular and indented
   syntax.

## How?

The main file is `build/npm/sass.dart.js`, which is copied from [dart-sass
repository](https://github.com/sass/dart-sass) and modified to work in the
browser:

```
git clone https://github.com/sass/dart-sass
cd dart-sass
dart pub get
dart run grinder pkg-npm-dev
```
Copy the results into the `build/` folder of this repo:

```
cp -r dart-sass/build sass-browser/build
```

After that you can manually modify `build/npm/sass.dart.js`. Currently all
modifications made to this file are documented as issues in this repository.
