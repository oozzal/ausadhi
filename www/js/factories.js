angular.module("ausadhi.factories", [])

.factory("BaseModel", [function() {
  return {
    build: function(data) {
      var model = Object.create(this);
      angular.extend(model, data);
      return model;
    }
  }
}])

.factory("Medicine", ["BaseModel", "$http", function(BaseModel, $http) {

  return angular.extend(BaseModel, {
    all: function(callback) {
      $http.get("/medicines.json")
      .success(function(resources) {
        var meds = [];
        angular.forEach(resources, function(res) {
          meds.push(BaseModel.build(res));
        });
        callback(meds);
      });
    },

    get: function(medicineId, callback) {
      $http.get("/medicines.json")
      .success(function(resources) {
        var med = resources.filter(function(res) { return res.id === parseInt(medicineId) })[0];
        callback(BaseModel.build(med));
      });
    },

    dosage: function() {
      return this.times + " time" + (this.times > 1 ? "s" : "") + " starting at " + this.start_at;
    }
  });
}]);

