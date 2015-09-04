document.addEventListener("deviceready", onDeviceReady, false);
var db;
var saldo_m = document.getElementById('saldo_m');
var saldo_aca = document.getElementById('saldo_aca');
var patrimonio = document.getElementById('patrimonio');
function onDeviceReady(){
  db = window.sqlitePlugin.openDatabase({name:"tp1.db"});

db.transaction(function (tx) {
  tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text)');
  tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
  tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
  tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_categoria_egreso integer)');
  tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)');
},
function (error) {
  alert("Error en crear la tabla")
});
}
/*
db.transaction(function(tx) {
  tx.executeSql("INSERT INTO test_table(saldo_m,saldo_aca, patrimonio) VALUES (?,?,?)",[1000,2000,3000],function (tx,res) {
  },
function (error) {
  alert("Error al insertar un dato")
},
function (succes) {
  alert("inserId: "+ res.insertId + "-- probably 1")
});
});
*/
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

//El reven starts
function insertarIngresos(id){
  var nombre = document.getElementById('saldo_agregar').value;

  db.transaction(function(tx) {
    tx.executeSql("INSERT INTO saldos_ingreso(monto_ingresado, id_categoria_ingreso) VALUES (?,?)",[saldo_agregar, id], correct, errorCB);
    tx.executeSql("UPDATE cta SET saldo = saldo + ?",[saldo_agregar], correct, errorCB);
  });
}

function insertarEgresos(id) {
  var nombre = document.getElementById('saldo_agregar').value;

  db.transaction(function(tx) {
    tx.executeSql("INSERT INTO saldos_egreso(monto_egresado, id_categoria_egreso) VALUES (?,?)",[saldo_agregar, id], correct, errorCB);
    tx.executeSql("UPDATE cta SET saldo = saldo - ?",[saldo_agregar], correct, errorCB);
  });
}

function getSaldo() {
  db.transaction(function(tx) {
    tx.executeSql("SELECT saldo FROM cta",+[], function (tx, res) {
      document.getElementById().value = res.rows.item(0).saldo
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}
//El reven ends

//Juan Ortiz starts
function errorCB(err) {
     alert("Error processing SQL: "+err.code);
 }

function correct(succes) {
   alert("inserId: "+ res.insertId + "-- probably 1")
 }

function insertarCategoriaIngreso(){
    var nombre_categoria=document.getElementById('').value;
    db.transaction(function(tx){
      tx.executeSql('INSERT INTO categorias_ingreso(nombre_categoria_ingreso) VALUES(?) ',nombre_categoria,correct,errorCB);
    });
}

function cargarCategoriasIngreso(){
    db.transaction(function(tx) {
        tx.executeSql('SELECT id_categoria_ingreso,nombre_categoria_ingreso FROM categorias_ingreso',[], querySuccessIng, errorCB);
    });
}

function sendId(id_categoria){
  sessionStorage.setItem("id_categoria",id_categoria);
}

function querySuccessIng(tx,result){
       $('#main_table').empty();
       $.each(result.rows,function(index){
           var row = result.rows.item(index);
           $('#main_table').append('<tr><td class="row"><a href="../views/three.html" onclick="sendId('+row['id_categoria_ingreso']+')">'+row['nombre_categoria_ingreso']+'</a></td></tr>');
       });
   }
//Ends Juan Ortiz
