 document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it
    var results;
    //function will be called when device ready
    function onDeviceReady(){

         db.transaction(function(tx){
          tx.executeSql('SELECT * FROM categorias_ingreso',[],function(tx,result){
          results=result.rows.item(0);
        }, errorCB );
       });

        db.transaction(function populateDB(tx){
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Indispensables/Básicos" WHERE id_categoria_egreso=1');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Herramientas Útiles/Secundarios" WHERE id_categoria_egreso=2');
        tx.executeSql('UPDATE categorias_egreso SET nombre_categoria_egreso="Superflujos/Innecesarios" WHERE id_categoria_egreso=3');


        tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text)');
        tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text)');
        tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer)');
        tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real)')
        
        if(results==null || results==0){
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Sueldo/Salario")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Negocios")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Pensiones")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Rentas")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Prestamos")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Dividendos")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Domingos")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Mesadas")');
        tx.executeSql('INSERT INTO categorias_ingreso (nombre_categoria_ingreso) VALUES("Otros")')
        
        tx.executeSql('INSERT INTO categorias_egreso (nombre_categoria_egreso) VALUES("Indispensables/Básicos")');
        tx.executeSql('INSERT INTO categorias_egreso (nombre_categoria_egreso) VALUES("Herramientas Útiles/Secundarios")');
        tx.executeSql('INSERT INTO categorias_egreso (nombre_categoria_egreso) VALUES("Superflujos/Innecesarios")');

        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Ahorro para Invertir",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Alimentos",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Despensa",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Luz",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Agua",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Telefono/Interne",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Gas",1)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Renta",1)');

        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Celular/Móvil",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Tarjeta de Credito 1",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Tarjeta de Credito 2",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Transportes publicos",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Mantenimiento Auto",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Refacciones Auto",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Seguro del Auto",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Gasolina del Auto",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Colegiaturas",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Libros",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Cursos y Diplomados",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Ropa",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Seguro de Gastos Medicos/Vida",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Gastos Medicos",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Articulos de Higiene Personal",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Medicinas",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Fondo de Emergencia",2)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Eléctrodomesticos",2)');

        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Cine",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Bar",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Antro",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Espectáculos",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Otras Salidas Sociales",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Antojos de Tiendita",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Ropa y Accesorios de lujo",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Fondo para viajes",3)');
        tx.executeSql('INSERT INTO subcategorias_egreso (nombre_subcategoria_egreso,id_categoria_egreso) VALUES("Regalos y detalles para terceros",3)')

      }
       
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Sueldo/Salario" WHERE id_categoria_ingreso=1');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Negocios" WHERE id_categoria_ingreso=2');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Pensiones" WHERE id_categoria_ingreso=3');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Rentas" WHERE id_categoria_ingreso=4');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Prestamos" WHERE id_categoria_ingreso=5');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Dividendos" WHERE id_categoria_ingreso=6');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Domingos" WHERE id_categoria_ingreso=7');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Mesadas" WHERE id_categoria_ingreso=8');
        tx.executeSql('UPDATE categorias_ingreso SET nombre_categoria_ingreso="Otros" WHERE id_categoria_ingreso=9')
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
       $('#main_table').append('<tr><td class="row" style="border-bottom:2pt solid #87E075;"><a href="../views/three.html" onclick="sendId('+row['id_categoria_ingreso']+')">'+row['nombre_categoria_ingreso']+'</a></td></tr>');
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
                    tx.executeSql('INSERT INTO categorias_ingreso(nombre_categoria_ingreso) VALUES("'+nombre+'") ');
                    window.location.reload();
                }, errorCB, successCB);
              }
            }
        }, 'Categorias', ['Ok','Cancelar']);
  }//Termina agregar categoria ingreso

function sendId(id_categoria){
  sessionStorage.setItem("id_categoria",id_categoria);
}
//Ends Juan Ortiz


