(function(){
   'use strict';
    var product_id;
    
    
    window.onload = function jsonStorage() {
        //Show shaved data from json
        try {
        var arrayText = sessionStorage.getItem("arrayJSON");
        var obj = JSON.parse(arrayText);
        } catch (exception) {}

        var arrayLength = obj.length;
        var table1 = document.getElementById('products');
        var rowLenght = table1.rows.length;


        for (var i = 1; i < arrayLength; i++) {
            var cellId = 'cell1'+ i;
            var row = table1.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.id = 'cell1'+i;
            cell2.id = 'cell2'+i;
            row.id = 'row'+i;
            row.title="Κάνε κλικ στο προϊόν για επεξεργασία."

            var productName = document.createTextNode(obj[i][0]);
            var productPrice = document.createTextNode(obj[i][1]);
            cell1.appendChild(productName); 
            cell2.appendChild(productPrice);
            cell1.addEventListener('click', handleEvent);
        }
    }
    
    //add a new product
    document.getElementById('newProduct').addEventListener('click', function () {
        document.getElementById('newProductModal').style.display = "block";
    });
    
    document.getElementById('ok').addEventListener('click', function () {
        
        var x = document.getElementById("insert").value;   
        var table = document.getElementById('products');
        var rowLenght = table.rows.length;
        var row = table.insertRow(rowLenght);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        cell1.id = 'cell1'+rowLenght;
        cell2.id = 'cell2'+rowLenght;
        row.id = 'row'+rowLenght;
        
        var text = document.createTextNode(x);
        cell1.appendChild(text); 
        cell1.addEventListener('click', handleEvent); 
        
        document.getElementById('newProductModal').style.display="none";
        document.getElementById("insert").value = "";
                
        //write into json
        var array = new Array(rowLenght);
        for (var i = 0; i < rowLenght; i++) {
          array[i] = new Array(2);
        }
        for (var i = 1; i < rowLenght; i++) {
            array[i][0] = table.rows[i].cells[0].textContent;
            array[i][1] = table.rows[i].cells[1].textContent;
        }

        try {
            var arrayJSON = JSON.stringify(array);
            sessionStorage.setItem("arrayJSON", arrayJSON);   }
        catch (exception) {}
        
        
    });
    
    document.getElementById('cancel').addEventListener('click', function () {
        document.getElementById('newProductModal').style.display="none";
        document.getElementById("insert").value = "";       
    });
    
    //when you click on a product
    function handleEvent(e) {
        
        document.getElementById('currentProductModal').style.display = "block";
        
        product_id = e.currentTarget.id;
    }
    
    //insert price
    document.getElementById('insertPrice').addEventListener('click', function (){
        document.getElementById('insertPriceModal').style.display = "block";
    });

    document.getElementById('ok_price').addEventListener('click', function () {
        var x = document.getElementById("price").value;     
        
          if (isNaN(x)) 
          {
            alert("Παρακαλώ εισάγετε έναν έγκυρο αριθμό!");
            return false;
          } else {
        
        var text = document.createTextNode(x);

        var el = document.getElementById(product_id);
        var nextCell = el.nextElementSibling; 

        nextCell.innerHTML = text.textContent;
              
       //write into json
        var table = document.getElementById('products');
        var rowLenght = table.rows.length;    
        var array = new Array(rowLenght);
        for (var i = 0; i < rowLenght; i++) {
          array[i] = new Array(2);
        }
        for (var i = 1; i < rowLenght; i++) {
            array[i][0] = table.rows[i].cells[0].textContent;
            array[i][1] = table.rows[i].cells[1].textContent;
        }
        try{
            var arrayJSON = JSON.stringify(array);
            sessionStorage.setItem("arrayJSON", arrayJSON);
        }catch (exception) {}

        document.getElementById('insertPriceModal').style.display="none";
        document.getElementById('currentProductModal').style.display="none";
        document.getElementById("price").value = "";}
        
    });


    document.getElementById('cancel_price').addEventListener('click', function () {
        document.getElementById('insertPriceModal').style.display="none";
        document.getElementById("price").value = "";       
    });

    //edit product name
    document.getElementById('edit').addEventListener('click', function (){
        document.getElementById('editProductModal').style.display = "block";
        var row = document.getElementById(product_id);
        document.getElementById("edit_area").value = row.innerHTML;
    });

    document.getElementById('ok_edit').addEventListener('click', function () {
        var x = document.getElementById("edit_area").value;             
        var text = document.createTextNode(x);
        var el = document.getElementById(product_id);
        
        el.innerHTML = text.textContent;
        
       //write into json
        var table = document.getElementById('products');
        var rowLenght = table.rows.length; 
        var array = new Array(rowLenght);
        for (var i = 0; i < rowLenght; i++) {
          array[i] = new Array(2);
        }
        for (var i = 1; i < rowLenght; i++) {
            array[i][0] = table.rows[i].cells[0].textContent;
            array[i][1] = table.rows[i].cells[1].textContent;
        }
        try{
        var arrayJSON = JSON.stringify(array);
        sessionStorage.setItem("arrayJSON", arrayJSON);
        }catch (exception) {}

        document.getElementById('editProductModal').style.display="none";
        document.getElementById('currentProductModal').style.display="none";
        document.getElementById("edit_area").value = "";
    });

    document.getElementById('cancel_edit').addEventListener('click', function () {
        document.getElementById('editProductModal').style.display="none";
    });

    //delete product
    document.getElementById('delete').addEventListener('click', function (){
        var el = document.getElementById(product_id);       
        var nextCell = el.nextElementSibling; 
        var rowId = product_id.slice(5,10);
        var row = document.getElementById('row'+rowId);  
        
        el.parentNode.removeChild(el);
        nextCell.parentNode.removeChild(nextCell);
        row.parentNode.removeChild(row);



        document.getElementById('currentProductModal').style.display="none";
    });

    //cancel
    document.getElementById('cancel_product').addEventListener('click', function (){        
       document.getElementById('currentProductModal').style.display="none";
    });
    
    
    //delete all products from list
    document.getElementById('clearList').addEventListener('click', function (){
        var table = document.getElementById('products');
        var rowLenght = table.rows.length;
        document.getElementById('resultNumber').innerHTML = "";


        
        for (var i = 1; i < rowLenght; i++) {
            var cellId = 'cell1'+ i;
            var rowId = 'row' + i;
            var el = document.getElementById(cellId);   
            var row = document.getElementById(rowId);  
            var nextCell = el.nextElementSibling; 

            el.parentNode.removeChild(el);
            nextCell.parentNode.removeChild(nextCell);
            row.parentNode.removeChild(row);
        }
        try {
            var arrayJSON = JSON.stringify("");
            sessionStorage.setItem("arrayJSON", arrayJSON);
        }catch (exception) {}
    });
    
    //calculate the sum of the prices
    document.getElementById('calculateList').addEventListener('click', function (){
        var table = document.getElementById('products');
        var rowLenght = table.rows.length;     
        var sum = 0;
        
        for (var i = 1; i < rowLenght; i++) {
            var cellId = 'cell2'+ i;
            var price = document.getElementById(cellId).textContent;   
            var number = parseFloat(price);
            sum += number;
        }
        
        var finalSum = sum.toString() + "€";
        if (isNaN(sum.toString()))
          {
            alert("Παρακαλώ εισάγετε τιμές σε όλα τα προϊόντα!");
            return false;
          } else {
        document.getElementById('resultNumber').innerHTML = finalSum;
          }

    });

})();