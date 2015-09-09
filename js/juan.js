 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(function populateDB(tx){
        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text)');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_categoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)')
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
        tx.executeSql('SELECT * FROM categorias_ingreso',[],querySuccess,errorCB);
    }

    function querySuccess(tx,result){

    /*  $('#list').empty();
  $.each(result.rows,function(index){
      var row = result.rows.item(50);
      $('#list').append('<li><a href="#"><h3 class="ui-li-heading">'+row['nombre_categoria_ingreso']+'</h3><p class="ui-li-desc">Id '+row['id_categoria_ingreso']+'</p></a></li>');
  });
  $('#list').listview();*/

         $.each(result.rows,function(index){
           var row = result.rows.item(1);
          $('#main_table').append('<tr><td class="row"><a href="../views/three.html" onclick="sendId('+row['id_categoria_ingreso']+')">'+row['nombre_categoria_ingreso']+'</a></td></tr>');
        });
    }
    
    //Agregar categoria, se acciona cuando el usuario da clic sobre la fila de agregar
    function agregarCategoria(){
          var nombre;
          var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

         navigator.notification.prompt(
        'Introduce el nombre de la categoria',
        function(results){
            nombre=results.input1;
            dba.transaction(function(tx){
                tx.executeSql('INSERT INTO categorias_ingreso(nombre_categoria_ingreso) VALUES("'+nombre+'") ');
                window.location.reload();
            }, errorCB, successCB);
        }, 'Categorias', ['Ok','Cancelar']);
}//Termina agregar categoria ingreso

function sendId(id_categoria){
  sessionStorage.setItem("id_categoria",id_categoria);
}
//Ends Juan Ortiz
