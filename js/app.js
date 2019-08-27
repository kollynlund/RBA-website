(function(app){
  // ROUTES
  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeController as hc'
      })

      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
      })

      .state('recoverycoaching', {
        url: '/recoverycoaching',
        templateUrl: 'templates/recoverycoaching.html'
      })

      .state('salescoaching', {
        url: '/salescoaching',
        templateUrl: 'templates/salescoaching.html'
      })

      .state('team', {
        url: '/team',
        templateUrl: 'templates/team.html',
        controller: 'CompanyController as fc'
      })


      .state('apply', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'ApplyController as apc'
      })

      .state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'ContactController as cc'
      })

      .state('privacy-statement', {
        url: '/privacy-statement',
        templateUrl: 'templates/privacy-statement.html'
      })

      .state('security-statement', {
        url: '/security-statement',
        templateUrl: 'templates/security-statement.html'
      })

      .state('terms-of-service', {
        url: '/terms-of-service',
        templateUrl: 'templates/terms-of-service.html'
      })


      .state('startupaccelerators', {
        url: '/startupaccelerators',
        templateUrl: 'templates/startupaccelerators.html'
      })

      .state('comingsoon', {
        url: '/comingsoon',
        templateUrl: 'templates/comingsoon.html'
      })


      .state('courses', {
        url: '/courses',
        templateUrl: 'templates/courses.html'
      })

      .state('solutions', {
        url: '/solutions',
        templateUrl: 'templates/solutions.html',
        controller: 'CompanyController as fc'
      })

      .state('support', {
        url: '/support',
        templateUrl: 'templates/support.html',
        controller: 'CompanyController as fc'
      })

      .state('faq', {
        url: '/faq',
        templateUrl: 'templates/faq.html'
      })

      .state('newsletter', {
        url: '/newsletter',
        templateUrl: 'templates/newsletter.html'
      })

      .state('product', {
        url: '/product',
        templateUrl: 'templates/product.html'
      });

      // $locationProvider.html5Mode(true);

  };

  // CUSTOM DIRECTIVES
  function bindVideoSize($window, $timeout, VideoSize) {
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, element) {
        function bindSize() {
          scope.$apply(function() {
            VideoSize.dimensions.width = element[0].clientWidth;
            VideoSize.dimensions.height = element[0].clientHeight;
          });
        };
        $window.onresize = bindSize;
        // Allow current digest loop to finish before setting VideoSize
        $timeout(bindSize, 0);
      }
    };
  };

  // CONTROLLERS
  function HomeController($state, VideoSize) {
    var hc = this;
    hc.dimensions = VideoSize.dimensions;
    hc.goToAbout = function() {
      $state.go('about');
    }
  };
  function ApplyController($scope, $modal, DataTransfer) {
    var apc = this;
    apc.application = {};
    apc.stupidIdiot = true;
    apc.completed = false;

    $scope.$watchCollection(watchApplication, handleAppicationChange);
    function watchApplication() {
      return [
        apc.application.first_name,
        apc.application.telephone_number,
        apc.application.email,
      ]
    };
    function handleAppicationChange(newVals, oldVals) {
      if (
        newVals[0] &&
        newVals[1] &&
        newVals[2]

      ) {
        apc.stupidIdiot = false;
      }
      else {
        apc.stupidIdiot = true;
      }
    };

    apc.openInfoModal = function (infoSubject) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'Application File Info Modals/'+infoSubject+'.html',
        controller: 'GenericModalController as amc',
        size: 'lg'
      });
    };

    apc.submitForm = function() {
      DataTransfer.SendApplication(apc.application);
      DataTransfer.SendApplicationEmail();
      apc.completed = true;
      $modal.open({
        animation: true,
        templateUrl: 'templates/application-submitted-modal.html',
        controller: 'GenericModalController as mc',
        size: 'lg'
      });
    };
  };
  function ContactController($scope, DataTransfer) {
    var cc = this;
    cc.formValid = false;
    cc.emailSent = false;
    cc.formData = {
      name:'',
      email:'',
      phone:'',
      message:''
    };

    function watchFormData() {
      return [cc.formData.name, cc.formData.email]
    };
    function handleFormDataChange() {
      if (cc.formData.name && emailRegex.test(cc.formData.email)) {
        cc.formValid = true;
      } else {
        cc.formValid = false;
      }
    };
    $scope.$watchCollection(watchFormData,handleFormDataChange);

    cc.submitForm = function() {
      if (cc.formValid) {
        DataTransfer.SendContactEmail(cc.formData);
        cc.emailSent = true;
      }
    };
  };
  function CompanyController($modal) {
    var fmc = this;
    fmc.open = function (facultyMemberName) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'Modals/'+facultyMemberName+'.html',
        controller: 'GenericModalController as fmc',
        size: 'lg'
      });
    };
  };
  function GenericModalController($modalInstance) {
    this.close = function () {
      $modalInstance.close();
    };
  };
  function HeaderController($scope,$state,$window) {
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
      $scope.showMenu = false;
    }
  };
  function FooterController() {
    this.currentYear = new Date().getFullYear();
  };

  // SERVICES
  function VideoSize($interval) {
    var dimensions = {
      'width': null,
      'height': null
    };

    return {
      'dimensions': dimensions
    };
  };
  function DataTransfer($http) {
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
              "from_name": "New Message from MyRoadmap",
              "to": [
                {
                  "email": "kollyn.lund@gmail.com ",
                  "name": "Kollyn Lund",
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
                  "email": "kollyn.lund@gmail.com ",
                  "name": "Kollyn Lund",
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
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSdxmCFnF5pA9doyY9S3TNv4b1F2HqPsyoDIMMvUkndfRuPWuQ/formResponse',
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
            'entry.757327993': the_data.telephone_number || '',
            'entry.344209816': the_data.email || '',
          }
        });
      }
    }
  };



  // RANDOM GLOBAL UTILITIES
  var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  app
  .config(routes)
  .directive('bindVideoSize',bindVideoSize)
  .controller('HomeController', HomeController)
  .controller('ApplyController', ApplyController)
  .controller('ContactController', ContactController)
  .controller('CompanyController', CompanyController)
  .controller('GenericModalController', GenericModalController)
  .controller('HeaderController', HeaderController)
  .controller('FooterController', FooterController)
  .factory('VideoSize', VideoSize)
  .factory('DataTransfer', DataTransfer)
})(angular.module('myroadmap',['ui.router','ui.bootstrap','ngAnimate', 'ngSanitize']));
