 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it

    //function will be called when device ready
    function onDeviceReady(){

        db.transaction(function populateDB(tx){
        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
     tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');

        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Wage/Salary" WHERE id_categoria_ingreso=1');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Business" WHERE id_categoria_ingreso=2');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Pensions" WHERE id_categoria_ingreso=3');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Rent" WHERE id_categoria_ingreso=4');
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

    function queryDB(tx){
        tx.executeSql('SELECT * FROM categorias_ingreso',[],querySuccess,errorCB);
    }

    function querySuccess(tx,result){
      for (var i = 0; i < result.rows.length; i++) {
        var row = result.rows.item(i);
       $('#main_table').append('<tr><td class="row" style="border-bottom:2pt solid #87E075;"><a href="../views/three-en.html" onclick="sendId('+row['id_categoria_ingreso']+')">'+row['nombre_categoria_ingreso']+'</a></td></tr>');
      }
    }

    //Agregar categoria, se acciona cuando el usuario da clic sobre la fila de agregar
    function agregarCategoria(){
          var nombre;
          var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

         navigator.notification.prompt(
        'Type the category name',
        function(results){
            if (results.buttonIndex == 1){
                nombre=results.input1;
                if(nombre==null || nombre.length==0){
                     navigator.notification.alert("Error",function(){window.location.reload();},"Error,Empty Field", "Ok");
                 }else{
                dba.transaction(function(tx){
                    tx.executeSql('INSERT INTO categorias_ingreso(nombre_categoria_ingreso) VALUES("'+nombre+'") ');
                    window.location.reload();
                }, errorCB, successCB);
              }
            }
        }, 'Categories', ['Ok','Cancel']);
  }//Termina agregar categoria ingreso

function sendId(id_categoria){
  sessionStorage.setItem("id_categoria",id_categoria);
}
//Ends Juan Ortiz
