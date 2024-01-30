'use strict';

const Note = require('../db/note');
const axios = require('axios');

module.exports = async function countNotes(req, res) {
  const count = await Note.countDocuments({});
  return res.json({ count });
};