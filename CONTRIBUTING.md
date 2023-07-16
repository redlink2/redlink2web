# Contributing to Redlink2Web

First off, thank you for considering contributing to Redlink2Web. It's people like you that make Redlink2Web such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork Redlink2Web and create a branch with a descriptive name.

A good branch name would be (where issue #123 is the ticket you're working on):

```shell
git checkout -b 123-add-new-feature
```

## Get the test suite running

Make sure you're using a recent version of Node.js. Then:

```shell
yarn install
yarn test
```

Make sure the tests pass before you start your work. This will help you ensure that your changes aren't breaking anything.

## Make your changes

Make the changes you want to make. Try to keep your changes small and focused. If the changes start to feel like they're getting large, that might be a good time to get feedback.

## Create a pull request

At this point, you should switch back to your master branch and make sure it's up to date with Redlink2Web's master branch:

```shell
git remote add upstream git@github.com:redlink2/redlink2web.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```shell
git checkout 123-add-new-feature
git rebase master
git push --set-upstream origin 123-add-new-feature
```

Finally, go to GitHub and [make a Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) :D
