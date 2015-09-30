 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(function populateDB(tx){
        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text  )');
        tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer, id_cta_in integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer, id_cta_in integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');

        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Indispensables/Básicos" WHERE id_categoria_egreso=1');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Herramientas Útiles/Secundarios" WHERE id_categoria_egreso=2');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Superfluos/Innecesarios" WHERE id_categoria_egreso=3');

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
    function queryDB(tx){
        tx.executeSql('SELECT * FROM categorias_egreso',[],querySuccess,errorCB);
    }

    function querySuccess(tx,result){
      for (var i = 0; i < result.rows.length; i++) {
        var row = result.rows.item(i);
       $('#main_table').append('<tr><td class="row" style="border: 2px solid #E37474"><a href="../views/five_sub.html" onclick="sendId('+row['id_categoria_egreso']+')">'+row['nombre_categoria_egreso']+'</a></td></tr>');
      }
    }

    //Agregar categoria, se acciona cuando el usuario da clic sobre la fila de agregar
    function agregarCategoria(){
          var nombre;
          var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

         navigator.notification.prompt(
        'Introduce el nombre de la categoria',
        function(results){
            if (results.buttonIndex == 1){
                nombre=results.input1;
                if(nombre==null || nombre.length==0){
                     navigator.notification.alert("Error",function(){window.location.reload();},"No has agregado nada", "Ok");
                 }else{
                dba.transaction(function(tx){
                    tx.executeSql('INSERT INTO categorias_egreso(nombre_categoria_egreso) VALUES("'+nombre+'") ');
                    window.location.reload();
                }, errorCB, successCB);
              }
            }
        }, 'Categorias', ['Ok','Cancelar']);
  }//Termina agregar categoria ingreso

  function sendId(id_categoria){
  sessionStorage.setItem("id_categoria",id_categoria);
  }
