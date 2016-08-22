var rides = [];
var index = document.getElementById('index');
if (index != null) {
    debugger;
    window.addEventListener('load', function(){
      debugger;
      setAllRidesToTable();
      getRides();
    });
}

/*Traer todos los rides del localStorage*/
function getRides(){
  rides = JSON.parse(localStorage.getItem('rides'));
  rides = rides || [];     /*check if it's not null and create one if needed*/
}

function showEnablePlaces(){

}


/*------------------------------------dashboard-------------------------------*/
var dashboard = document.getElementById('dashboard');
  debugger;
  var userSession;
if (dashboard != null) {
    window.addEventListener('load', function(){
      sessionStorage.removeItem('rideOption');
      getRides();
      var aShowUser = document.getElementById('showUser');
      var active = JSON.parse(sessionStorage.getItem('activeUser'));
      aShowUser.innerHTML = active.username;
      getOwnRides();
      tableLoad();
    });
}

/*poner los rides del usuario*/
function getOwnRides(){
  debugger;
  var user = JSON.parse(sessionStorage.getItem('activeUser'));

  for (var i = 0; i < rides.length; i++) {
    if(rides[i].user == user.username){
      var row = '<tr><td>'+rides[i].user+'</td><td>'+rides[i].name+'</td><td>'
      +rides[i].start+'</td>'+'<td>'+rides[i].end+'</td><td>OPTIONS</td></tr>';
      var table = document.getElementById("ownRides");
      table.innerHTML = table.innerHTML + row;
    }
  }
}

/*Función que permite hacer el último td link*/
function tableLoad(){
  var table = document.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];
  table.onclick = function (e) {
      e = e || window.event;
      var data = [];
      var target = e.srcElement || e.target;
      if(e.srcElement.textContent == 'OPTIONS'){
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target) {
            var cells = target.getElementsByTagName("td");
            for (var i = 0; i < cells.length; i++) {
                  data.push(cells[i].innerHTML);
            }
        }
        sessionStorage.setItem('rideOption', data);
        location.href="rides.html";
      }
  };
}

/*----------------------------dashboard---------------------------------------*/

/*Obtener rides para mostrarlos en el dashboard publico*/
function setAllRidesToTable(){
  debugger;
  getRides();
  for (var i = 0; i < rides.length; i++) {
    var row = '<tr><td>'+rides[i].user+'</td><td>'+rides[i].name+'</td><td>'
      +rides[i].start+'</td>'+'<td>'+rides[i].end+'</td><td>View</td></tr>';
    var table = document.getElementById("publicRides");
    table.innerHTML = table.innerHTML + row;
  }
}

/*Funciones de Login*/
var el = document.getElementById('submitLogin');
if(el){
  document.getElementById('submitLogin').addEventListener("click", function(){
    debugger;
    var myArray = [];
    var user = document.getElementById('userLogin').value;
    var pass = document.getElementById('passwordLogin').value;
    //var messageDash = document.getElementById("dashTest");
    if (getJson(user, pass)) {
        location.href = "dashboard.html";
    }else {
      alert("NO EXISTE USUARIO");
    }
  });
}

function getJson(user, pass){
  debugger;
  var myArray = [];
  myArray = JSON.parse(localStorage.getItem('rideUsers'));
  myArray = myArray || [];     /*check if it's not null and create one if needed*/
  for (var i = 0; i < myArray.length; i++) {
    if(user == myArray[i].username){
      if(pass == myArray[i].password){
        uploadUser(myArray[i]);
        return true;
        break;
      }
    }
  }
}

/*Funcion que recibe usuario y lo coloca en el Session*/
function uploadUser(user){
  debugger;
  sessionStorage.clear();
  sessionStorage.setItem('activeUser', JSON.stringify(user));
}

