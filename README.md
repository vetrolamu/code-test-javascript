# Bowling Challenge
https://bowling-scoring.herokuapp.com/

## Goals

1. ✓ Create Bowling scoring tool according to [requirements](./docs/REQUIREMENTS.md).
2. ✓ Make it scalable and maintanable
3. ✓ Deploy it somwhere (e.g. Heroku)
4. ✓ Have fun!

## What can be done next

1. Use [Immutable.js](https://facebook.github.io/immutable-js/). It fits perfectly to Redux and pure functions 
2. Store data in Local Storage and restore state of the application
3. Update webpack configs (using of images for example)
4. Use server render. Not sure it is necessary now, but when the app will grow, it will greatly reduce
the time of first render.

## Instructions

#### Installation

```bash
npm install
```

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
npm run serve
```

or

```bash
# npm run build && npm run serve
npm start
```

#### Unit Tests

I use [Jest](https://facebook.github.io/jest/) for tests. I'm not guru here but it looks like powerful tool.

```bash
npm run test
```

#### Linting

I use [ESLint](http://eslint.org/) as linting utility.
```bash
npm run lint
```

## Why React

You do not need any libraries or tools for implementation of base requirements. For business logic 
you can simply use the module pattern.

Disadvantages appear when you need to implement work with the DOM. When you need to create scoreboard in 
single-player game you'll probably do it this way:

```js
const table = document.createElement('table');
const headRow = table.createTHead().insertRow();
const body = table.createTBody();
const playerRow = tableBody.insertRow();

table.className = 'scoreboard';
headRow.className = 'scoreboard__headRow';
playerRow.className = 'scoreboard__playerRow';
... // And for each frame create cell; after it you'll update these cells after rolls.
```

It may be enough for a small application, but when you want to make a really cool and flexible app, 
you need to think in advance about scalability, maintanability.

And using of React solves this problem for me.

## Why Redux

1. Separation of data and presentation
2. One way data flow makes application more predictable
3. Pure functions make your code predictable, well-read and suit well for testing
4. Single store is great for development and debugging
