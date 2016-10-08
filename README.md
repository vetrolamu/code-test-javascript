# Bowling Challenge

## Goals

1. Create Bowling scoring tool according to [requirements](./docs/REQUIREMENTS.md).
2. Make it scalable and maintanable
3. Deploy it somwhere (e.g. Heroku)
4. Add some gamification features
5. Have fun!

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

#### Linting

I use [ESLint](http://eslint.org/) as linting utility
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
