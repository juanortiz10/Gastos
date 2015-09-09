 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(populateDB, errorCB, successCB);
    }

    //create table and insert some record
    function populateDB(tx) {
        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text)');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_categoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)');
    }

    //function will be called when an error occurred
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    //function will be called when process succeed
    function successCB() {
        console.log("success!");
        db.transaction(select,errorCB);
    }

    function select() {
      var ingreso;
      var egreso= 0;
      var hoy = new Date();
      var mm = hoy.getMonth()+1;
      if (mm<10) {mm = '0' + mm;}
      db.transaction(function(tx) {
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso WHERE strftime('%m', fecha_ingreso) = ? ", [mm], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso WHERE strftime('%m', fecha_egreso)  = ? ", [mm], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            document.getElementById('saldo_m').innerHTML = "$ " + (ingreso - egreso);
            selectAca();
            selectPat();
          });
        });
      });
    }

    function selectAca(){
      var ingreso;
      var egreso= 0;
      var hoy = new Date();
      var yy = hoy.getFullYear();
      db.transaction(function(tx) {
        console.log("***************************************************");
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso WHERE fecha_ingreso LIKE '"+yy+"%' ", [], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          console.log("Ingrsos "+ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso WHERE fecha_egreso LIKE '"+yy+"%'  ", [], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            console.log("Egresos "+ egreso);
            document.getElementById('saldo_aca').innerHTML = "$ " + (ingreso - egreso);
          });
        });
      });
    }
    function selectPat(){
      var ingreso;
      var egreso= 0;
      db.transaction(function(tx) {
        console.log("***************************************************");
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso", [], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          console.log("Ingrsos "+ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso", [], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            console.log("Egresos "+ egreso);
            document.getElementById('patrimonio').innerHTML = "$ " + (ingreso - egreso);
          });
        });
      });
    }

/*db.transaction(function (tx) {
  tx.executeSql("select * from test_table;", [], function (tx,res) {
  saldo_m.innerHTML = res.rows.item(0).saldo_m;
  saldo_aca.innerHTML = res.rows.item(0).saldo_aca;
  patrimonio.innerHTML =  res.rows.item(0).patrimonio;
  alert(res);
},function (error) {
  alert("Error al realizar la petcicion")
});
});*/
