/*Funciones de Login*/
var el = document.getElementById('submitLogin');
if(el){
  document.getElementById('submitLogin').addEventListener("click", function(){
    var myArray = [];
    var user = document.getElementById('userLogin').value;
    var pass = document.getElementById('passwordLogin').value;
    //var messageDash = document.getElementById("dashTest");
    if (getJson(user, pass)) {
        debugger;
        location.href = "dashboard.html";
    }else {
      alert("NO EXISTE USUARIO");
    }
  });
}

/*
setInterval(function () {
  var dinamictext = document.querySelector('dinamictext');
    if (dinamictext.value !== localStorage['superValue']) {
        dinamictext.value = localStorage['superValue'];
    }
}, 100);*/

function getJson(user, pass){
  var myArray = [];
  myArray = JSON.parse(localStorage.getItem('rideUsers'));
  myArray = myArray || [];     /*check if it's not null and create one if needed*/
  for (var i = 0; i < myArray.length; i++) {
    if(user == myArray[i].username){
      if(pass == myArray[i].password){
        return true;
        break;
      }
    }
  }
}

/*Funciones de registro*/
var el2 = document.getElementById('addUser');
if(el2){
  document.getElementById('addUser').addEventListener("click", function(){
    var message1 = document.getElementById('confirmMessage').innerHTML;
    var message2 = 'Passwords Match!';
    if(checkInputs()){
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
    //Store the password field objects into variables ...
      var pass1 = document.getElementById('pass');
      var pass2 = document.getElementById('repeatpass');
      //Store the Confimation Message Object ...
      var message = document.getElementById('confirmMessage');
      //Set the colors we will be using ...
      var goodColor = "#66cc66";
      var badColor = "#ff6666";
      //Compare the values in the password field
      //and the confirmation field
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

function checkInputs(){
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
  saveUser(person);
}

function saveUser(person){
  var myArray = [];
  myArray = JSON.parse(localStorage.getItem('rideUsers'));
  myArray = myArray || [];     /*check if it's not null and create one if needed*/
  myArray.push(person);
  localStorage.setItem('rideUsers', JSON.stringify(myArray));
  alert("User Added");
  location.reload(true);
}

function tableLoad(){
  debugger;
  var username = "bher";
  var name = "Byron";

  var row = "<tr><td>"+username+"</td><td>"+name+"</td></tr>";
  var table = document.getElementById("users_table");
    table.innerHTML = table.innerHTML + row;
}
