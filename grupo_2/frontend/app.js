

$(document).ready(function() {
    $("#verEstudiantesBoton").click(function(event) {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:9000/completos", // Replace with your API endpoint
            type: "POST",
            dataType: "json",
            success: function(response) {
                // Handle the response
                data = response.data

                $("#lista_estudiantes").empty();

                $.each(data, function(index, item) {
                    var output = `
                        <div class="cliente">
                            <p>${item.ingrediente}</p>
                            <p>${item.password}</p>
                            <p>${item.unidad_academica}</p>
                        </div>
                    `;

                    $("completos").append(output);
                });
                console.log(response);
            },
            error: function(xhr, status, error) {
                // Handle the error
                console.error(error);
                alert("Mostrando los estudiantes!");
            }
        });
    });

    $("#crearClienteBoton").click(function() {
        
        const nombre = document.getElementById('nombre');
        const unidad_academica = document.getElementById('unidad_academica');
      
        const data = {
          nombre: nombre,
          password: password,
          unidad_academica: unidad_academica;
        };
      
        // Make the AJAX request to your API endpoint
        fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nombre),
          
        })
          .then(response => response.json())
          .then(result => {
            alert("ERROR");
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });

});

