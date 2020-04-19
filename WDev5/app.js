const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	
	
	burger.addEventListener('click', () => {
		//Toggle Link
		nav.classList.toggle('nav-active');
			
		//Animate Links
		navLinks.forEach((x, index) => {
			//to add proper delay 
			if(x.style.animation){
				x.style.animation = ``;
			}
			else{
				x.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
				// + 0.3 is for initial delay
			}
		});
		
		//Burger Animation
		burger.classList.toggle('toggle');
		
	});
	
	
	
}

const app = () => {			//to call all smaller functions
	navSlide();
}

app();