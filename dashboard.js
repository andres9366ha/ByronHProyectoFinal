window.addEventListener('load', function test(){
  var username = "bher";
  var name = "Byron";

  var row = "<tr><td>"+username+"</td><td>"+name+"</td></tr>";
  var table = document.getElementById("users_table");
    table.innerHTML = table.innerHTML + row;
});
