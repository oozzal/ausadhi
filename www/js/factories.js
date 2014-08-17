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

  var medicines = [
    {id: 1, name: "Aciloc", times: 3, start_at: "6 AM", description: "Acidity control."},
    {id: 2, name: "Nims", times: 2, start_at: "10 AM", description: "Headache control"},
    {id: 3, name: "Amoxycilin", times: 1, start_at: "10 PM", description: "General antibotic."},
    {id: 4, name: "Honitus", times: 4, start_at: "7 AM", description: "Cough syrup."}
  ];

  return angular.extend(BaseModel, {
    all: function(callback) {
      var meds = [];
      angular.forEach(medicines, function(med) {
        meds.push(BaseModel.build(med));
      });
      callback(meds);
    },

    get: function(medicineId, callback) {
      var med = medicines.filter(function(med) { return med.id === parseInt(medicineId) })[0];
      callback(BaseModel.build(med));
    },

    dosage: function() {
      return this.times + " time" + (this.times > 1 ? "s" : "") + " starting at " + this.start_at;
    }
  });
}]);

