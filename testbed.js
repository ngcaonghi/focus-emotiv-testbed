import { editFrequency } from './EditProgram.js';
var freq = 4;
var form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', 
    function(event) {
        event.stopPropagation();
        event.preventDefault();
        editFrequency(3, freq);
    })
} else {console.log('Duma!!!!')}