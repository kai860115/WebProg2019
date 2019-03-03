let image_url = [
	'./images/pizza01.jpg',
	'./images/pizza02.jpg',
	'./images/pizza03.jpg',
	'./images/pizza04.jpg',
	'./images/pizza05.jpg'
]

let cur_index = 0;

const displayElement = document.getElementById('display');
const sourceElement = document.getElementById('source');
const nextElement = document.getElementById('next');
const backElement = document.getElementById('back');

backElement.onclick = () => {
	if (cur_index > 0) {
		cur_index--;
		displayElement.src = image_url[cur_index];
		sourceElement.innerHTML = image_url[cur_index];
		if (cur_index === 3) {
			nextElement.querySelector('img').classList.remove('disabled');
		} else if (cur_index === 0) {
			backElement.querySelector('img').classList.add('disabled');
		}
	}
};

nextElement.onclick = () => {
	if (cur_index < 4) {
		cur_index++;
		displayElement.src = image_url[cur_index];
		sourceElement.innerHTML = 'Source: ' + image_url[cur_index];
		if (cur_index === 4) {
			nextElement.querySelector('img').classList.add('disabled');
		} else if (cur_index === 1) {
			backElement.querySelector('img').classList.remove('disabled');
		}
	}
};