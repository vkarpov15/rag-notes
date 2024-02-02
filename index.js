'use strict';

const dotenv = require('dotenv');
dotenv.config();

const backend = require('./backend');
const express = require('express');

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