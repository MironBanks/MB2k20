const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const items = document.querySelector('.navigation__list');

const handleClick = () => {
	hamburger.classList.toggle('hamburger--active');
	nav.classList.toggle('navigation--active');
};

hamburger.addEventListener('click', handleClick);

const itemsClick = () => {
	hamburger.classList.toggle('hamburger--active');
	nav.classList.toggle('navigation--active');
};

items.addEventListener('click', itemsClick);

$(document).ready(function() {
	$('#up').on('click', function() {
		$('html,body').animate(
			{
				scrollTop: 0
			},
			2000
		);
	});
});

// SHOW MORE BUTTON

const show_more = document.getElementById('show_more');
const project_archive = document.querySelector('.project__archive');

//remove class from project__archive
function toggleClass() {
	project_archive.classList.toggle('project__archive');
}

show_more.addEventListener('click', toggleClass);

//Counter

let origin = 0.0;
setInterval(function() {
	document.querySelector('#distance').innerHTML = Math.ceil(origin);
	origin += 1.9;
}, 100);

/*
//API GIT UPDATE updated_at
let gitHubData;
const updateDate = document.getElementById('lastUpdate__date');
let updateDate__mil;

fetch('https://api.github.com/repos/MironBanks/FavNote01.02')
	.then(res => res.json())
	.then(data => initialize(data));

function initialize(gitData) {
	gitHubData = gitData;

	updateDate.textContent = Date.parse(gitHubData.updated_at);
	updateDate__mil = updateDate.textContent;
}

setTimeout(() => {
	console.log(gitHubData);
}, 700);

setTimeout(() => {
	console.log(updateDate__mil);
}, 700);
*/
console.log("If you can see this you're awesome!");