/*Funciones de registro*/
var el2 = document.getElementById('addUser');
if(el2){
  document.getElementById('addUser').addEventListener("click", function(){
    debugger;
    var message1 = document.getElementById('confirmMessage').innerHTML;
    var message2 = 'Passwords Match!';
    if(checkInputsSignIn()){
      if(checkUser()){
        if(message1 == message2){
            createUser();
        }else {
          alert("Error en registro por: passwords");
        }
      }else {
        alert("Error en registro por: ya existe usuario");
      }
    }else {
      alert("Error en registro por: inputs");
    }
  });
}

var el3 = document.getElementById('repeatpass');
/*Método que se encargará de validar passwords con evento */
if(el3){
  document.getElementById('repeatpass').addEventListener('keyup', function validatePass(){
      var pass1 = document.getElementById('pass');
      var pass2 = document.getElementById('repeatpass');
      var message = document.getElementById('confirmMessage');
      var goodColor = "#66cc66";
      var badColor = "#ff6666";
      if(pass2.value == pass1.value){
          pass2.style.backgroundColor = goodColor;
          message.style.color = goodColor;
          message.innerHTML = "Passwords Match!"
          document.getElementById('addUser').disabled = false;
      }else{
          pass2.style.backgroundColor = badColor;
          message.style.color = badColor;
          message.innerHTML = "Passwords Do Not Match!";
          document.getElementById('addUser').disabled = true;
      }
  });
}

function checkInputsSignIn(){
  for (var i = 0; i < alignedForm.length; i++) {
    if((alignedForm[i].type == 'text') || (alignedForm[i].type == 'password')){
      var checkTest = alignedForm[i].value.replace(/\s/gi,'');
      if(checkTest == null || checkTest.length == 0) {
        alert("Campo sin rellenar -> " + alignedForm[i].id);
        document.alignedForm.alignedForm[i].focus();
        return false;
        }
      }
    }
    return true;
};

/*Comprobar si existe usuario*/
function checkUser(){
  var newUser = document.getElementById('username').value;
  var myArray = [];
  myArray = JSON.parse(localStorage.getItem('rideUsers'));
  myArray = myArray || [];
  for (var i = 0; i < myArray.length; i++) {
    if(newUser == myArray[i].username){
        return false;
    }
  }
  return true;
}

function createUser(){
  var person = new Object();
  person.name = document.getElementById('name').value;
  person.lastname = document.getElementById('lastname').value;
  person.phone = document.getElementById('phone').value;
  person.username = document.getElementById('username').value;
  person.password = document.getElementById('pass').value;
  person.repeatpass = document.getElementById('repeatpass').value;
  person.speedAverage = 'Not specified';
  person.aboutMe = 'Something about me goes here';
  saveUser(person);
}

function saveUser(person){
  debugger;
  var myArray = [];
  myArray = JSON.parse(localStorage.getItem('rideUsers'));
  myArray = myArray || [];     /*check if it's not null and create one if needed*/
  myArray.push(person);
  localStorage.setItem('rideUsers', JSON.stringify(myArray));
  alert("User Added");
  location.reload(true);
}

/*---------------------------------RIDES--------------------------------------*/
var bodyRides = document.getElementById('bodyRides');
if (bodyRides != null) {
    window.addEventListener('load', function(){
      disableInputs();
      getRides();
      debugger;
      var user = JSON.parse(sessionStorage.getItem('activeUser'));
      var showUser = document.getElementById('userName');
      showUser.innerHTML = user.username;
    });
}

/*Método para deshabilidar inputs y checkbox*/
function readOnly(){
  var form = document.getElementById("rideInfo");
  var elements = form.elements;
  document.getElementById('departureHour').readOnly = true;
  document.getElementById('arriveHour').readOnly = true;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
  }
}

function readOnlyCheck(){
  var count = 0;
  var formElems = document.getElementsByTagName('INPUT');
    for (var i = 0; i , formElems.length; i++)
    {
       if (formElems[i].type == 'checkbox')
       {
         count ++;
          formElems[i].disabled = true;
          if(count == 6){
            break;
          }
       }
    }
}

