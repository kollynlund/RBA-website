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
.controller('ApplyController', function($scope, $modal, DataTransfer) {
  var apc = this;
  apc.application = {};
  apc.stupidIdiot = true;
  apc.completed = false;

  $scope.$watchCollection(
    function watchApplication(){return [apc.application.first_name,apc.application.preferred_name,apc.application.native_language,apc.application.other_languages,apc.application.family_surname,apc.application.date_of_birth,apc.application.how_did_you_hear_about_us,apc.application.gender,apc.application.street_address,apc.application.state_province,apc.application.postal_code,apc.application.telephone_number,apc.application.city,apc.application.country,apc.application.email,apc.application.application_year,apc.application.level_of_education]},
    function handleAppicationChange(newVals, oldVals) {
      console.log(newVals);
      if (
        newVals[0] &&
        newVals[1] &&
        newVals[2] &&
        newVals[3] &&
        newVals[4] &&
        newVals[5] &&
        newVals[6] &&
        newVals[7] != 'Gender*' &&
        newVals[8] &&
        newVals[9] &&
        newVals[10] &&
        newVals[11] &&
        newVals[12] &&
        newVals[13] &&
        newVals[14] &&
        newVals[15] != 'Year for which you are applying*' &&
        newVals[16] != 'Highest Level of Education*'
      ) {
        apc.stupidIdiot = false;
      }
      else {
        apc.stupidIdiot = true;
      }
  });

  apc.open = function (infoSubject) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'Application File Info Modals/'+infoSubject+'.html',
      controller: 'ApplyModalController as amc',
      size: 'lg'
    });
  };

  apc.submitForm = function() {
    DataTransfer.SendApplication(apc.application);
    DataTransfer.SendApplicationEmail();
    apc.completed = true;
	};
})
.controller('ApplyModalController', function ($modalInstance) {
  this.close = function () {
    $modalInstance.close();
  };
})
.controller('ContactController', function(DataTransfer) {
  this.emailSent = false;
  this.formData = {
		name:'',
		email:'',
		phone:'',
		message:''
	};

	this.submitForm = function() {
		DataTransfer.SendContactEmail(this.formData);
    this.emailSent = true;
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
.controller('HomeController', function($scope,$window) {
  $scope.windowWidth = $window.innerWidth;
  $scope.jumboHeight = $("video:first").height() > $("img:first").height() ? $("video:first").height() : $("img:first").height();
  // Watch for changes in the window width
	$(window).on("resize.doResize", function (){
		$scope.$apply(function(){
      $scope.windowWidth = $window.innerWidth;
      $scope.jumboHeight = $("video:first").height() > $("img:first").height() ? $("video:first").height() : $("img:first").height();
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
		SendContactEmail: function(the_data) {
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
						"subject": "You have a new message for the RBA site.",
						"from_email": "signupforroyalbusinessacademy@gmail.com",
						"from_name": "New Message from RBA site",
						"to": [
							{
								"email": "spencer@royalbusinessacademy.org ",
								"name": "Spencer Rogers",
								"type": "to"
							}
						]
					}
				}
			});
		},
    SendApplicationEmail: function() {
			return $http({
				method: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				headers: {
					'Content-Type':'application/json'
				},
				data: {
					"key":"h_FdIHNlZN0YdLY8vU8Cfg",
					"message": {
						"text": 'You just had a new student apply for Royal Business Academy!',
						"subject": "New RBA Applicant",
						"from_email": "signupforroyalbusinessacademy@gmail.com",
						"from_name": "New Message from RBA site",
						"to": [
							{
								"email": "spencer@royalbusinessacademy.org ",
								"name": "Spencer Rogers",
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
				url: 'https://docs.google.com/forms/d/1hn7YvTiMZZhA3FEm7-UHagXZDvifUx5VbLdRgz37_nE/formResponse',
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
          'entry.1837275675': the_data.first_name || '',
          'entry.2057115759': the_data.preferred_name || '',
          'entry.1691304936': the_data.native_language || '',
          'entry.961943981': the_data.other_languages || '',
          'entry.765568650': the_data.family_surname || '',
          'entry.1496721659': the_data.date_of_birth || '',
          'entry.1058894701': the_data.how_did_you_hear_about_us || '',
          'entry.1267007426': the_data.gender || '',
          'entry.1248163241': the_data.street_address || '',
          'entry.1538648643': the_data.state_province || '',
          'entry.326672777': the_data.postal_code || '',
          'entry.757327993': the_data.telephone_number || '',
          'entry.716204733': the_data.city || '',
          'entry.753284705': the_data.country || '',
          'entry.344209816': the_data.email || '',
          'entry.629576774': the_data.application_year || '',
          'entry.809888668': the_data.level_of_education || ''
        }
			});
    }
	}
});
