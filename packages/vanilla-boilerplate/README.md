# @cubbles/vanilla-boilerplate

This package contains a boilerplate to implement Cubbles components using vanilla javascript.

## Setup YOUR package on top of this template

### Step 1: GIT - Clone

```bash
$ git clone https://github.com/cubblesmasters/vanilla.git <your-package-name>
```

### Step 2: GIT - Change the origin

```bash
$ git remote rm origin
$ git remote add origin git@github.com:<your-git>/<your-package-name>.git
$ git config master.remote origin
$ git config master.merge refs/heads/master
```

### Step 3: NPM - Init the package for your purposes

```bash
$ npm init
...
```

Now it's yours ... have fun ;-).

## Development scripts

This boilerplate includes a set of scripts to build, locally deploy, validate and upload your webpackages using npm as follows:

```bash
npm run [script-name]
```

Also, you can install [ntl](https://www.npmjs.com/package/ntl) globally and then run it to access the scripts as shown below:

```bash
$ ntl
✔  Npm Task List - v3.0.0
? Select a task to run: (Use arrow keys)
❯ build
  build:watch
  build:prod
  clean
  upload
  upload:prod
  validate-manifest
(Move up and down to reveal more choices)
```

> For more information about available scripts check [this](https://cubbles.gitbook.io/docs/v/coder-template-doc/developing-vanilla-boilerplate/available-scripts).
