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
      tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer, id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer,  id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');
       tx.executeSql("INSERT OR IGNORE INTO cta(id_cuenta_in, nombre, saldo) values (1,'Yoshi', 0)");
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
     var ingreso=0;
     var egreso= 0;
     var hoy = new Date();
     var mm = hoy.getMonth()+1;
     if (mm<10) {mm = '0' + mm;}else {mm = String(mm);}
     db.transaction(function(tx) {
         tx.executeSql("SELECT SUM(saldos_ingreso.monto_ingresado) AS ingreso, saldos_ingreso.id_cuenta_in, cta.id_cuenta_in, cta.isActive from saldos_ingreso  JOIN cta ON saldos_ingreso.id_cuenta_in = cta.id_cuenta_in  WHERE strftime('%m', fecha_ingreso) = ? AND cta.isActive = 1", [mm], function(tx,res) {
           ingreso = Number(res.rows.item(0).ingreso);
         tx.executeSql("SELECT SUM(saldos_egreso.monto_egresado) AS egresado, saldos_egreso.id_cuenta_in,cta.id_cuenta_in, cta.isActive from saldos_egreso  JOIN cta ON saldos_egreso.id_cuenta_in = cta.id_cuenta_in  WHERE strftime('%m', fecha_egreso)  = ? AND cta.isActive = 1 ", [mm], function(tx,res) {
           egreso = Number(res.rows.item(0).egresado);
           console.log("-------------------------"+egreso);
           document.getElementById('saldo_m').innerHTML = "$ " + (ingreso - egreso);
           selectAca();
           selectPat();
           nivel_riqueza();
           date();
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
       tx.executeSql("SELECT SUM(saldos_ingreso.monto_ingresado) AS ingreso,saldos_ingreso.id_cuenta_in, cta.id_cuenta_in,cta.isActive from saldos_ingreso INNER JOIN cta ON saldos_ingreso.id_cuenta_in = cta.id_cuenta_in WHERE strftime('%Y', saldos_ingreso.fecha_ingreso) = ? AND cta.isActive = 1", [yy], function(tx,res) {
         ingreso = Number(res.rows.item(0).ingreso);
         tx.executeSql("SELECT SUM(saldos_egreso.monto_egresado) AS egresado, saldos_egreso.id_cuenta_in,cta.id_cuenta_in, cta.isActive from saldos_egreso INNER JOIN cta ON saldos_egreso.id_cuenta_in = cta.id_cuenta_in WHERE strftime('%Y', fecha_egreso) = ?  AND cta.isActive = 1", [yy], function(tx,res) {
           egreso = Number(res.rows.item(0).egresado);
           console.log("++++++++++++++++++++++" + ingreso - egreso);
           document.getElementById('saldo_aca').innerHTML = "$ " + (ingreso - egreso);

         });
       });
     });
   }
   function selectPat(){
     var ingreso;
     var egreso= 0;
     db.transaction(function(tx) {
       tx.executeSql("SELECT SUM(saldos_ingreso.monto_ingresado) AS ingreso,saldos_ingreso.id_cuenta_in, cta.id_cuenta_in,cta.isActive from saldos_ingreso INNER JOIN cta ON saldos_ingreso.id_cuenta_in = cta.id_cuenta_in WHERE cta.isActive = 1", [], function(tx,res) {
         ingreso = Number(res.rows.item(0).ingreso);
         tx.executeSql("SELECT SUM(saldos_egreso.monto_egresado) AS egresado, saldos_egreso.id_cuenta_in,cta.id_cuenta_in, cta.isActive from saldos_egreso INNER JOIN cta ON saldos_egreso.id_cuenta_in = cta.id_cuenta_in WHERE cta.isActive = 1", [], function(tx,res) {
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
       tx.executeSql("SELECT SUM(saldos_ingreso.monto_ingresado) AS ingreso,saldos_ingreso.id_cuenta_in, cta.id_cuenta_in,cta.isActive from saldos_ingreso INNER JOIN cta ON saldos_ingreso.id_cuenta_in = cta.id_cuenta_in WHERE cta.isActive = 1", [], function(tx,res) {
         ingreso = Number(res.rows.item(0).ingreso);
         console.log("Ingreso Nivel de Riqueza: " + ingreso);
         tx.executeSql("SELECT SUM(saldos_egreso.monto_egresado) AS egresado, saldos_egreso.id_cuenta_in,cta.id_cuenta_in, cta.isActive from saldos_egreso INNER JOIN cta ON saldos_egreso.id_cuenta_in = cta.id_cuenta_in WHERE cta.isActive = 1", [], function(tx,res) {
           egreso = Number(res.rows.item(0).egresado);
           console.log("egreso Nivel de Riqueza: " + egreso);
           patrimonio = ingreso - egreso;
           console.log("PAtrimono Nivel de Riqueza: " + patrimonio);
           tx.executeSql("SELECT AVG(saldos_egreso.monto_egresado) AS promedio, saldos_egreso.id_cuenta_in, cta.id_cuenta_in, cta.isActive from saldos_egreso INNER JOIN cta ON saldos_egreso.id_cuenta_in = cta.id_cuenta_in WHERE cta.isActive = 1 ",[],function (tx,res) {
             promedio = res.rows.item(0).promedio;
             console.log("Promedio de egresos para nivel de riqueza: "+ promedio);
             if (promedio != 0) {
               if((promedio == Number.NaN) || (promedio == null)){nr = "0";}else{nr = patrimonio/promedio;}

               document.getElementById('nivel_riqueza').innerHTML = nr.toFixed(1);
             }else {
               nr = "0";
               document.getElementById('nivel_riqueza').innerHTML = nr;
             }
             console.log(nr);
           });
         });
       });
     });
   }
function date() {
 var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 var today = new Date();
 var mon = Number(today.getMonth());
 console.log("**************************" + month[mon]);
 document.getElementById('month').innerHTML = "Balance of the Month:  " + month[mon];
 document.getElementById('year').innerHTML = "Accumulated Balance Of The Year: " + String(today.getFullYear());
}
