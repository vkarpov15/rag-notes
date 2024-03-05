'use strict';

const noteFormInput = document.querySelector('#note-form input');
const noteFormButton = document.querySelector('#note-form button');
const noteFormButtonText = noteFormButton.textContent;

const questionFormInput = document.querySelector('#question-form input');
const questionFormButton = document.querySelector('#question-form button');
const questionFormButtonText = questionFormButton.textContent;

const answerWrapper = document.querySelector('#answer-wrapper');
const answerContainer = document.querySelector('#answer-container');

const sourcesWrapper = document.querySelector('#sources-wrapper');
const sourcesContainer = document.querySelector('#sources-container');

const numNotesContainer = document.querySelector('#num-notes');

let numNotes = 0;
fetch('/countNotes')
  .then(res => res.json())
  .then(data => {
    numNotesContainer.innerText = `${data.count} notes saved`;
  })
  .catch(err => {});

document.querySelector('#note-form').addEventListener('submit', ev => {
  ev.preventDefault();

  noteFormButton.disabled = true;
  noteFormButton.innerHTML = '<img class="w-4 h-4 inline" src="/images/loader.gif">';

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: noteFormInput.value })
  };
  fetch('/saveNote', params)
    .then((res) => res.json())
    .then(data => {
      noteFormInput.value = '';
      numNotes = data.count;
      numNotesContainer.innerText = `${numNotes} notes saved`;
    })
    .finally(() => {
      noteFormButton.disabled = false;
      noteFormButton.innerHTML = noteFormButtonText;
    });
});

document.querySelector('#question-form').addEventListener('submit', ev => {
  ev.preventDefault();

  questionFormButton.disabled = true;
  questionFormButton.innerHTML = '<img class="w-4 h-4 inline" src="/images/loader.gif">';

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question: questionFormInput.value })
  };
  fetch('/answerQuestion', params)
    .then((res) => res.json())
    .then(data => {
      answerContainer.innerText = data.choices[0].message.content;
      answerWrapper.style.display = 'block';
      if (data.sources) {
         const sources = data.sources.map(source => 
          `
          <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-500"><span class="font-medium text-gray-900">Sources</span></div>
          </div>
          <p class="text-sm leading-6 text-gray-800" id="sources-container">${source}</p>`
          ).join('\n');
        sourcesContainer.appendChild(sources);
        sourcesWrapper.style.display = 'block';
      }
    })
    .finally(() => {
      questionFormButton.disabled = false;
      questionFormButton.innerHTML = questionFormButtonText;
    });
});