import * as editor from './EditProgram.js';
var freq = 4;
var pgID = 3;


var form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', 
    function(event) {
        event.stopPropagation();
        event.preventDefault();
        editor.editFrequency(pgID, freq);
    })
} else {console.log('Duma!!!!')}