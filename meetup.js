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
		"generalLobbyDropdown", "upcomingEvents", "register", "searchGroups",
		"accountSettings"];

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
	//$('#overlayImageBlock').html("");
	//$('#overlayImageBlockRight').html("");
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
	// build image url for image tag
	imageUrl = "img/" + title + ".png";
	// update textfields and dropdowns for new page
	setupPage(title);

	if (title == "mainMenu") {
		// load main menu into overlay block

		// make sure menu is off screen initially
		//$('#overlayImageBlock').css('left', '-500px');
		$('#overlayImageBlock').html("<img class='img' src = '" + imageUrl + "'>");
		$('.img').attr('usemap', title);

		// anime menu to scroll out
		$("#overlayImageBlock").animate({
			left:'0px'
		});
	} else if (title == "upcomingEvents") {
		// load main menu into overlay block

		// make sure menu is off screen initially
		//$('#overlayImageBlockRight').css('right', '-500px');
		$('#overlayImageBlockRight').html("<img class='img' src = '" + imageUrl + "'>");
		$('.img').attr('usemap', title);

		// anime menu to scroll out
		$("#overlayImageBlockRight").animate({
			width:'338px'
		});
	} else {
		// anime menu to scroll out
		$("#overlayImageBlockRight").animate({
			right:'990px',
			width: '0px'
		}, { complete:function() {
				$(this).html("");
			}
		});
		
		//$('#overlayImageBlockRight').html("");

		$("#overlayImageBlock").animate({
			left:'-500px'
		});

		// update image block with new image and map
		$('#imageBlock').html("<img class='img' src = '" + imageUrl + "' usemap='" + "#" + title + "'>");
	}
}

function debugHilight() {
	$('.img').maphilight({alwaysOn:true})
	$('.img').css('background-size','100% 100%');;
}

$(document).ready(function () {
	setup();
});

