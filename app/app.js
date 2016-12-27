angular
	.module('JigsawApp', ['ui.router'])

	.config(function($stateProvider, $urlRouterProvider)
	{
		$stateProvider
			.state('puzzle', {
				name: 'puzzle',
				url: '/puzzle',
				controller: 'PuzzleController',
				templateUrl: '/jigsaw_puzzle.html'
			})

			.state('solution', {
				name: 'solution',
				url: '/solution',
				controller: 'SolutionController',
				templateUrl: '/jigsaw_solution.html'
			});
		// if none of the above states are matched, use this as the fallback
  		$urlRouterProvider.otherwise('/puzzle');
	})

	.controller('PuzzleController', function( $scope, $window, $state ){
		console.log("Inside PuzzleController.")
	})

	.controller('SolutionController', function( $scope, $window, $state ){
		console.log("Inside SolutionController.");

		var camera, scene, renderer;
		var mesh;
		
		init();
		animate();

		function init() {
	        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	        camera.position.z = 400;
	        scene = new THREE.Scene();
	        var texture = new THREE.TextureLoader().load( 'assets/images/puneri_manjit.png' );
	        var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	        var material = new THREE.MeshBasicMaterial( { map: texture } );
	        mesh = new THREE.Mesh( geometry, material );
	        scene.add( mesh );
	        renderer = new THREE.WebGLRenderer();
	        renderer.setPixelRatio( window.devicePixelRatio );
	        renderer.setSize( window.innerWidth, window.innerHeight );
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

	})
;