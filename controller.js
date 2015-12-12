var myApp = angular.module('myApp',[]);

myApp.directive('clickState', function (){
	return {
		link: function($scope, element){
			element.bind('click',function(){
				var newColor = getNewColor($scope.state);
				var votes = $scope.state.electoralVotes;
				$scope.state.stateColor = newColor;
				var stateColor = $scope.state.stateColor
				var stateElement = element[0].querySelector('path');
				stateElement.setAttribute('class','state '+newColor);
				if(stateColor == 'blue'){
					blueVotes += votes;
					redVotes -= votes;
				}else if(stateColor == 'red'){
					redVotes += votes;
					openVotes -= votes;
				}else if(stateColor == 'open'){
					openVotes += votes;
					blueVotes -= votes;
				}
				updatePollMeter();
			})
		}
	}
});
myApp.controller('mapController', function ($scope, $http){
	var lastSmallState = "200";
	var bigStates = [];
	updatePollMeter();
	for(i=0; i<states.length;i++){
		if(states[i].nameX === ""){
			states[i].nameX = "700"
			states[i].nameY = lastSmallState;
			lastSmallState = Number(lastSmallState)+30;
		}
	}
	$scope.bigStates = states;
})

function getNewColor(state){
	var color = state.stateColor
	if(color == 'red'){
		blueStates[state.id] = state;
		redStates[state.id] = "";
		return 'blue';
	}else if(color == 'blue'){
		openStates[state.id] = state;
		blueStates[state.id] = "";
		return 'open';
	}else if(color == 'open'){
		redStates[state.id] = state;
		openStates[state.id] = "";
		return 'red';
	}
}
function updatePollMeter(){
	document.getElementById('democrats').innerHTML = blueVotes;
	document.getElementById('republicans').innerHTML = redVotes;
	document.getElementById('open').innerHTML = openVotes;
	document.getElementById('dems').style.width = 100*(blueVotes/totalVotes) +'%';
	document.getElementById('rebs').style.width = 100*(redVotes/totalVotes) +'%';
	document.getElementById('open').style.width = 100*(openVotes/totalVotes) +'%';
}
