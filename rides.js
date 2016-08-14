window.addEventListener('load', function(){
  debugger;
  var showUser = document.getElementById('userName');
  var userSession = JSON.parse(sessionStorage.getItem('activeUser'));
  showUser.innerHTML = userSession.username;
});

var el = document.getElementById('addRide');
if(el){
  document.getElementById('addRide').addEventListener("click", function(){
    if(checkInputs()){
      if(checkHours()){
        if(checkDays()){
          alert('Ride Added');
        }else {
          alert('Problema al agregar Ride, verifique información');
        }
      }else {
        alert('Problema al agregar Ride, verifique información');
      }
    }else {
      alert('Problema al agregar Ride, verifique información');
    }
  });
}

function checkInputs(){
  for (var i = 0; i < rideInfo.length; i++) {
    if(rideInfo[i].type == 'text'){
      var checkTest = rideInfo[i].value.replace(/\s/gi,'');
      if(checkTest == null || checkTest.length == 0) {
        alert("Campo sin rellenar -> " + rideInfo[i].id);
        document.rideInfo.rideInfo[i].focus();
        return false;
        }
      }
    }
    return true;
};

var time = new Object();

function checkHours(){
  time.deptHour = document.getElementById('departureHour').value;
  time.deptSelect = document.getElementById('departureSelect').value;
  time.arrvHour = document.getElementById('arriveHour').value;
  time.arrvSelect = document.getElementById('arriveSelect').value;
  if(time.deptHour == "" || time.arrvHour == ""){
    alert("Registre horas correctamente");
    return false;
  }else {
    return true;
  }
}

var days = [];
function checkDays(){
    getDays();
  if(days.length > 0){
    createRide();
    saveRide();
    return true;
  }else {
    alert('Debe marcar al menos un día');
  }
}

function getDays(){
  days = [];
  var divCont = document.getElementById('days');
  var checks  = divCont.getElementsByTagName('input');
  for(i=0;i<checks.length; i++){
    if(checks[i].checked == true){
      alert(checks[i].value);
        days.push(checks[i].value);
    }
  }
  //return days;
}

var ride = new Object();

function createRide(){
  debugger;
  ride.user = document.getElementById('userName').innerHTML;
  ride.name = document.getElementById('name').value;
  ride.start = document.getElementById('start').value;
  ride.end = document.getElementById('end').value;
  ride.description = document.getElementById('description').value;
  ride.departureFirst = document.getElementById('departureFirst').value;
  ride.departureSecond = document.getElementById('departureSecond').value;
  ride.arriveFirst = document.getElementById('arriveFirst').value;
  ride.arriveSecond = document.getElementById('arriveSecond').value;
  ride.days = days;
}

function saveRide(){
  debugger;
    var myArray = [];
    myArray = JSON.parse(localStorage.getItem('rides'));
    myArray = myArray || [];     /*check if it's not null and create one if needed*/
    myArray.push(ride);
    localStorage.setItem('rides', JSON.stringify(myArray));
    location.reload(true);
    ride = new Object();
}
