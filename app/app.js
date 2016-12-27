angular
	.module('JigsawApp', ['ui.router'])

	.config(function($stateProvider, $urlRouterProvider)
	{
		$stateProvider
			.state('puzzle', {
				name: 'puzzle',
				url: '/puzzle',
				templateUrl: '/jigsaw_puzzle.html'
			})

			.state('solution', {
				name: 'solution',
				url: '/solution',
				templateUrl: '/jigsaw_solution.html'
			});
		// if none of the above states are matched, use this as the fallback
  		$urlRouterProvider.otherwise('/puzzle');
	})

	.controller('PuzzleController', function( $scope, $window, $state ){
		console.log("Inside PuzzleController.")
	})
;