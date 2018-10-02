
$(document).ready(function() {

	var playerCoordinates;
	var projectileCoordinates = {};




//===============
//====MOVEMENT===
//===============
	document.addEventListener('keydown', function(e){
	  var playerOne = document.getElementsByClassName('player')[0];
	  var topPos = playerOne.offsetTop;
	  var leftPos = playerOne.offsetLeft;
	  var moveBy = 20;
		if(e.which == 38) {	
			if(topPos > 0) {
				topPos -= moveBy;
				playerOne.style.top = topPos + 'px';
			}
		} else if(e.which == 39) {	
			if(leftPos < 460) {
				leftPos += moveBy;
				playerOne.style.left = leftPos + 'px'
			}	
		} else if(e.which == 37) {
			if(leftPos > 0) {
				leftPos -= moveBy;
				playerOne.style.left = leftPos + 'px';
			}	
		} else if(e.which == 40) {
			if(topPos < 360) {
				topPos += moveBy;
				playerOne.style.top = topPos + 'px';
			}
		}
		playerCoordinates = [leftPos, topPos];

	})

//===============
//===BUTTONS=====
//===============

	var score = 0;
	var difficulty = 'easy';
	var isOn = false;
	var isWinning = true;

	$('.start').click(function(){
		if(isOn === false) {
			isOn = true;
			if(difficulty === 'easy') {
				setInterval(spawnNewProjectile, 1000)
				setInterval(handleProjectileAndUpdateScore, 500)
			} else if( difficulty === 'hard') {
				setInterval(spawnNewProjectile, 500)
				setInterval(handleProjectileAndUpdateScore, 500)
			}
		}
	})

	$('.easy').click(function() {
		difficulty = 'easy';
	})
	$('.hard').click(function() {
		difficulty = 'hard';
	})

//====================
//=PROJECTILES=SCORE==
//====================

	function spawnNewProjectile() {
		if(isWinning === true) {
			var getHorizontalLocation = Math.floor(Math.random() * (390 - 0) + 0);
			var playArea = document.getElementsByClassName('play_area')[0];
			var div = document.createElement('div');

			div.className = getHorizontalLocation;
			div.className = 'projectile';
			div.style.top = getHorizontalLocation + 'px';
			
			playArea.append(div)
		}
	}

	function handleProjectileAndUpdateScore() {
		if(isWinning === true) {
			var projectiles = document.getElementsByClassName('projectile');

			for(var i = 0; i < projectiles.length; i++) {
				var projectile = projectiles[i];
				var projectileHoriz = projectile.offsetLeft;
				var projectileVert = projectile.offsetTop;
				var moveBy = 10;

				projectileHoriz += moveBy;
				projectile.style.left = projectileHoriz + 'px';

				projectileCoordinates[i] = [projectileHoriz, projectileVert]

				if(projectileHoriz > 500) {
					projectile.remove();

			//=====Udate Score======
					score += 1;
				}
			}
			document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + score;
		}

		for(var key in projectileCoordinates) {

			var proTop = projectileCoordinates[key][1];
			var proBot = projectileCoordinates[key][1] + 10;
			var proLeft = projectileCoordinates[key][0];
			var proRight = projectileCoordinates[key][0] + 30;

			var playerTop = playerCoordinates[1];
			var playerBot = playerCoordinates[1] + 40;
			var playerLeft = playerCoordinates[0];
			var playerRight = playerCoordinates[0] + 40;

			if(proRight >= playerLeft && proRight <= playerRight) {
				if(proTop >= playerTop && proTop <= playerBot) {
					isWinning = false;
				}
			}
			if(proLeft >= playerLeft && proLeft <= playerRight) {
				if(proBot >= playerTop && proBot <= playerBot) {
					isWinning = false;
				}
			}
		}
	}


})



			