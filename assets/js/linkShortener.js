var url = document.URL

checkForRedirect();

function checkForRedirect() {
	if(url.includes("slides")) {
		window.location = "https://docs.google.com/presentation/d/1bap2r0Yn9jL71NKWbyGwVFGONgKNzsl-5G6c5LB9KOQ/edit?usp=sharing";
	}
}
