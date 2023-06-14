

$(document).ready(function() {
    $("#verEstudiantesBoton").click(function(event) {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:9000/estudiantes", // Replace with your API endpoint
            type: "GET",
            dataType: "json",
            success: function(response) {
                // Handle the response
                data = response.data

                $("#lista_estudiantes").empty();

                alert("Mostrando los estudiantes!");

                $.each(data, function(index, item) {
                    var output = `
                        <div class="cliente">
                            <p>${item.nombre}</p>
                            <p>${item.password}</p>
                            <p>${item.unidad_academica}</p>
                        </div>
                    `;

                    $("#lista_estudiantes").append(output);
                });
                console.log(response);
            },
            error: function(xhr, status, error) {
                // Handle the error
                console.error(error);
            }
        });
    });

    $("#crearClienteBoton").click(function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;
        const unidad_academica = document.getElementById('unidad_academica').value;
      
        const data = {
          nombre: nombre,
          password: password,
          unidad_academica: unidad_academica
        };
      
        // Make the AJAX request to your API endpoint
        fetch('http://localhost:9000/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          
        })
          .then(response => response.json())
          .then(result => {
            alert(`Estudiante creado. Bienvenido ${nombre} !`);
            console.log(result.message)
            // Do something with the response from the API
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });

});

