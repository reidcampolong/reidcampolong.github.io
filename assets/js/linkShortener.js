var url = document.URL

checkForRedirect();

function checkForRedirect() {
	if(url.includes("slides")) {
		window.location = "https://docs.google.com/presentation/d/1R1IX_9Xib0GI7dsJs4rZMycfQG39TKwKfHg4Ublt4Rc/edit?usp=sharing";
	}
}