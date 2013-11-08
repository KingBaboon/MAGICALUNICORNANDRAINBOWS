function setup() {
	$(document).click(function(event){
		// for testing purposes
		$('#debug').text("(" + event.pageX + ", " + event.pageY + ")");
		console.log(event);
		console.log(event.target.title);

		// target is the name of the map area you clicked on
		target = event.target.title;
		navigation(target);
		
	})
}

/**
	Here's a hacky program that changes the image given a target
	Input: target (String) - corresponds to the name of the map areas
*/
function navigation(target) {
	if (target == "loginButton") {
		// login button takes the user to the homepage (main lobby)
		changeScreen("mainLobby");

	} else if (target == "register") {
		// register button also takes the user to the homepage since we don't have a register page
		changeScreen("mainLobby");
	}
}

/**
	Remove any textfields or drop downs from the page
*/
function clearPage() {
	$('#textAreas').html("");
}

/**
	Clear content from previous page and add content necessary for current page
*/
function setupPage(title) {
	// wipe out content from previous page
	clearPage();

	// login page needs two textboxes: username and password
	if(title == "loginPage") {
		$('#textAreas').html("<input id='loginPageUsername'><input type='password' id='loginPagePassword'>");
	}
}

/**
	Changes the image given a title
	Input: title (String) - corresponds to the image name
*/
function changeScreen(title) {
	// update textfields and dropdowns for new page
	setupPage(title);

	// build image url for image tag
	imageUrl = "img/" + title + ".png";

	// update image block with new image and map
	$('#imageBlock').html("<img src = '" + imageUrl + "' usemap='" + "#" + title + "'>");
}

$(document).ready(function () {
	setup();
});

