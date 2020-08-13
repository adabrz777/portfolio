let documentHeight = document.documentElement.scrollHeight,
	windowWidth = window.innerWidth;

document.addEventListener('resize', () => {
	documentHeight = document.documentElement.scrollHeight;
	windowWidth = window.innerWidth;
});

//progress bar width
let progress = document.querySelector('#nav__progress-bar');

document.addEventListener('scroll', () => {
	progress.style.width = `${window.scrollY / (documentHeight - window.innerHeight) * 100}vw`;
});

//clock
const date = new Date();

let sec = date.getSeconds(),
	min = date.getMinutes(),
	hour = date.getHours(),
	clock = document.querySelector('#about-me__clock');

setInterval(() => {
	sec++;
	if (sec == 60) {
		min += 1;
		sec = 0;
	}
	if (min == 60) {
		hour += 1;
		min = 0;
	}
	if (hour == 24) {
		hour = 0;
	}

	var txt = ` ${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
	clock.innerText = txt;
}, 1000);

//day-night style
let body = document.querySelector('body'),
	link = document.querySelector('[type="image/x-icon"]'),
	dayNight = document.querySelector('#day-night');
	deviceFontSize = '2vw',
	orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;


if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
	orientation = 'landscape';
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
	orientation = 'portrait';
} else if (orientation === undefined) {
	orientation = undefined;
}

if ((windowWidth <= 1024 && orientation === 'portrait') || windowWidth <= 600) deviceFontSize = '3.5vh';

function toggleDayNightStyle() {
	if (!body.classList.contains('page--night')) {
		body.classList.add('page--night');
		link.attributes.href.value = 'favicon-night.svg';
		dayNight.innerHTML = '<i class="icon-moon day-night__icon"></i>';
	} else {
		body.classList.remove('page--night');
		link.attributes.href.value = 'favicon-day.svg';
		dayNight.innerHTML = '<i class="icon-sun day-night__icon"></i>';
	}
}

if ((hour >= 22 && hour <= 23) || hour < 6) toggleDayNightStyle();

dayNight.addEventListener('click', () => {
	dayNight.style.fontSize = '0';

	toggleDayNightStyle();

	setTimeout(() => {
		dayNight.style.fontSize = deviceFontSize;
	}, 250);
});

//start button sound
let sound = document.querySelector('#sound');
sound.volume = 0.3;
document.querySelector('.start__button').addEventListener('click', () => {
	sound.play();
});

//floating socials
if (windowWidth > 500) {
	let socials = document.querySelectorAll('.social-links__link');

	let activeY = window.scrollY;

	document.addEventListener('scroll', () => {
		if (window.scrollY > activeY) {
			for (let i = 0; i < 4; i++) {
				socials[i].style.transform = `translate(0, -${calc(i, 'down')}vw)`;

				setTimeout(() => {
					socials[i].style.transform = `translate(0, 0vw)`;
				}, 150);
			}
		} else {
			for (let i = 3; i >= 0; i--) {
				socials[i].style.transform = `translate(0, ${calc(i, 'up')}vw)`;

				setTimeout(() => {
					socials[i].style.transform = `translate(0, 0vw)`;
				}, 150);
			}
		}

		activeY = window.scrollY;
	});

	calc = (i, dir) => {
		let dir_modifier = dir == 'up' ? 50 : 80;

		let result = Math.abs(window.scrollY - activeY) / dir_modifier * (i * i + 1);

		if (result > 2.5 * (i + 0.5) && dir === 'down') result = 2.5 * (i + 0.5);

		return result;
	};
}
