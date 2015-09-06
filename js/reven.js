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
        db.transaction(queryDB,errorCB);
    }
 
    function queryDB(tx){
        tx.executeSql('SELECT id_categoria_ingreso,nombre_categoria_ingreso FROM categorias_ingreso',[],querySuccess,errorCB);
    }
 
    function querySuccess(tx,result){
         $.each(result.rows,function(index){
           var row = result.rows.item(index);
          $('#main_table').append('<tr><td class="row"><a href="../views/three.html" onclick="sendId('+row['id_categoria_ingreso']+')">'+row['nombre_categoria_ingreso']+'</a></td></tr>');
         });
    }

//El reven starts checale lo que hice mero arriba, si no en el main .js 
function insertarIngresos(id){
  var nombre = document.getElementById('saldo_agregar').value;
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

  dba.transaction(function(tx) {
    tx.executeSql("INSERT INTO saldos_ingreso(monto_ingresado, id_categoria_ingreso) VALUES (?,?)",[saldo_agregar, id], correctCB, errorCB);
    tx.executeSql("UPDATE cta SET saldo = saldo + ?",[saldo_agregar], correctCB, errorCB);
  });
}

function insertarEgresos(id) {
  var nombre = document.getElementById('saldo_agregar').value;
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

  dba.transaction(function(tx) {
    tx.executeSql("INSERT INTO saldos_egreso(monto_egresado, id_categoria_egreso) VALUES (?,?)",[saldo_agregar, id], correctCB, errorCB);
    tx.executeSql("UPDATE cta SET saldo = saldo - ?",[saldo_agregar], correctCB, errorCB);
  });
}

function getSaldo() {
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
  dba.transaction(function(tx) {
    tx.executeSql("SELECT saldo FROM cta",[], function (tx, res) {
      document.getElementById('saldo').value = res.rows.item(0).saldo
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}
//El reven ends