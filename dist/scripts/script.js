window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	const form = document.querySelector('form'),
				textArea = document.querySelector('.form__textarea'),
				formBtn = form.querySelector('.form__btn'),
				// firstCheckbox = form.querySelector('#first'),
				// secondCheckbox = form.querySelector('#second'),
				// thirdCheckbox = form.querySelector('#third'),
				// fourthCheckbox = form.querySelector('#fourth'),
				// fifthCheckbox = form.querySelector('#fifth'),
				selects = form.querySelectorAll('select'),
				table = document.querySelector('.result__table'),
				tBody = table.querySelector('tbody');

	function createRow(func, item) {
		let tr = document.createElement('tr'),
				td = document.createElement('td');
				tr.appendChild(td);
				tBody.appendChild(tr);
				tr.classList.add('table__row');
				tr.classList.add('result__row');
				td.classList.add('table__data');

				td.textContent = `${func(item)}`;
	}

	let arrText = [];

	textArea.value = `первая строка ключевых строк \nвторая строка ключевых слов`;

	formBtn.addEventListener('click', (e) => {
		e.preventDefault();

		document.querySelectorAll('.result__row').forEach(item => item.remove());

		arrText = textArea.value.split(/\r?\n/).forEach(item => {

			selects.forEach(select => {
				switch (select.value) {
					case 'first': 
						createRow(first, item);
						break;
					case 'second': 
						createRow(second, item);
						break;
					case 'third': 
						createRow(third, item);
						break;
					case 'fourth': 
						createRow(fourth, item);
						break;
					case 'fifth': 
						createRow(fifth, item);
						break;
					case 'none': return;
				}
			});

			let allTd = table.querySelectorAll('.result__row');
			if (allTd.length > 0) {
				allTd[allTd.length-1].classList.add('table__data-last');
			}

			

			// if (firstCheckbox.checked) {
			// 	createRow(first, item);
			// }

			// if (secondCheckbox.checked) {
			// 	createRow(second, item);
			// }

			// if (thirdCheckbox.checked) {
			// 	createRow(third, item);
			// }

			// if (fourthCheckbox.checked) {
			// 	createRow(fourth, item);
			// }

			// if (fifthCheckbox.checked) {
			// 	createRow(fifth, item);
			// }
		});
	});

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
});