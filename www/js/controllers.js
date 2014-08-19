angular.module('ausadhi.controllers', [])

// The base controller
.controller('AppCtrl', ['$scope', function($scope) {}])

.controller('MedicinesCtrl', ['$scope', 'Medicine', function($scope, Medicine) {
  Medicine.all(function(data) {
    $scope.medicines = data;
  });

  $scope.deleteMed = function($index, $event) {
    $scope.medicines.splice($index, 1);
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

