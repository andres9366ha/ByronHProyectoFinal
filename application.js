window.onload = function Probar(){
    var x = new Array();
    var y = localStorage.getItem('rides');
    x = JSON.parse(y);
    var table = document.createElement("TABLE");
    table.border = "1";

    var ths = ["user", "start", "end", "Actions"];
    var columnCount = ths.length;


    //Add Header Row
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = ths[i];
      row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 0; i < x.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < ths.length; j++) {
        var cell = row.insertCell(-1);
        //cell.innerHTML = x[i].number;
        switch (j) {
          case 0:
            cell.innerHTML = x[i].user;
            break;
          case 1:
            cell.innerHTML = x[i].start;
            break;
          case 2:
            cell.innerHTML = x[i].end;
            break;
          case 3:
          cell.innerHTML = '<a href="login.html">View</a>';
          break;
          default: cell.innerHTML = 0;
        }
      }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);

/*
    for (var i = 0; i < x.length; i++) {
      alert('Nombre: '+ x[i].name + ', apellido: ' + x[i].lastname + ', número telefónico: ' + x[i].number);
    }*/
  }
