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
    all: function(db, callback) {
      var meds = [];
      if(window.cordova) {
        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM medicines", function(tx, res) {
            alert("length: " + res.rows.length + ", item: " + res.rows.item(0).name);
            var total = res.rows.length;
            for(i = 0; i < total; i++) {
              var item = res.rows.item(i);
              meds.push(BaseModel.build(item));
            }
            callback(meds);
          });
        }, function(e) {
          alert("Error: " + e.message);
        });
      } else {
        angular.forEach(medicines, function(med) {
          meds.push(BaseModel.build(med));
        });
        callback(meds);
      }
    },

    get: function(medicineId, callback) {
      var med = medicines.filter(function(med) { return med.id === parseInt(medicineId) })[0];
      callback(BaseModel.build(med));
    },

    add: function(db, med) {
      if(!window.cordova) return false;
      db.transaction(function(tx) {
        tx.executeSql("INSERT INTO medicines(name, description, times, start_at) VALUES(?,?,?,?)", [med.name, med.description, med.times, med.start_at], function() {
          alert("medicine added: " + med.name);
        }, function(e) {
          alert("error adding medicine due to: " + e.message);
        });
      });
    },

    dosage: function() {
      return this.times + " time" + (this.times > 1 ? "s" : "") + " starting at " + this.start_at;
    }
  });
}]);

