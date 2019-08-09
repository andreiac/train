setTimeout(function(){
    window.location.reload(1);
 }, 60000);

function appendToTable(train, destination, frequency, nextArrival, minutesAway) {
    $("#currentTrains").prepend("<tr id='tableRow'><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></td></tr>");

}

var firebaseConfig = {
    apiKey: "AIzaSyCrbBnusWngyXrq36a5HVkVrllcxSZrmzU",
    authDomain: "train-58687.firebaseapp.com",
    databaseURL: "https://train-58687.firebaseio.com",
    projectId: "train-58687",
    storageBucket: "",
    messagingSenderId: "240487979203",
    appId: "1:240487979203:web:0dc5b015fd70fa55"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


// Capture Button Click
$("#submitButton").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    database.ref().push({
        train: $("#train").val().trim(),
        destination: $("#destination").val().trim(),
        startTime: $("#startTime").val().trim(),
        frequency: $("#frequency").val().trim(),


    });

    $("#train").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");
});



database.ref().on("child_added", function (snapshot) {
    var databaseValue = snapshot.val();
    console.log(databaseValue);

    train = databaseValue.train;
    destination = databaseValue.destination
    startTime = databaseValue.startTime;
    frequency = databaseValue.frequency;

    var convertedStartTime = moment(startTime, "hh:mm A");

    var now = moment();

    console.log(now);

    var minuteOfArrival = now.diff(convertedStartTime, 'minutes');
    var minuteLast = minuteOfArrival % frequency;
    var minutesAway = frequency - minuteLast;
    var nextArrival = now.add(minutesAway, "minutes");
    var arrivaltime = nextArrival.format("h:mm A");


    $("#currentTrains").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + minutesAway + "</td>")




    // Create Error Handling
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

