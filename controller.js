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
				updatePollMeter();

				if(redVotes > 269){
					var html = '<div>';
						html += "<h1>YOU HAVE LET THE REPUBLICANS WIN</h1>";
						html += '<a href="https://www.youtube.com/watch?v=h6oxvm9Q68Q" target="_blank">';
						html += '<img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Donald_August_19_(cropped).jpg">';
						html += '</a></div>';

					document.getElementById('wrapper').innerHTML = "";
					document.getElementById('wrapper').innerHTML = html;			
				}
				if(blueVotes > 269){
					var html = '<div>';
						html += "<h1>YOU HAVE LET THE DEMOCRATS WIN</h1>";
						html += '<a href="https://www.youtube.com/watch?v=pfmwGAd1L-o" target="_blank">';
						html += '<img src="http://www.motherjones.com/files/bernie-sanders.gif">';
						html += '</a></div>';
					document.getElementById('wrapper').innerHTML = "";
					document.getElementById('wrapper').innerHTML = html;
				}


			})
		}
	}
});


myApp.controller('mapController', function ($scope, $http){
	var lastSmallState = "200";
	var newStates = states;
	var smallStates = []
	var openStates = [];
	updatePollMeter();
	for(i=0; i<newStates.length;i++){
		if(newStates[i].nameX === ""){
			newStates[i].nameX = "700"
			newStates[i].nameY = lastSmallState;
			lastSmallState = Number(lastSmallState)+30;
		}
	}

	for(i=0; i < states.length; i++){
		if(states[i].stateColor == 'open'){
			openStates.push(states[i].electoralVotes);
		}
	}
	console.log(openStates);
	// var winningRepublicanCombos = subsetsGreaterThan(openStates,80);
	// var winningDemocraticCombos = subsetsGreaterThan(openStates,57);
	// console.log(winningRepublicanCombos);
	// console.log(winningDemocraticCombos);
	$scope.states = newStates;

	$scope.resetMap = function(){
		window.location.href = "./index.html";
	}
})

// function powerSet (states) {

//     // the power set of [] is [[]]
//     if(states.length === 0) {
//         return [[]];
//     }
//     // remove and remember the last element of the array
//     var lastElement = states.pop();

//     // take the powerset of the rest of the array
//     var restPowerSet = powerSet(states);


//     // for each set in the power set of arr minus its last element,
//     // include that set in the powerset of arr both with and without
//     // the last element of arr
//     var powerset = [];
//     for(var i = 0; i < restPowerSet.length; i++) {

//         var set = restPowerSet[i];

//         // without last element
//         powerset.push(set);

//         // with last element
//         set = set.slice(); // create a new array that's a copy of set
//         set.push(lastElement);
//         powerset.push(set);
//     }
//    	return powerset;
// };

// function subsetsGreaterThan (arr, number) {

//     // all subsets of arr
//     var powerset = powerSet(arr);

//     // subsets summing less than or equal to number
//     var subsets = [];

//     for(var i = 0; i < powerset.length; i++) {

//         var subset = powerset[i];

//         var sum = 0;
//         for(var j = 0; j < subset.length; j++) {
//             sum += subset[j];
//         }

//         if(sum >= number) {
//             subsets.push(subset);
//         }
//     }

//     return subsets;
// };



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
	document.getElementById('republicans').innerHTML = redVotes;
	document.getElementById('democrats').innerHTML = blueVotes;
	document.getElementById('open').innerHTML = openVotes;
	document.getElementById('dems').style.width = 100*(blueVotes/totalVotes) +'%';
	document.getElementById('rebs').style.width = 100*(redVotes/totalVotes) +'%';
	document.getElementById('open').style.width = 100*(openVotes/totalVotes) +'%';
}
