document.addEventListener("deviceready", onDeviceReady, false);
var db;
var saldo_m = document.getElementById('saldo_m');
var saldo_aca = document.getElementById('saldo_aca');
var patrimonio = document.getElementById('patrimonio');
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

db.transaction(function (tx) {
  tx.executeSql("select * from test_table;", [], function (tx,res) {
  saldo_m.innerHTML = res.rows.item(0).saldo_m;
  saldo_aca.innerHTML = res.rows.item(0).saldo_aca;
  patrimonio.innerHTML =  res.rows.item(0).patrimonio;
  alert(res);
},function (error) {
  alert("Error al realizar la petcicion")
});
});
}
