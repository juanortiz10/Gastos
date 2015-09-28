 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it
    var results=0;
    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(populateDB, errorCB, successCB);
    }

    //create table and insert some record
    function populateDB(tx) {
        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text )');
        tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');
        tx.executeSql("INSERT OR IGNORE INTO cta(id_cuenta_in, nombre, saldo, isActive) values (1,'Default', 0, 1)");
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
      if (mm<10) {mm = '0' + mm;}else {mm = String(mm);}
      db.transaction(function(tx) {
          tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso WHERE strftime('%m', fecha_ingreso) = ? ", [mm], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso WHERE strftime('%m', fecha_egreso)  = ? ", [mm], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            document.getElementById('saldo_m').innerHTML = "$ " + (ingreso - egreso);
            selectAca();
            selectPat();
            nivel_riqueza();
            fecha();
          });
        });
      });
    }
    function selectAca(){
      var ingreso;
      var egreso= 0;
      var hoy = new Date();
      var yy = String(hoy.getFullYear());
      db.transaction(function(tx) {
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso WHERE strftime('%Y', fecha_ingreso) = ? ", [yy], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso WHERE strftime('%Y', fecha_egreso) = ?  ", [yy], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            document.getElementById('saldo_aca').innerHTML = "$ " + (ingreso - egreso);
          });
        });
      });
    }
    function selectPat(){
      var ingreso;
      var egreso= 0;
      db.transaction(function(tx) {
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso", [], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso", [], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            document.getElementById('patrimonio').innerHTML = "$ " + (ingreso - egreso);
          });
        });
      });
    }

    function nivel_riqueza() {
      var patrimonio = 0;
      var promedio = 0;
      var nivel_riqueza = 0;
      db.transaction(function(tx) {
        console.log("****************************************************");
        tx.executeSql("SELECT SUM(monto_ingresado) AS ingreso from saldos_ingreso", [], function(tx,res) {
          ingreso = Number(res.rows.item(0).ingreso);
          tx.executeSql("SELECT SUM(monto_egresado) AS egresado from saldos_egreso", [], function(tx,res) {
            egreso = Number(res.rows.item(0).egresado);
            patrimonio = ingreso - egreso;
            tx.executeSql("SELECT avg(monto_egresado) AS promedio from saldos_egreso ",[],function (tx,res) {
              promedio = Number(res.rows.item(0).promedio);
              if (promedio != 0) {
                nr = patrimonio/promedio;
                document.getElementById('nivel_riqueza').innerHTML = nr.toFixed(1);
              }else {
                nr = "0";
                document.getElementById('nivel_riqueza').innerHTML = nr;
              }
              console.log(nr);
            })
          });
        });
      });
    }
function fecha() {
  var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var hoy = new Date();
  var m = Number(hoy.getMonth());
  console.log("**************************" + mes[m]);
  document.getElementById('mes').innerHTML = "Saldo Del Mes: " + mes[m];
  document.getElementById('anio').innerHTML = "Saldo Acumulado Del Año: " + String(hoy.getFullYear());
}
