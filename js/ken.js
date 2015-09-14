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
    
    
    
   function checarCuenta(){
	
		db.transaction(function(tx){
		tx.executeSql('SELECT COUNT(id_cuenta_in) AS cantidad FROM cta',function(tx,res){
			var chequeo = res.rows.item(0).cantidad
			
			if(chequeo==0){
    		
    		window.location=("../views/four-first.html");
    	}
    	else{
    		
    		window.location=("../index.html");
    	}
	});
	});
	}
    
    


function insertarNuevoSaldo(id) {
  var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
  dba.transaction(function(tx) {
    tx.executeSql('INSERT INTO cta(id_cuenta_in,saldo) VALUES (?,?)', successCB, errorCB);
  });
}
    
    
    
    
    
    



/*document.addEventListener("deviceready", onDeviceReady, false);
var db;
var saldo_m = document.getElementById('saldo_m');
var saldo_aca = document.getElementById('saldo_aca');
var patrimonio = document.getElementById('patrimonio');
function onDeviceReady(){
db = window.sqlitePlugin.openDatabase({name:"tp1.db"});
console.log(db);
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
