angular.module('contact-form',[])

.controller('SendApplicationController', function(DataTransfer) {
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