angular.module('ausadhi.controllers', [])

// The base controller
.controller('AppCtrl', ['$rootScope', '$scope', '$ionicModal', 'Medicine', function($rootScope, $scope, $ionicModal, Medicine) {
  $rootScope.med = {};

  $ionicModal.fromTemplateUrl('templates/add_medicine.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.modal = modal;
  });

  $rootScope.closeModal = function() {
    $rootScope.modal.hide();
  };

  $rootScope.$on('$destroy', function() {
    $rootScope.modal.remove();
  });

  $rootScope.addMed = function() {
    $rootScope.medicines.push(Medicine.build($rootScope.med));
    $rootScope.med = {};
    $rootScope.modal.hide();
  }
}])

.controller('MedicinesCtrl', ['$rootScope', 'Medicine', function($rootScope, Medicine) {
  Medicine.all(function(data) {
    $rootScope.medicines = data;
  });

  $rootScope.deleteMed = function($index, $event) {
    $rootScope.medicines.splice($index, 1);
    // $event.stopPropagation();
    $event.preventDefault();
  }
}])

.controller('MedicineCtrl', ['$scope', '$stateParams', 'Medicine', function($scope, $stateParams, Medicine) {
  Medicine.get($stateParams.medicineId, function(data) {
    $scope.medicine = data;
  });
}])

.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.author = "Uzzal Devkota";
}])

.controller('PicturesCtrl', ['$scope', '$cordovaCamera', function($scope, $cordovaCamera) {
  $scope.image_src = "img/default.png";
  $scope.takePicture = function() {
    var options = {
      quality : 100,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.image_src = imageURI;
    }, function(err) {
      $scope.error = err;
    });
  };

  $scope.deletePicture = function() {
    $scope.image_src = null;
  };

}]);

