document.addEventListener("deviceready", onDeviceReady, false);
   var db = window.openDatabase("gastos", "1.0", "local database", 200000); //will create database Dummy_DB or open it
   var unique=[];
   //function will be called when device ready
   function onDeviceReady(){
       db.transaction(function populateDB(tx){
       tx.executeSql('Create Table IF NOT EXISTS categorias_ingreso(id_categoria_ingreso integer primary key, nombre_categoria_ingreso text )');
       tx.executeSql('Create Table IF NOT EXISTS categorias_egreso(id_categoria_egreso integer primary key, nombre_categoria_egreso text  )');
       tx.executeSql('Create Table IF NOT EXISTS subcategorias_egreso(id_subcategoria_egreso integer primary key, nombre_subcategoria_egreso, id_categoria_egreso)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_ingreso(id_saldo_ingreso integer primary key, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_ingresado real, id_categoria_ingreso integer, id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS saldos_egreso(id_saldo_egreso integer primary key, fecha_egreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, monto_egresado real, id_subcategoria_egreso integer,  id_cuenta_in integer)');
       tx.executeSql('Create Table IF NOT EXISTS cta(id_cuenta_in integer primary key, nombre text, saldo real, isActive integer)');

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
     var hoy = new Date();
     var mm = hoy.getMonth()+1;
     if (mm<10) mm = '0' + mm;
     else mm= String(mm);

      var yy = (hoy.getFullYear()).toString();

       //SELECCIONAR CATEGORIAS INGRESO
        db.transaction(function(tx){
          tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE  saldos_ingreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_ingreso']);
            idCat.push(row['id_categoria_ingreso']);
          }
            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT nombre_categoria_ingreso FROM categorias_ingreso WHERE id_categoria_ingreso= ?',[val],function(tx,result){
                  var row = result.rows.item(0);
                $('#ingresos_categoria').append('<tr><td class="cuentas" style="border: 4px solid #87E075" >'+row['nombre_categoria_ingreso']+'</td></tr>')
                });
             }
          });
        });
       //SELECCIONAR INGRESOS MENSUALES
       db.transaction(function(tx){
        var counter=0;            
          tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE strftime("%m", saldos_ingreso.fecha_ingreso) = ?  AND saldos_ingreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [mm],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_ingreso']);
            idCat.push(row['id_categoria_ingreso']);
          }
            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_ingresado) AS ingreso FROM saldos_ingreso WHERE id_categoria_ingreso= ?',[val],function(tx,result){
                counter+=Number(result.rows.item(0).ingreso);
                $('#ingresos_mensuales').append('<tr><td class="cuentas" style="border: 4px solid #87E075" >'+result.rows.item(0).ingreso+'</td></tr>');
                $('#ineto').html(counter);
                });
             }
          });
    });
      //Seleccionar Ingresos ANUALES
       db.transaction(function(tx){
          var counter=0;
          tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE strftime("%Y", saldos_ingreso.fecha_ingreso) = ? AND saldos_ingreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1) ', [yy],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_ingreso']);
            idCat.push(row['id_categoria_ingreso']);
          }
            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_ingresado) AS ingreso FROM saldos_ingreso WHERE id_categoria_ingreso= ?',[val],function(tx,result){
                counter+=Number(result.rows.item(0).ingreso);
                $('#ingresos_anuales').append('<tr><td class="cuentas" style="border: 4px solid #87E075" >'+result.rows.item(0).ingreso+'</td></tr>');
                $('#inetoa').html(counter)
                });
             }
          });
       });

      //Acumulado ingreso
       db.transaction(function(tx){
          var counter=0;
          tx.executeSql('SELECT * FROM categorias_ingreso INNER JOIN saldos_ingreso ON categorias_ingreso.id_categoria_ingreso=saldos_ingreso.id_categoria_ingreso WHERE saldos_ingreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [],function(tx,result){
            var idSaldos=[], idCat=[];
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              idSaldos.push(row['id_saldo_ingreso']);
              idCat.push(row['id_categoria_ingreso']);
            }

            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_ingresado) AS ingreso FROM saldos_ingreso WHERE id_categoria_ingreso= ?',[val],function(tx,result){
                counter+=Number(result.rows.item(0).ingreso);
                $('#ingresos_acum').append('<tr><td class="cuentas" style="border: 4px solid #87E075" >'+result.rows.item(0).ingreso+'</td></tr>');
                $('#inetoac').html(counter)
                });
            }
          });
       });

       db.transaction(function(tx){
          tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE  saldos_egreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_egreso']);
            idCat.push(row['id_subcategoria_egreso']);
          }
            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});            
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT nombre_subcategoria_egreso FROM subcategorias_egreso WHERE id_subcategoria_egreso= ?',[val],function(tx,result){
                  console.log(result.rows.length);
                  var row = result.rows.item(0);
                $('#egresos_categoria').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+row['nombre_subcategoria_egreso']+'</td></tr>')
                });
             }
          });
       });

       //Seleccionar EGRESOS MENSUALES
       db.transaction(function(tx) {
        var counter=0;
         tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE strftime("%m", saldos_egreso.fecha_egreso) = ? AND saldos_egreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [mm],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_egreso']);
            idCat.push(row['id_subcategoria_egreso']);
          }

            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_egresado) AS egreso FROM saldos_egreso WHERE id_subcategoria_egreso= ?',[val],function(tx,result){
                counter+=Number(result.rows.item(0).egreso);
                $('#egresos_mensuales').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+result.rows.item(0).egreso+'</td></tr>');
                $('#enetome').html(counter)
                });
             }
          });
      });

      //Seleccionr EGRESOS ANUALES
      db.transaction(function(tx){
        var counter=0;
        tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE strftime("%Y", saldos_egreso.fecha_egreso) = ?  AND saldos_egreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1)', [yy],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_egreso']);
            idCat.push(row['id_subcategoria_egreso']);
          }

            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_egresado) AS egreso FROM saldos_egreso WHERE id_subcategoria_egreso= ?',[val],function(tx,result){
                counter+=result.rows.item(0).egreso;
                $('#egresos_anuales').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+result.rows.item(0).egreso+'</td></tr>');
                $('#enetoan').html(counter);
                });
          }
        });
      });
      //Acumulado EGRESOS
      db.transaction(function(tx){
        var counter=0;
         tx.executeSql('SELECT * FROM subcategorias_egreso INNER JOIN saldos_egreso ON subcategorias_egreso.id_subcategoria_egreso=saldos_egreso.id_subcategoria_egreso WHERE saldos_egreso.id_cuenta_in = (SELECT id_cuenta_in FROM cta WHERE isActive=1) ', [],function(tx,result){
          var idSaldos=[], idCat=[];
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            idSaldos.push(row['id_saldo_egreso']);
            idCat.push(row['id_subcategoria_egreso']);
          }

            var uni = idCat.filter(function(elem, index, self) {return index == self.indexOf(elem);});
            for(var a=0; a<uni.length; a++){
                var val=uni[a];
                tx.executeSql('SELECT SUM(monto_egresado) AS egreso FROM saldos_egreso WHERE id_subcategoria_egreso= ?',[val],function(tx,result){
                counter+=result.rows.item(0).egreso;
                $('#egresos_acum').append('<tr><td class="cuentas" style="border: 4px solid #E37474" >'+result.rows.item(0).egreso+'</td></tr>');
                $('#enetoac').html(counter);
                });
          }
         });
      });
   }