# Dart Sass: in the browser

## Quickstart

Clone the `dart-sass` repository (outside this one) and build the JS package:

```
git clone https://github.com/oddbird/dart-sass
cd dart-sass
git switch <branch you want to test>
dart pub get
dart run grinder pkg-npm-dev
```
Copy the results into the `build/` folder of this repo:

```
cp -r dart-sass/build sass-browser/build
```

Install dependencies and start the Vite dev server:

```
yarn
yarn dev
```

Visit http://localhost:8080
