window.addEventListener('load', function(){
  var username = "bher";
  var name = "Byron";

  var row = "<tr><td>"+username+"</td><td>"+name+"</td></tr>";
  var table = document.getElementById("users_table");
  table.innerHTML = table.innerHTML + row;
  debugger;
  var x = document.getElementById('testSS');

  var n = JSON.parse(sessionStorage.getItem('activeUser'));
  var m = n.username;
  x.innerHTML = m;
});
