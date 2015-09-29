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
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');
        
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Savings to Invest" WHERE id_subcategoria_egreso=1');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Food" WHERE id_subcategoria_egreso=2');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Pantry" WHERE id_subcategoria_egreso=3');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Electric Light" WHERE id_subcategoria_egreso=4');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Water" WHERE id_subcategoria_egreso=5');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Phone/Internet" WHERE id_subcategoria_egreso=6');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gas" WHERE id_subcategoria_egreso=7');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Rent" WHERE id_subcategoria_egreso=8');

        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Cellphone" WHERE id_subcategoria_egreso=9');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Credit Card 1" WHERE id_subcategoria_egreso=10');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Credit Card 2" WHERE id_subcategoria_egreso=11');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Public Transportation" WHERE id_subcategoria_egreso=12');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Car Maintenance" WHERE id_subcategoria_egreso=13'); 
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Spare Parts" WHERE id_subcategoria_egreso=14');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Car Insurance" WHERE id_subcategoria_egreso=15');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Car Gasoline" WHERE id_subcategoria_egreso=16');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="School Fees" WHERE id_subcategoria_egreso=17');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Books" WHERE id_subcategoria_egreso=18');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Courses & Certifieds" WHERE id_subcategoria_egreso=19');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Clothes" WHERE id_subcategoria_egreso=20');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Life Assurance" WHERE id_subcategoria_egreso=21');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Medical Expenses" WHERE id_subcategoria_egreso=22');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Personal Hygiene Articles" WHERE id_subcategoria_egreso=23');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Medicines" WHERE id_subcategoria_egreso=24');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Emergency Budget" WHERE id_subcategoria_egreso=25');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Appliances" WHERE id_subcategoria_egreso=26');

        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Cinema" WHERE id_subcategoria_egreso=27');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Bar" WHERE id_subcategoria_egreso=28');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Night Clubs" WHERE id_subcategoria_egreso=29');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Entertainment" WHERE id_subcategoria_egreso=30');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Other" WHERE id_subcategoria_egreso=31');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Grosery Store Whims" WHERE id_subcategoria_egreso=32');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Clothes & Luxury Accessories" WHERE id_subcategoria_egreso=33');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Travel Budget" WHERE id_subcategoria_egreso=34');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gifts and others" WHERE id_subcategoria_egreso=35  ')

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
        tx.executeSql('SELECT * FROM subcategorias_egreso WHERE id_categoria_egreso= ?',[Number(sessionStorage.getItem('id_categoria'))],querySuccess,errorCB);
    }

     function querySuccess(tx,result){
      for (var i = 0; i < result.rows.length; i++) {
        var row = result.rows.item(i);
       $('#main_table').append('<tr><td class="row" style="border: 2px solid #E37474"><a href="../views/six-en.html" onclick="sendId('+row['id_subcategoria_egreso']+')">'+row['nombre_subcategoria_egreso']+'</a></td></tr>');
      }
      return true;
    }

    //Agregar categoria, se acciona cuando el usuario da clic sobre la fila de agregar
    function agregarCategoria(){
          var nombre;
          var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

         navigator.notification.prompt(
        'Type the name of the sub category',
        function(results){
            if (results.buttonIndex == 1){
                nombre=results.input1;
                if(nombre==null || nombre.length==0){
                     navigator.notification.alert("Error",function(){window.location.reload();},"Wrong Entry", "Ok");
                 }else{
                dba.transaction(function(tx){
                    tx.executeSql('INSERT INTO subcategorias_egreso(nombre_subcategoria_egreso) VALUES("'+nombre+'") ');
                    window.location.reload();
                }, errorCB, successCB);
              }
            }
        }, 'Categorias', ['Ok','Cancelar']);
  }
    function sendId(id_categoria){
      sessionStorage.setItem("id_categoria",id_categoria);
    }