/*Método para habilidar inputs y checkbox*/
function enableEdit(){
  var form = document.getElementById("rideInfo");
  var elements = form.elements;
  document.getElementById('departureHour').readOnly = false;
  document.getElementById('arriveHour').readOnly = false;
  for (var i = 0, len = elements.length; i < len; ++i) {
    debugger;
    if(elements[i].id == 'name'){
      elements[i].readOnly = true;
    }else{
      elements[i].readOnly = false;
    }
  }
}

function enableEditCheck(){
  var count = 0;
  var formElems = document.getElementsByTagName('INPUT');
    for (var i = 0; i , formElems.length; i++)
    {
       if (formElems[i].type == 'checkbox')
       {
         count ++;
          formElems[i].disabled = false;
          if(count == 7){
            break;
          }
       }
    }
}

/*Función que permite comprobar si hay ride a editar/eliminar o se creará
uno nuevo*/
var state = false;
function disableInputs(){
  var array = sessionStorage.getItem('rideOption');
  if(array){
    readOnly();
    readOnlyCheck();
    document.getElementById('editRide').style.display = "visible";
    document.getElementById('deleteRide').style.display = "visible";
    state = true;
    makeEdit(array);
  }else{
    document.getElementById('editRide').style.display = "none";
    document.getElementById('deleteRide').style.display = "none";
  }
}

var btnEdit = document.getElementById('editRide');
if(btnEdit){
  document.getElementById('editRide').addEventListener("click", function(){
    enableEdit();
    enableEditCheck();
    document.getElementById('editRide').disabled = true;
  });
}

var btnDelete = document.getElementById('deleteRide');
if(btnDelete){
  document.getElementById('deleteRide').addEventListener("click", function(){
    debugger;
    for (var i = 0; i < rides.length; i++) {
        if(document.getElementById('name').value == rides[i].name){
          if(rides[i].user == userSession.userName){
            rides.splice(i,1);
            localStorage.setItem('rides', JSON.stringify(rides));
            location.reload(true);
            break;
          }
        }
    }
  });
}

function makeEdit(array){
  if(state){
    var position = array.split(',');
    rides = JSON.parse(localStorage.getItem('rides'));
    for (var i = 0; i < rides.length; i++) {
        if(position[0] == rides[i].user){
          if(position[1] == rides[i].name){
            putRide(rides[i]);
            setChecks(rides[i]);
            break;
          }
        }
    }
  }
}

function putRide(ride){
  document.getElementById('name').value = ride.name;
  document.getElementById('start').value = ride.start;
  document.getElementById('end').value = ride.end;
  document.getElementById('description').value = ride.description;
  document.getElementById('departureHour').value = ride.departureHour;
  document.getElementById('arriveHour').value = ride.arriveHour;
}

function setChecks(ride){
  var array = ride.days;
  var divCont = document.getElementById('days');
  var checks  = divCont.getElementsByTagName('input');
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < checks.length; j++) {
      if(array[i] == checks[j].value){
        document.getElementById(array[i]).checked=true;
        break;
      }
    }
  }
}

var el = document.getElementById('addRide');
if(el){
  document.getElementById('addRide').addEventListener("click", function(){
    if(checkInputs()){
      if(checkHours()){
        if(checkDays()){
          if(state){
            editRide();
            alert('Ride Edited');
          }else {
            createRide();
            saveRide();
            alert('Ride Added');
          }
        }
      }
    }
  });
}

//si existe user en el sesion o ride se busca y se edita
function editRide(){
  createRide();
  var user = JSON.parse(sessionStorage.getItem('activeUser'));
  for (var i = 0; i < rides.length; i++) {
      if(ride.name == rides[i].name){
        if(ride.user == user.username){
          rides.splice(i,1);
          rides.push(ride);
          localStorage.setItem('rides', JSON.stringify(rides));
          location.reload(true);
          ride = new Object();
          break;
        }
      }
  }
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
  time.arrvHour = document.getElementById('arriveHour').value;
  if((time.deptHour == "" || time.arrvHour == "") || (time.deptHour >= time.arrvHour)){
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
    //createRide();
    //saveRide();
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
        days.push(checks[i].value);
    }
  }
}

