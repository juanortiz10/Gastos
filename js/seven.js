document.addEventListener("deviceready", onDeviceReady, false);
   var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

   //function will be called when device ready
   function onDeviceReady(){
       db.transaction(function populateDB(tx){
       tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
       tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text  )');
       tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)');

         }, errorCB, successCB);
   }

   function errorCB(err) {
       console.log("Error processing SQL: "+err.code);
   }

   //function will be called when process succeed
   function successCB() {
       console.log("success!");
       db.transaction(queryDB,errorCB);
   }

   function queryDB(tx){
     var hoy = new Date();
     var mm = hoy.getMonth()+1;
     if (mm<10) mm = '0' + mm;
    var yy = (hoy.getFullYear()).toString();
       tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso', [],ingresosCategoria,errorCB);
       tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE strftime("%m", saldos_ingreso.fecha_ingreso) = ? ', [mm],ingresosMensual,errorCB);
       tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE strftime("%Y", saldos_ingreso.fecha_ingreso) = ? ', [yy],ingresosAnual,errorCB);
       tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE strftime("%Y", saldos_ingreso.fecha_ingreso) = ? ', [yy],ingresosAcumulado,errorCB);
       tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso', [],egresosCategoria,errorCB);
       tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE strftime("%m", saldos_egreso.fecha_egreso) = ? ', [mm],egresosMensual,errorCB);
       tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE strftime("%Y", saldos_egreso.fecha_egreso) = ? ', [yy],egresosAnual,errorCB);
       tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE strftime("%Y", saldos_egreso.fecha_egreso) = ? ', [yy],egresosAcumulado,errorCB);
    
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)');
   }

//Inician metodos para ingresos
   function ingresosCategoria(tx,result){
     for (var i = 0; i < result.rows.length; i++) {
       var row = result.rows.item(i);
      $('#ingresos_categoria').append('<tr><td class="cuentas" style="border: 2px solid #87E075">'+row['nombre_categoria_ingreso']+'</td></tr>');
     }
   }
   function ingresosMensual(tx,result){
     for (var i = 0; i < result.rows.length; i++) {
       var row = result.rows.item(i);
      $('#ingresos_mensuales').append('<tr><td class="cuentas" style="border: 2px solid #87E075">'+row['monto_ingresado']+'</td></tr>');
     }
   }

   function ingresosAnual(tx,result){
     for (var i = 0; i < result.rows.length; i++) {
       var row = result.rows.item(i);
      $('#ingresos_anuales').append('<tr><td class="cuentas" style="border: 2px solid #87E075">'+row['monto_ingresado']+'</td></tr>');
     }
   }

   function ingresosAcumulado(tx,result){
    for(var i = 0; i < result.rows.length; i++){
      var row = result.rows.item(i);
      $('#ingresos_acum').append('<tr><td class="cuentas" style="border: 4px solid #87E075" >'+row['monto_ingresado']+'</td></tr>');
    }
   }

//Inician metodos para egresos
function egresosCategoria(tx,result){
  for (var i = 0; i < result.rows.length; i++) {
    var row = result.rows.item(i);
   $('#egresos_categoria').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+row['nombre_subcategoria_egreso']+'</td></tr>');
  }
}
function egresosMensual(tx,result){
  for (var i = 0; i < result.rows.length; i++) {
    var row = result.rows.item(i);
   $('#egresos_mensuales').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+row['monto_egresado']+'</td></tr>');
  }
}

function egresosAnual(tx,result){
  for (var i = 0; i < result.rows.length; i++) {
    var row = result.rows.item(i);
   $('#egresos_anuales').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+row['monto_egresado']+'</td></tr>');
  }
}

function egresosAcumulado(tx,result){
    for(var i = 0; i < result.rows.length; i++){
      var row = result.rows.item(i);
      $('#egresos_acum').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+row['monto_egresado']+'</td></tr>');
    }
}
