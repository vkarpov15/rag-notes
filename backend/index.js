'use strict';

const { addAsync } = require('@awaitjs/express');
const answerQuestion = require('./api/answerQuestion');
const db = require('./db');
const express = require('express');
const saveNote = require('./api/saveNote');

module.exports = async function backend() {
  await db();

  const app = addAsync(express());
  app.use(express.json());

  app.putAsync('/answerQuestion', answerQuestion);
  app.putAsync('/saveNote', saveNote);

  await app.listen(3000);
  console.log('App listening on port 3000');
};