# @cubbles/coder-template

> NOTE: Under development. Use it for evaluation purposes only.

# Setup YOUR package on top of this template
## Step 1: GIT - Clone
```
$ git clone https://github.com/cubbles/coder-template.git <your-package-name>
```

## Step 2: GIT - Change the origin
```
$ git remote rm origin
$ git remote add origin git@github.com:<your-git>/<your-package-name>.git
$ git config master.remote origin
$ git config master.merge refs/heads/master
```

## Step 3: NPM - Init the package for your purposes
```
$ npm init
...
```

Now it's yours ... have fun ;-).

## Step 4: CLI support
This requires [ntl](https://github.com/ruyadorno/ntl) to be installed:

```
$ npm run cli
...
```