var ride = new Object();

function createRide(){
  debugger;
  var user = JSON.parse(sessionStorage.getItem('activeUser'));
  ride.user = user.username;
  ride.name = document.getElementById('name').value;
  ride.start = document.getElementById('start').value;
  ride.end = document.getElementById('end').value;
  ride.description = document.getElementById('description').value;
  ride.departureHour = document.getElementById('departureHour').value;
  ride.arriveHour = document.getElementById('arriveHour').value;
  ride.days = days;
}

function saveRide(){
  debugger;
    rides = rides || [];
    rides.push(ride);
    localStorage.setItem('rides', JSON.stringify(rides));
    location.reload(true);
    ride = new Object();
}
/*---------------------------------END RIDES----------------------------------*/

/*---------------------------------Settings------------------------------------*/
var settings = document.getElementById('settings');
if (settings != null) {
    window.addEventListener('load', function(){
      readOnlySettings();
      loadUserSettings();
      getUsers();
    });
}

function readOnlySettings(){
  var form = document.getElementById("settingsInfo");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
  }
}

function enableEditSettings(){
  var form = document.getElementById("settingsInfo");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = false;
  }
}

var btnEditSettings = document.getElementById('editSettings');
if(btnEditSettings){
  document.getElementById('editSettings').addEventListener("click", function(){
    enableEditSettings();
    document.getElementById('editSettings').disabled = true;
  });
}

function loadUserSettings(){
  var user = JSON.parse(sessionStorage.getItem('activeUser'));

  document.getElementById('firstName').value = user.name;
  document.getElementById('lastName').value = user.lastname;
  document.getElementById('phone').value = user.phone;
  document.getElementById('speedAverage').value = user.speedAverage;
  document.getElementById('aboutMe').value = user.aboutMe;
}

/*Salir de sesión*/
var linkSignOut = document.getElementById('signOut');
if(linkSignOut){
  document.getElementById('signOut').addEventListener("click", function(){
    sessionStorage.clear();
  });
}

var users = [];
function getUsers(){
  users = JSON.parse(localStorage.getItem('users'));
  users = users || [];
}

var btnEditUser = document.getElementById('editUser');
debugger;
if(btnEditUser){
  document.getElementById('editUser').addEventListener("click", function(){
    if(checkEditInputs()){
        editUser();
        alert('User Edited');
    }
    document.getElementById('editUser').disabled = true;
  });
}

function editUser(){
  debugger;
  var rideUsers = JSON.parse(localStorage.getItem('rideUsers'));
  var user = JSON.parse(sessionStorage.getItem('activeUser'));
    for (var i = 0; i < rideUsers.length; i++) {
      if(user.username == rideUsers[i].username){
        rideUsers[i].name = document.getElementById('firstName').value;
        rideUsers[i].lastname = document.getElementById('lastName').value;
        rideUsers[i].phone = document.getElementById('phone').value;
        rideUsers[i].speedAverage = document.getElementById('speedAverage').value;
        rideUsers[i].aboutMe = document.getElementById('aboutMe').value;
        rideUsers.splice(i,1);
        rideUsers.push(rideUsers[i]);
        localStorage.setItem('rideUsers', JSON.stringify(rideUsers));
        users = new Object();
        break;
      }
    }
}

function checkEditInputs(){
  debugger;
  var form = document.getElementById("settingsInfo");
  var elements = form.elements;
  for (var i = 0; i < elements.length; i++) {
    if(elements[i].type == 'text'){
      var checkTest = elements[i].value.replace(/\s/gi,'');
      if(checkTest == null || checkTest.length == 0) {
        alert("Campo sin rellenar -> " + elements[i].id);
        document.elements.elements[i].focus();
        return false;
        }
      }
    }
    return true;
};
