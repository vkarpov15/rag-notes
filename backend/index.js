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

  app.putAsync('/answerQuestion', limitTo100Requests, answerQuestion);
  app.getAsync('/countNotes', countNotes);
  app.putAsync('/saveNote', limitTo100Requests, saveNote);

  return { app };
};

let last100Requests = [];
function limitTo100Requests(req, res, next) {
  if (last100Requests.length < 100) {
    last100Requests.push({
      date: new Date(),
      url: req.url
    });

    next();
  } else {
    const oldestRequest = last100Requests[0];
    if (Date.now() - oldestRequest.date.valueOf() <= 1000 * 60 * 60) {
      res.status(400).send('Rate limit exceeded, API only supports 100 requests/hour currently');
      return;
    }
    last100Requests.shift();
    last100Requests.push({
      date: new Date(),
      url: req.url
    });
    next();
  }
}