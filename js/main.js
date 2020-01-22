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

console.log("If you can see this you're awesome!");
