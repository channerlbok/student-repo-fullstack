# Homework 3

[MDN Express tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/skeleton_website), Parts 2-6.

## Install

From `hw3/`, using Node.js 22.9 or newer:

```bash
npm ci
```

## Express

Create `express/.env` from `.env.example` and set `MONGODB_URI`.

```bash
npm run seed
npm run dev
```

Run the seed command once. Open http://localhost:3000/catalog.

Tutorial fixes: dates no longer shift by a day, and blank selections or deleted copies no longer cause form errors.
