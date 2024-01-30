'use strict';

const dotenv = require('dotenv');
dotenv.config();

const backend = require('./backend');
const { execSync } = require('child_process');
const express = require('express');

execSync('npm run tailwind');

main().catch(error => {
  console.error(error);
  process.exit(-1);
});

async function main() {
  const { app } = await backend();
  app.use(express.static('./frontend'));

  await app.listen(3000);
  console.log('App listening on port 3000');
};