'use strict';

const dotenv = require('dotenv');
dotenv.config();

const Note = require('./backend/db/note');
const db = require('./backend/db');

main().catch(error => {
  console.error(error);
  process.exit(-1);
});

async function main() {
  await db();
  await Note.db.dropCollection('notes');
  await Note.createCollection({
    vector: {
      dimension: 1536,
      metric: 'cosine'
    }
  });
  console.log('Done');
};