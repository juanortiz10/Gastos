document.addEventListener("deviceready", onDeviceReady, false);
   var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it
   //function will be called when device ready
   function onDeviceReady(){
       db.transaction(populateDB, errorCB, successCB);
   }

   function populateDB(tx) {
       tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
       tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text )');
       tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer, id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer,  id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');
   }

   function errorCB(err) {
       console.log("Error processing SQL: "+err.message);
   }

       //function will be called when process succeed
   function successCB() {
       console.log("correct");
   }
   function redirect(){
        window.location.reload();
   }

function agregarCuenta(){
  var name=document.getElementById('nombre_cuenta').value;
  db.transaction(function(tx){
    tx.executeSql('INSERT INTO cta (nombre,saldo) VALUES (?,?)',[name,0],redirect);
  });
}

function edit(){
  var nuevo_nombre = document.getElementById('et').value;
  db.transaction(function(tx){
    tx.executeSql('UPDATE cta set nombre = ? WHERE isActive= 1',[nuevo_nombre],redirect, errorCB);
  });
}

function delet3(){
  db.transaction(function(tx){
    tx.executeSql('DELETE FROM cta  WHERE isActive= 1 AND (SELECT COUNT(*) FROM cta) > 1',[], redirect, errorCB);
    selectCta();
  });
}

function loadName(){
  db.transaction(function(tx){
    tx.executeSql('SELECT nombre as nom FROM cta WHERE isActive=1',[],function(tx,result){
      document.getElementById("et").value=result.rows.item(0).nom;
    });
  });
}
function fillSelect(){
  db.transaction(function(tx){
    tx.executeSql('SELECT * FROM cta',[],function(tx,result){
      for(var i=0; i<result.rows.length; i++){
            var row = result.rows.item(i);
            $('#select_cta').append('<option value="'+row['id_cuenta_in']+'">'+row['nombre']+'</option>');
      }

    });
  tx.executeSql('SELECT * FROM cta where isActive = 1',[],function(tx,result){
		document.getElementById("select_cta").value = result.rows.item(0).id_cuenta_in;
    });
    tx.executeSql('SELECT * FROM cta where isActive = 1',[],function(tx,result){
        document.getElementById("select_cta").value = result.rows.item(0).id_cuenta_in;
  });
  });
}

function selectCta(){
	var cta = document.getElementById("select_cta").value;
	 db.transaction(function(tx){
		tx.executeSql('UPDATE cta SET isActive = 0',[], successCB, errorCB);
		tx.executeSql('UPDATE cta SET isActive = 1 where id_cuenta_in = ?',[cta], redirect, errorCB);
  });
}

function setEnabled(){
  console.log(0);
  document.getElementById('et').disabled=false;
}
