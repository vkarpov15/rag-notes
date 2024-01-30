'use strict';

const { addAsync } = require('@awaitjs/express');
const answerQuestion = require('./api/answerQuestion');
const countNotes = require('./api/countNotes');
const db = require('./db');
const express = require('express');
const saveNote = require('./api/saveNote');

module.exports = async function backend() {
  await db();

  const app = addAsync(express());
  app.use(express.json());

  app.putAsync('/answerQuestion', answerQuestion);
  app.getAsync('/countNotes', countNotes);
  app.putAsync('/saveNote', saveNote);

  return { app };
};