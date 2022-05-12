window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	function first(row) {
		return "\"" + row.split(' ').map((item) => '!' + item).join(' ') + "\"";
	}

	function second(row) {
		return "[" + row + "]";
	}

	function third(row) {
		return row.split(' ').map((item) => '+' + item).join(' ');
	}

	function fourth(row) {
		return "'" + row.split(' ').map((item) => '+' + item).join(' ');
	}

	function fifth(row) {
		return "\"" + row + "\"";
	}

	const inputForm = document.querySelector('form'),
				inputText = document.querySelector('.form__textarea'),
				inputBtn = inputForm.querySelector('.form__btn'),
				selects = inputForm.querySelectorAll('select'),
				outputText = document.querySelector('.result__textarea'),
				copyBtn = document.querySelector('.result__btn');
	
	inputText.value = `первая строка ключевых строк\nвторая строка ключевых слов`;
	outputText.value = ''; // text

	inputBtn.addEventListener('click', (e) => {
		e.preventDefault();

		outputText.value = ''; // text

		inputText.value.split(/\r?\n/).forEach(item => {

			selects.forEach(select => {
				switch (select.value) {
					case 'first': 
						outputText.value += first(item) + `\n`; // text
						break;
					case 'second': 
						outputText.value += second(item) + `\n`; // text
						break;
					case 'third': 
						outputText.value += third(item) + `\n`; // text
						break;
					case 'fourth': 
						outputText.value += fourth(item) + `\n`; // text
						break;
					case 'fifth': 
						outputText.value += fifth(item) + `\n`; // text
						break;
					case 'none': return;
				}
			});
		});
	});

	copyBtn.addEventListener('click', (e) => {
		e.preventDefault();

		outputText.select();
		
		document.execCommand("copy");
	});
});