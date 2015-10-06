angular.module('rba',['ui.router','ui.bootstrap','ngAnimate'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController as hc'
    })

    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'AboutController as ac'
    })

    .state('apply', {
      url: '/apply',
      templateUrl: 'apply.html',
      controller: 'ApplyController as apc'
    })

    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html',
      controller: 'ContactController as cc'
    })

    .state('courses', {
      url: '/courses',
      templateUrl: 'courses.html',
      controller: 'CoursesController as csc'
    })

    .state('faculty', {
      url: '/faculty',
      templateUrl: 'faculty.html',
      controller: 'FacultyController as fc'
    })

    .state('faq', {
      url: '/faq',
      templateUrl: 'faq.html',
      controller: 'FAQController as faqc'
    })

		.state('newsletter', {
      url: '/newsletter',
      templateUrl: 'newsletter.html',
      controller: 'NewsletterController as nc'
    })

		.state('philosophy', {
      url: '/philosophy',
      templateUrl: 'philosophy.html',
      controller: 'PhilosophyController as pc'
    });
})



.controller('AboutController', function() {

})

.controller('ApplyController', function() {

})

.controller('ContactController', function(DataTransfer) {
	this.formData = {
		name:'',
		email:'',
		phone:'',
		message:''
	};

	this.submitForm = function() {
		console.log('submitForm clicked.');
		DataTransfer.SendEmail(this.formData);
	};
})

.controller('CoursesController', function() {

})

.controller('FacultyController', function($modal) {
  this.open = function (facultyMemberName) {
    console.log('THINGS');
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'Faculty Member Profiles/'+facultyMemberName+'.html',
      controller: 'FacultyModalController',
      size: 'lg'
    });
  };
})
.controller('FacultyModalController', function ($modalInstance) {
  this.close = function () {
    $modalInstance.close();
  };
})

.controller('FAQController', function() {

})

.controller('HomeController', function() {

})

.controller('NewsletterController', function() {

})

.controller('PhilosophyController', function() {

})

.controller('HeaderController', function($scope,$state,$window) {
  $scope.windowWidth = $window.innerWidth;
  $scope.showMenu = false;
  console.log($scope.windowWidth);
  // Watch for changes in the window width
	$(window).on("resize.doResize", function (){
		$scope.$apply(function(){
      $scope.showMenu = false;
		  $scope.windowWidth = $window.innerWidth;
		});
	});
	$scope.$on("$destroy",function (){
		// Kill resize listener
		 $(window).off("resize.doResize");
	});
	// -------------------------------------

	this.goTo = function(pagename) {
		$state.go(pagename);
	}
})

.controller('FooterController', function() {
  this.currentYear = new Date().getFullYear();
})





.factory('DataTransfer',function($http) {
	return {
		SendEmail: function(the_data) {
			return $http({
				method: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				headers: {
					'Content-Type':'application/json'
				},
				data: {
					"key":"h_FdIHNlZN0YdLY8vU8Cfg",
					"message": {
						"text": 'Name: '+the_data.name+'\nEmail Address: '+the_data.email+'\nPhone Number: '+the_data.phone+'\nMessage: '+the_data.message,
						"subject": "You've had a new student sign up for RBA.",
						"from_email": "signupforroyalbusinessacademy@gmail.com",
						"from_name": "New Sign Up!",
						"to": [
							{
								"email": "kollyn.lund@gmail.com",
								"name": "Kolldryn Grund",
								"type": "to"
							}
						]
					}
				}
			}).then(function(data,status,headers,config) {
				console.log('Sended. Status: ',status);
				console.log('It\'s me again. Data:',data);
			})
		}
	}
});
