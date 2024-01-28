'use strict';

const Note = require('../db/note');
const axios = require('axios');

module.exports = async function saveNote(req, res) {
  const content = req.body.content;
  const $vector = await createEmbedding(content);

  const note = await Note.create({ content, $vector });
  return res.json({ note });
};

function createEmbedding(input) {
  return axios({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    data: {
      model: 'text-embedding-ada-002',
      input
    }
  }).then(res => res.data.data[0].embedding);
}