/**
 * Created by yulin on 7/12/2015.
 */
define(["../module"], function (module) {
  module.controller("functionCtrl", ["$scope", "$ionicModal", function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    function getModalPage(name,obj) {
      $scope.listTitle = name;
      var s = "";
      switch (name) {
        case "photo":
          s = "<img id='myImage'>";
          $scope.openModal();
          document.querySelector("#modalContent").innerHTML = s;
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + obj;
          break;
        case "contacts":
          for (var i=0; i<obj.length; i++) {
            s += "<a class='item item-icon-left row'>" + "<span class='col col-50'>姓名:" + obj[i].displayName + "</span><span class='col col-50'>号码:" + obj[i].phoneNumber + "</span></a>";
          };
          $scope.openModal();
          document.querySelector("#modalContent").innerHTML = s;
          break;
        case "device":
          angular.forEach(obj, function(value, key){
            s += "<a class='item item-icon-left row'>" + "<span class='col col-90'>" + key + ":" + value + "</span></a>";
          });
          $scope.openModal();
          document.querySelector("#modalContent").innerHTML = s;
          break;
        case "file":
          $scope.openModal();
          document.querySelector("#modalContent").innerHTML = obj;
          break;
        default :
          break;
      }
    };




    //take photo start
    $scope.takePhoto = function() {
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL});

      function onSuccess(imageData) {
        getModalPage("photo", imageData);
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }
    //take photo end

    //contacts information start
    $scope.getContactsInformaiton = function() {
      var fields = ["displayName", "phoneNumbers"];
      navigator.contacts.find(fields,function(contacts) {
        console.log('Found ' + contacts.length + ' contacts.');
        var contactsArray = [];
        for (var i=0; i<contacts.length; i++) {
          var contactObj = {
            displayName: contacts[i].displayName,
            phoneNumber: contacts[i].phoneNumbers[0].value
          };
          contactsArray.push(contactObj);
        }
        getModalPage("contacts", contactsArray);
        console.log(contactsArray);
      });
    }
    //contacts information end

    //device information start
    $scope.getDeviceInformation = function() {
      //available: true
      //cordova: "4.0.2"
      var deviceInformation = {
        brand: device.manufacturer,
        model: device.model,
        platform: device.platform,
        platformVersion: device.version,
        uuid: device.uuid
      };
      getModalPage("device", deviceInformation);
      console.log(deviceInformation);
    }
    //device information end


    //check network start
    $scope.checkNetwork = function() {
      checkConnection();
    };

    function checkConnection() {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';

      navigator.notification.alert(
        'Connection type: ' + states[networkState],  // message
        '',         // callback
        'Hint',            // title
        'OK'                  // buttonName
      );

    };

    //document.addEventListener("offline", onOffline, false);
    //
    //function onOffline() {
    //  alert("offline");
    //};
    //
    //document.addEventListener("online", onOnline, false);
    //
    //function onOnline() {
    //  alert("online");
    //}

    //check network end


    //get vibration start
    $scope.startVibration = function() {
      navigator.vibrate(3000);
      //navigator.vibrate([1000, 1000, 3000, 1000, 5000]);
    }
    $scope.cancelVibration = function() {
      navigator.cancelVibration();
    }
    //get vibration end

    //get geolocation start
    $scope.getGeolocation = function() {
      function onSuccess(position) {
        alert('Latitude: '    + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
      };

      function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 15000, enableHighAccuracy: true });
    }
    //get geolocation end

    //get battery start
    $scope.getBattery = function() {
      window.addEventListener("batterystatus", onBatteryStatus, false);
      function onBatteryStatus(info) {
        // Handle the online event
        navigator.notification.alert(
          'Level: ' + info.level + 'isPlugged: ' + info.isPlugged,  // message
          '',         // callback
          'Hint',            // title
          'OK'                  // buttonName
        );
      }
    }
    //get bettery end


    $scope.getFileUrl = function() {
      init();
    }
    function init() {
      //$scope.imgURL = cordova.file.applicationDirectory + "www/img/ionic.png";
      window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/modules/mine/html/mine.html", gotFile, fail);
    }

    function fail(e) {
      console.log("FileSystem Error");
      console.dir(e);
    }

    function gotFile(fileEntry) {

      fileEntry.file(function(file) {
        var s = "";
        s += "<b>name:</b> " + file.name + "<br/>";
        s += "<b>localURL:</b> " + file.localURL + "<br/>";
        s += "<b>type:</b> " + file.type + "<br/>";
        s += "<b>lastModifiedDate:</b> " + (new Date(file.lastModifiedDate)) + "<br/>";
        s += "<b>size:</b> " + file.size + "<br/>";

        getModalPage("file", s);
        console.dir(file);
      });
    }



  }])
})
