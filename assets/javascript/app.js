
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgcxhHy9fK_lGOde_-QrNEMJ_-rC1hWnI",
    authDomain: "trainactivity-fb3da.firebaseapp.com",
    databaseURL: "https://trainactivity-fb3da.firebaseio.com",
    projectId: "trainactivity-fb3da",
    storageBucket: "trainactivity-fb3da.appspot.com",
    messagingSenderId: "412331746988"
  };
  firebase.initializeApp(config);


 //Create Database
  var database=firebase.database();


$('body').on("click","#add-train",function(event){
  event.preventDefault();



  var trainName=$('#train-input').val().trim();

  console.log("Line 25 " + trainName);
  var destination= $('#destination-input').val().trim();
  var startTimeOfTrain= $('#startTimeOfTrain-input').val().trim();
  var frequencyInput= $('#freq-input').val().trim();

 database.ref().push({
        trainName: trainName,
        destination: destination,
        startTimeOfTrain: startTimeOfTrain,
        frequencyInput: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });


});



database.ref().on("child_added", function(childsnapshot){
 	console.log(childsnapshot.val().trainName);
 	console.log(childsnapshot.val().destination);
 	console.log(childsnapshot.val().startTimeOfTrain);
 	console.log(childsnapshot.val().frequencyInput);




$('table tr:last')
.after(
    '<tr><td>'  + childsnapshot.val().trainName 
  + '</td><td>' + childsnapshot.val().destination
  + '</td><td>' + childsnapshot.val().frequencyInput
  + '</td><td>' +
  + '</td><td>'
  )


});


