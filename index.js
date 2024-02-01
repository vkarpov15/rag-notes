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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('App listening on port', port);
};