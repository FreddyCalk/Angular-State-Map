var myApp = angular.module('myApp',[]);

myApp.directive('clickState', function (){
	return {
		link: function($scope, element){
			element.bind('click',function(){
				console.log(element,$scope)
				var newColor = getNewColor($scope.state);
				var votes = $scope.state.electoralVotes;
				$scope.state.stateColor = newColor;
				var stateColor = $scope.state.stateColor
				var stateElement = element[0].querySelector('path');
				var stateLabel = element[0].children[1].children[0];
				stateElement.setAttribute('class','state '+newColor);
				stateLabel.setAttribute('class','state-info '+newColor);
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
				$scope.demVotes = blueVotes;
				$scope.rebVotes = redVotes;
				$scope.openVotes = openVotes;
				updatePollMeter();
			})
		}
	}
});
myApp.controller('mapController', function ($scope, $http){
	var lastSmallState = "200";
	var newStates = states;
	var smallStates = []
	updatePollMeter();
	for(i=0; i<newStates.length;i++){
		if(newStates[i].nameX === ""){
			newStates[i].nameX = "700"
			newStates[i].nameY = lastSmallState;
			lastSmallState = Number(lastSmallState)+35;
			smallStates.push(newStates[i]);
		}
	}

	console.log(smallStates)
	$scope.demVotes = blueVotes;
	$scope.rebVotes = redVotes;
	$scope.openVotes = openVotes;
	$scope.states = newStates;

	$scope.resetMap = function(){
		window.location.href = "./index.html";
	}
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
	document.getElementById('open').innerHTML = openVotes;
	document.getElementById('dems').style.width = 100*(blueVotes/totalVotes) +'%';
	document.getElementById('rebs').style.width = 100*(redVotes/totalVotes) +'%';
	document.getElementById('open').style.width = 100*(openVotes/totalVotes) +'%';
}
