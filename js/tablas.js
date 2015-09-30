document.addEventListener("deviceready", onDeviceReady, false);
   var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

   //function will be called when device ready
   function onDeviceReady(){

       db.transaction(function populateDB(tx){
       tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
       tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
       tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');

       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Balance" WHERE id_categoria_ingreso=1');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Business" WHERE id_categoria_ingreso=2');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Pensions" WHERE id_categoria_ingreso=3');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Income" WHERE id_categoria_ingreso=4');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Loans" WHERE id_categoria_ingreso=5');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Dividends" WHERE id_categoria_ingreso=6');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Allowance" WHERE id_categoria_ingreso=7');
       tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Others" WHERE id_categoria_ingreso=8')

         }, errorCB, successCB);
   }

   function errorCB(err) {
          console.log("Error processing SQL: "+err.message);
   }

   //function will be called when process succeed
   function successCB() {
       console.log("success!");
       db.transaction(queryDB,errorCB);
   }
