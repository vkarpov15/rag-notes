'use strict';

const Note = require('../db/note');
const axios = require('axios');

module.exports = async function answerQuestion(req, res) {
  const embedding = await createEmbedding(req.body.question);

  const notes = await Note.find().limit(3).sort({ $vector: { $meta: embedding } });

  const prompt = systemPrompt(notes);
  const answers = await makeChatGPTRequest(prompt, req.body.question);
  return res.json({ sources: notes.map(x => ({ content: x.content, createdAt: new Date(x.createdAt).toDateString() })), answer: answers })
};

const systemPrompt = (notes, question) => `
You are a helpful assistant that summarizes relevant notes to help answer a user's questions.
Given the following notes, answer the user's question.

${notes.map(note => 'Note: ' + note.content).join('\n\n')}
`.trim();

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

function makeChatGPTRequest(systemPrompt, question) {
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    data: {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ]
    }
  };

  return axios(options).then(res => res.data);
}