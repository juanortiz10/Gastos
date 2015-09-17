document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(populateDB, errorCB, successCB);
    }

    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    //function will be called when process succeed
    function successCB() {
        console.log("success!");
    }
    //create table and insert some record
    function populateDB(tx) {
      console.log("POPULATE DB");
      tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
      tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text  )');
      tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
      tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
      tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
      tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)');
    }

    //function will be called when an error occurred


//El reven starts checale lo que hice mero arriba, si no en el main .js
function insertarIngresos(id){
  var saldo_agregar = document.getElementById('saldo_agregar').value;
  console.log(typeof(saldo_agregar));
    var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
    dba.transaction(function(tx) {
        tx.executeSql("INSERT INTO saldos_ingreso(monto_ingresado, id_categoria_ingreso) VALUES (?,?)",[saldo_agregar, id], successCB, errorCB);
        tx.executeSql("UPDATE cta SET saldo = saldo +  ? where id_cuenta_in = 1",[saldo_agregar], successCB, errorCB);
        getSaldo();
    });
}

function getTitleIngresos(id){
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
  dba.transaction(function(tx) {
    tx.executeSql("SELECT nombre_categoria_ingreso FROM categorias_ingreso where id_categoria_ingreso = ? ",[id], function (tx, res) {
      document.getElementById('title').innerHTML = res.rows.item(0).nombre_categoria_ingreso;
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}

function getTitleEgresos(id){
  console.log(id);
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
  dba.transaction(function(tx) {
    tx.executeSql("SELECT nombre_subcategoria_egreso FROM subcategorias_egreso where id_subcategoria_egreso = ? ",[id], function (tx, res) {
      document.getElementById('title').innerHTML = res.rows.item(0).nombre_subcategoria_egreso;
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}

function insertarEgresos(id) {
  var saldo_agregar = document.getElementById('saldo_agregar').value;
    var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
    dba.transaction(function(tx) {
        tx.executeSql("INSERT INTO saldos_egreso(monto_egresado, id_subcategoria_egreso) VALUES (?,?)",[saldo_agregar, id], successCB, errorCB);
        tx.executeSql("UPDATE cta SET saldo = saldo -  ? where id_cuenta_in = 1",[saldo_agregar], successCB, errorCB);
        getSaldo();
    });
}

function getSaldo() {
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
  dba.transaction(function(tx) {
    tx.executeSql("SELECT *  FROM cta where id_cuenta_in = 1",[], function (tx, res) {
      document.getElementById('saldo').value = res.rows.item(0).saldo;
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}
//El reven ends
