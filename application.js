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

document.getElementById('addUser').addEventListener("click", function generalValidated(){
  if(checkInputs()){
    if(checkPasswords()){
        alert("Ha sido true");
    }else {
      alert("Error en registro");
      document.alignedForm.pass.required;
    }
  }
});


function checkPasswords(){
  var pass1 = document.getElementById('pass').value;
  var pass2 = document.getElementById('repeatpass').value;
  if(pass1 == pass2){
    return true;
  }else {
    alert("Error passwords");
    return false;
  }
}

function checkUser(){
  //Si sale bien acá llamo a saveUser()
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
