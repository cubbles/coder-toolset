# @cubbles/coder-toolset
Development repo for a set of coder tools - following the monorepo approach.
It's purpose is to develop and maintain the `code-template` and all related modules.

## Developer Guide
### PreRequisites
#### Yarn
Follow the install instructions on https://yarnpkg.com.

## Background Knowledge

1. Yarn: https://yarnpkg.com
   * yarn workspaces: https://yarnpkg.com/en/docs/workspaces
   * yarns focused workspaces: https://yarnpkg.com/blog/2018/05/18/focused-workspaces/
1. Lerna: https://lernajs.io
   * Lerna Commands and more: https://github.com/lerna/lerna#readme

### Setup
```sh
# Clone the repo:
$ git clone https://github.com/cubbles/coder-toolset.git

# Install dependencies
$ cd coder-toolset && yarn
```

### Usage
```sh
$ yarn cli
```
----
## New DevTools? > Background Information

### Major differences
1. **"npm" based**: The new CDT are based on the npm approach. The `package.json` is used to manage development tasks and dependencies. The option to define an run scripts via `"npm run <command>"` is used as a replacement for `grunt`.

1. **One webpackage per npm package**: A npm package contains exactly ONE webpackage. For multiple webpackages just create multiple npm packages. The reason for this is the goal of keeping things as simple as possible. You manage and version each webpackage separately. Updates of any development releated tools for a webpackage do not have any side effects.

1. **Dedicated "build" command**: Now we have a `src` folder containing the sources for the webpackage. The structure within the source folder is designed for maintainability and is different from the _final_ webpackage structure. The latter is created using the `npm run build` command.
    * **Usage of "webpack"**: For the `build` of a webpackage we make use of `webpack`. Doing so we can use a bunch of helpful functions provided by `webpack` of `webpack plugins`.\
    We have a top level `webpack.config.js` for the webpackage (within the `src` folder) and dedicated `webpack.subconfig.js` files on artifact level. This allows us to design (and modify) the build for each artifact independently.
    * **Generation of "manifest.webpackage"**: On step of the `build` command is the generation of the `manifest.webpackage` file.\
    We have a top level `MANIFEST.webpackage.js` within the `src` folder and a `MANIFEST.<artifact-type>.js` on artifact level.

1. **Scoped CSS built-in**: The use of `webpack` allows us to easily the scope style definitions in css files. Now by default all css statements are scoped using the name of the webpackage.


### Usage Improvements (`npm` scripts over `grunt` tasks)
In the past the CoderDevTools was realized a separate project `cubbles-coder-devtools`. Different tasks have been implemented based on `grunt`.
The pain points of this approach were mainly the following:
* **`grunt` was big**: Grunt comes with many dependencies a developer has to download.
* **`grunt` was slow**: Executing a grant tasks takes its time.
* **updating the CDT was (too) complicated**: The `cubbles-coder-devtools` are NOT a package you could simply manage as a dependency. It was a `git` repository we mirrored into the webpackage development folder. Initially this was done on project generation time. Afterwards an update of the CDT had to be done by following a guide using `git-subtree`.

Now all development supporting tools are managed as dependencies within the `package.json` and can therefore updated by a simple `npm update` on the commandline.
