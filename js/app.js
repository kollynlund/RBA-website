angular.module('rba',['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController'
    })

    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'AboutController'
    })

    .state('apply', {
      url: '/applu',
      templateUrl: 'applu.html',
      controller: 'ApplyController'
    })

    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html',
      controller: 'ContactController'
    })

    .state('courses', {
      url: '/courses',
      templateUrl: 'courses.html',
      controller: 'CoursesController'
    })

    .state('faculty', {
      url: '/faculty',
      templateUrl: 'faculty.html',
      controller: 'FacultyController'
    })

    .state('faq', {
      url: '/faq',
      templateUrl: 'faq.html',
      controller: 'FAQController'
    })

		.state('newsletter', {
      url: '/newsletter',
      templateUrl: 'newsletter.html',
      controller: 'NewsletterController'
    })

		.state('philosophy', {
      url: '/philosophy',
      templateUrl: 'philosophy.html',
      controller: 'PhilosophyController'
    });

		// $locationProvider.html5Mode(true);
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

.controller('FacultyController', function() {

})

.controller('FAQController', function() {

})

.controller('HomeController', function() {

})

.controller('NewsletterController', function() {

})

.controller('PhilosophyController', function() {

})

.controller('HeaderController', function($state) {
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
