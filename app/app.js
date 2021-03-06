angular
	.module('JigsawApp', ['ui.router'])

	.config(function($stateProvider, $urlRouterProvider)
	{
		$stateProvider
			.state('app', {
				abstract: true,
				name: 'app',
				url: '/app',
				controller: 'AppController',
				templateUrl: 'app/templates/app.html'
			})

			.state('app.puzzle', {
				name: 'puzzle',
				url: '/puzzle/:playerId',
				controller: 'PuzzleController',
				templateUrl: 'app/templates/jigsaw_puzzle.html'
			})

			.state('app.solution', {
				name: 'solution',
				url: '/solution/:playerId',
				controller: 'SolutionController',
				templateUrl: 'app/templates/jigsaw_solution.html'
			});
		// if none of the above states are matched, use this as the fallback
  		$urlRouterProvider.otherwise('/app/puzzle/');
	})

	.controller('AppController', function( $scope, $window, $state ){
		console.log("Inside AppController.");
		$('#link').click(function(){ $scope.openSparrowzappLink(); return false; });
		$('#buyTickets').click(function(){ $scope.buyTicketLink(); return false; });

		$scope.openSparrowzappLink=function(link)
		{
			 console.log("opening link");
			 	ga('send', {
                hitType: 'event',
                eventCategory: 'jigsaw',
                eventAction:'User cliked on sparrowzapp.com'  ,
                eventLabel: 'USER_CLICKED_SPARROWZ_WEBSITE',
                eventValue: 0
            });
			 $window.open('http://sparrowzapp.com', '_blank');
		}
		$scope.buyTicketLink=function()
		{
			console.log("opening buy ticket link");
			 console.log("opening link");
			 	ga('send', {
                hitType: 'event',
                eventCategory: 'jigsaw',
                eventAction:'User clicked on sparrowzapp.com/events.html'  ,
                eventLabel: 'USER_CLIKED_SPARROWZ_EVENT',
                eventValue: 0
            });
			 $window.open('http://www.sparrowzapp.com/events.html', '_blank');

		}
	})

	.controller('PuzzleController', function( $scope, $window, $state, $stateParams ){
		console.log("Inside PuzzleController.");
  
		
		$scope.puzzleData={};

		var playerId="jwala";

		if($stateParams.playerId){
			playerId=$stateParams.playerId;
		}
		console.log("puzzle Data:-",$scope.puzzleData);

		$scope.puzzleData.playerData = players[playerId];
		$scope.isJigsawCompleteStatus=function()
		{
			console.log("jigsaw completed status:-",status);
			ga('send', {
                hitType: 'event',
                eventCategory: 'Jigsaw',
                eventAction: 'Puzzle completed Successfully for image' +JSON.stringify($scope.puzzleData.playerData),
                eventLabel: 'PUZZLE_COMPLETED_SUCCESSFULLY',
                eventValue: 0
            });
			 $state.go('app.solution',{playerId: $scope.puzzleData.playerData.id});
		}
		ga('send', {
                hitType: 'event',
                eventCategory: 'Jigsaw',
                eventAction: 'Puzzle loaded with image'+JSON.stringify($scope.puzzleData.playerData),
                eventLabel: 'PUZZLE_LOADED_SUCCESSFULLY',
                eventValue: 0
            });
	})

	.controller('SolutionController', function( $scope, $window, $state, $stateParams ){
		console.log("Inside SolutionController.");

		$scope.solutionData={};
		

		var camera, scene, renderer;
		var mesh;
		var playerId="jwala";

		if($stateParams.playerId){
			playerId=$stateParams.playerId;
		}

		$scope.solutionData.playerData = players[playerId];


		console.log('>>>>>>'+JSON.stringify($scope.solutionData.playerData))
		
		init();
		animate();

		function init() {
	        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	        camera.position.z = 400;
	        scene = new THREE.Scene();
	        //scene.background = new THREE.Color( 0xffffff );
	        var texture = new THREE.TextureLoader().load( $scope.solutionData.playerData.photo );
	        var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	        var material = new THREE.MeshBasicMaterial( { map: texture } );
	        mesh = new THREE.Mesh( geometry, material );
	        scene.add( mesh );
	        renderer = new THREE.WebGLRenderer({ alpha: true });
	        renderer.setPixelRatio( window.devicePixelRatio );
	        //renderer.setSize( window.innerWidth, window.innerHeight );
	        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
	        document.getElementById("blockRotate").appendChild( renderer.domElement );
	        //
	        window.addEventListener( 'resize', onWindowResize, false );
	      }

	      function onWindowResize() {
	        camera.aspect = window.innerWidth / window.innerHeight;
	        camera.updateProjectionMatrix();
	        renderer.setSize( window.innerWidth, window.innerHeight );
	      }
	      function animate() {
	        requestAnimationFrame( animate );
	        mesh.rotation.x += 0.005;
	        mesh.rotation.y += 0.01;
	        renderer.render( scene, camera );
	      }

	      $scope.playAgain=function(solutionDataValue)
	      {
	      	console.log("request to play Again with id:-",solutionDataValue);
	      	ga('send', {
                hitType: 'event',
                eventCategory: 'puzzle Game',
                eventAction: 'Replay jigsaw with ' + JSON.stringify(solutionDataValue) ,
                eventLabel: 'REPLAY_JIGSAW',
                eventValue: 0
            });

	      	$state.go('app.puzzle',{playerId:solutionDataValue.id})

	      }


	});