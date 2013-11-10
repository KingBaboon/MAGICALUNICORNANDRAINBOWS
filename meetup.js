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
	Input: target (String) - corresponds to the name of the map area and image
*/
function navigation(target) {
	validTargets = ["mainLobby", "mainMenu", "joinEventDialogue", "createGroup", "accountSettings", 
		"generalLobbyDropdown", "upcomingEvents", "register", "searchGroups", "newmeetup",
		"accountSettings", "loginPage", "mainLobbyJoined", "meetupHistory"];

	if ($.inArray(target, validTargets)!= -1 && target.length != 0){
		changeScreen(target);
	} 
}

/**
	Remove any textfields or drop downs from the page and clear usemap
*/
function clearPage() {
	$('#textAreas').html("");
	$('.img').attr('usemap', '');
}

/**
	Clear content from previous page and add content necessary for current page
*/
function setupPage(title) {
	// wipe out content from previous page
	clearPage();

	// login page needs two textboxes: username and password
	if (title == "loginPage") {
		$('#textAreas').html("<input id='loginPageUsername'><input type='password' id='loginPagePassword'>");
	} else if (title == "createGroup") {
		$('#textAreas').html("<input id='groupName'><input id='groupDescription'>");
	} else if (title == "register") {
		$('#textAreas').html(
			"<input id='registerPageEmail'>"+
			"<input id='registerPageUsername'>"+
			"<input type='password' id='registerPagePassword'>"+
			"<input type='password' id='registerPageConfirmPassword'>");
	} else if (title == "accountSettings") {
		$('#textAreas').html("<input id='personalEmail'> "+
							 "<input type='password' id='newPassword'> "+
							 "<input type='password' id='confirmNewPassword'>");
	}
}

/**
	Changes the image given a title
	Input: title (String) - corresponds to the image name
*/
function changeScreen(title) {
	// build image url for image tag
	imageUrl = "img/" + title + ".png";
	// update textfields and dropdowns for new page
	setupPage(title);

	if (title == "mainMenu") {
		// load main menu into overlay block

		// make sure menu is off screen initially
		$('#overlayImageBlockLeft').css('left', '-500px');

		$('#overlayImageBlockLeft').html("<img class='img' src = '" + imageUrl + "'>");
		$('.img').attr('usemap', title);

		// anime menu to scroll out
		$("#overlayImageBlockLeft").animate({
			left:'0px'
		});
	} else if (title == "upcomingEvents") {
		// load main menu into overlay block

		// make sure menu is off screen initially
		$('#overlayImageBlockRight').css('left', '420px');

		$('#overlayImageBlockRight').html("<img class='img' src = '" + imageUrl + "'>");
		$('.img').attr('usemap', title);

		// animate menu to scroll out
		$("#overlayImageBlockRight").animate({
			left: '90px'
		});

	} else if (title == "mainLobbyJoined") {

		// change back to main lobby image
		$('#imageBlock').html("<img class='img' src = 'img/mainLobby.png' usemap='#mainLobby'>");
		
		// pop out the side bar
		changeScreen("upcomingEvents");

	} else {
		// animate menu to scroll out
		$("#overlayImageBlockRight").animate({
			left: '420px'
		});

		$("#overlayImageBlockLeft").animate({
			left:'-500px'
		});

		// update image block with new image and map
		$('#imageBlock').html("<img class='img' src = '" + imageUrl + "' usemap='" + "#" + title + "'>");
	}
}

function debugHilight() {
	$('img[usemap]').maphilight({alwaysOn:true});
	$('#imageBlock div').css('background-size','100%');
}

$(document).ready(function () {
	setup();
});

