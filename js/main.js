document.addEventListener("deviceready", onDeviceReady, false);
var db;
function onDeviceReady(){
  db = window.sqlitePlugin.openDatabase({name:"tp1.db"});

db.transaction(function (tx) {
  tx.executeSql('Drop Table IF EXISTS test_table')
  tx.executeSql('Create Table IF NOT EXISTS test_table(ROLLNO INT,  saldo_m integer, saldo_aca integer, patrimonio integer)');
},
function (error) {
  alert("Error en crear la tabla")
});

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
}
