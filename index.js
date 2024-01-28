'use strict';

const dotenv = require('dotenv');
dotenv.config();

const backend = require('./backend');

main().catch(error => {
  console.error(error);
  process.exit(-1);
});

async function main() {
  await backend();
};