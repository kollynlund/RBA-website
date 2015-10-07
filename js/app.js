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

.controller('AboutController', function() {})
.controller('ApplyController', function($modal, DataTransfer) {
  this.application = {};

  this.open = function (infoSubject) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'Application File Info Modals/'+infoSubject+'.html',
      controller: 'ApplyModalController as amc',
      size: 'lg'
    });
  };

  this.submitForm = function() {
    // TODO: Add form validation logic
		DataTransfer.SendApplication(this.application);
	};
})
.controller('ApplyModalController', function ($modalInstance) {
  this.close = function () {
    $modalInstance.close();
  };
})
.controller('ContactController', function(DataTransfer) {
	this.formData = {
		name:'',
		email:'',
		phone:'',
		message:''
	};

	this.submitForm = function() {
		DataTransfer.SendEmail(this.formData);
	};
})
.controller('CoursesController', function() {})
.controller('FacultyController', function($modal) {
  this.open = function (facultyMemberName) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'Faculty Member Profiles/'+facultyMemberName+'.html',
      controller: 'FacultyModalController as fmc',
      size: 'lg'
    });
  };
})
.controller('FacultyModalController', function ($modalInstance) {
  this.close = function () {
    $modalInstance.close();
  };
})
.controller('FAQController', function() {})
.controller('HomeController', function($scope) {
  $scope.windowWidth = $window.innerWidth;
  $scope.videoHeight = $("video:first").height();
  // Watch for changes in the window width
	$(window).on("resize.doResize", function (){
		$scope.$apply(function(){
      $scope.windowWidth = $window.innerWidth;
      $scope.videoHeight = $("video:first").height();
		});
	});
	$scope.$on("$destroy",function (){
		// Kill resize listener
		 $(window).off("resize.doResize");
	});
	// -------------------------------------
})
.controller('NewsletterController', function() {})
.controller('PhilosophyController', function() {})
.controller('HeaderController', function($scope,$state,$window) {
  $scope.windowWidth = $window.innerWidth;
  $scope.showMenu = false;
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
			});
		},
    SendApplication: function(the_data) {
      return $http({
				method: 'POST',
				url: 'https://docs.google.com/forms/d/1RQSVmBM_pszroridjughZaDmBXJqW6oBYkXb4qwZg6o/formResponse',
				headers: {
					'Content-Type':'application/x-www-form-urlencoded'
				},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
				data: {
          'entry.1016868082': the_data.first_name || '',
          'entry.228118714': the_data.preferred_name || '',
          'entry.1854468818': the_data.native_language || '',
          'entry.1754735803': the_data.other_languages || '',
          'entry.914805648': the_data.family_surname || '',
          'entry.43596061': the_data.date_of_birth || '',
          'entry.746911070': the_data.how_did_you_hear_about_us || '',
          'entry.310713888': the_data.gender || '',
          'entry.1720928449': the_data.street_address || '',
          'entry.1379844110': the_data.state_province || '',
          'entry.30784946': the_data.postal_code || '',
          'entry.1142678642': the_data.telephone_number || '',
          'entry.453795321': the_data.city || '',
          'entry.1089792797': the_data.country || '',
          'entry.1620870347': the_data.email || '',
          'entry.1239659213': the_data.application_year || '',
          'entry.327245518': the_data.level_of_education || ''
        }
			});
    }
	}
});
