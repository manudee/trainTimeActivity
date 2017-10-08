var minsToNext;
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
  var startTimeOfTrain=$('#startTimeOfTrain-input').val().trim();
  var frequencyInput=$('#freq-input').val().trim();



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


var startTimeInMins = moment.duration(childsnapshot.val().startTimeOfTrain).asMinutes();
console.log("Line 149 " + startTimeInMins);



var currTimeFormat = moment().format("HH:mm");
console.log("Line 152 " + currTimeFormat);




var currTimeInMins = moment.duration(currTimeFormat).asMinutes();
console.log("Line 155 " + currTimeInMins );


var minsDiff = currTimeInMins - startTimeInMins;
console.log("Line 159 " + minsDiff);



  minsToNext = childsnapshot.val().frequencyInput - (minsDiff % childsnapshot.val().frequencyInput);


console.log("Line 162 Mins to Next " +  minsToNext);

var timeToNext = currTimeInMins + minsToNext;


var hoursToNext = Math.floor(timeToNext/60);

var minutesToNext = timeToNext%60;


var timeOfNextTrain = moment().set({'hour': hoursToNext, 'minutes': minutesToNext}).format("HH:mm");



$('table tr:last')
.after(
    '<tr><td>'  + childsnapshot.val().trainName 
  + '</td><td>' + childsnapshot.val().destination
  + '</td><td>' + childsnapshot.val().frequencyInput
  + '</td><td>' + timeOfNextTrain
  + '</td><td>' + minsToNext
  )




});

