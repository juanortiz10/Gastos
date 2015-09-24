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
        
        
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Ahorros para Invertir" WHERE id_subcategoria_egreso=1');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Alimentos" WHERE id_subcategoria_egreso=2');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Despensa" WHERE id_subcategoria_egreso=3');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Luz" WHERE id_subcategoria_egreso=4');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Agua" WHERE id_subcategoria_egreso=5');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Telefono/Internet" WHERE id_subcategoria_egreso=6');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gas" WHERE id_subcategoria_egreso=7');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Renta" WHERE id_subcategoria_egreso=8');

        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Celular" WHERE id_subcategoria_egreso=9');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Tarjeta de Crédito 1" WHERE id_subcategoria_egreso=10');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Tarjeta de Crédito 2" WHERE id_subcategoria_egreso=11');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Transporte Público" WHERE id_subcategoria_egreso=12');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Mantenimiento Auto" WHERE id_subcategoria_egreso=13'); 
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Refacciones Auto" WHERE id_subcategoria_egreso=14');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Seguro del Auto" WHERE id_subcategoria_egreso=15');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gasolina del Auto" WHERE id_subcategoria_egreso=16');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Colegiaturas" WHERE id_subcategoria_egreso=17');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Libros" WHERE id_subcategoria_egreso=18');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Cursos & Diplomados" WHERE id_subcategoria_egreso=19');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Ropa" WHERE id_subcategoria_egreso=20');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Seguro de Vida" WHERE id_subcategoria_egreso=21');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gastos Médicos" WHERE id_subcategoria_egreso=22');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Articulos de Higiene Personal" WHERE id_subcategoria_egreso=23');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Medicinas" WHERE id_subcategoria_egreso=24');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Fondo de Emergencia" WHERE id_subcategoria_egreso=25');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Electrodomésticos" WHERE id_subcategoria_egreso=26');

        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Cine" WHERE id_subcategoria_egreso=27');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Bar" WHERE id_subcategoria_egreso=28');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Antros" WHERE id_subcategoria_egreso=29');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Espectáculos" WHERE id_subcategoria_egreso=30');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Otras Salidas Sociales" WHERE id_subcategoria_egreso=31');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Antojos de la Tiendita" WHERE id_subcategoria_egreso=32');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Clothes & Luxury Accessories" WHERE id_subcategoria_egreso=33');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Travel Budget" WHERE id_subcategoria_egreso=34');
        tx.executeSql('UPDATE subcategorias_egreso SET nombre_subcategoria_egreso="Gifts and others" WHERE id_subcategoria_egreso=35  ');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Indispensables/Básicos" WHERE id_categoria_egreso=1');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Herramientas Útiles/Secundarios" WHERE id_categoria_egreso=2');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Superfluos/Innecesarios" WHERE id_categoria_egreso=3')
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
       $('#main_table').append('<tr><td class="row" style="border: 2px solid #E37474"><a href="../views/six.html" onclick="sendId('+row['id_subcategoria_egreso']+')">'+row['nombre_subcategoria_egreso']+'</a></td></tr>');
      }
      return true;
    }

        //Agregar categoria, se acciona cuando el usuario da clic sobre la fila de agregar
    function agregarCategoria(){
          var nombre;
          var dba = window.openDatabase("gastos", "1.0", "local database", 200000);

         navigator.notification.prompt(
        'Introduce el nombre de la sub categoria',
        function(results){
            if (results.buttonIndex == 1){
                nombre=results.input1;
                if(nombre==null || nombre.length==0){
                     navigator.notification.alert("Error",function(){window.location.reload();},"No has agregado nada", "Ok");
                 }else{
                dba.transaction(function(tx){
                    tx.executeSql('INSERT INTO subcategorias_egreso(nombre_subcategoria_egreso) VALUES("'+nombre+'") ');
                    window.location.reload();
                }, errorCB, successCB);
              }
            }
        }, 'Sub-Categorias', ['Ok','Cancelar']);
  }

    function sendId(id_categoria){
  		sessionStorage.setItem("id_categoria",id_categoria);
  	}

    function getTitleIngresos(id){
    var dba = window.openDatabase("gastos", "1.0", "local database", 200000);
    dba.transaction(function(tx) {
        tx.executeSql("SELECT nombre_categoria_egreso FROM categorias_egreso where id_categoria_egreso = ? ",[id], function (tx, res) {
      document.getElementById('title').innerHTML = res.rows.item(0).nombre_categoria_egreso;
    },function (error) {
      alert("Error al realizar la petcicion")
    });
  });
}