// SE INICIALIZA JQUERY EN EL DOCUMENTO
$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        //Se almacena el valor ingresado por le usuario en una variable
        let valueInput = $("#heroInput").val();
        console.log(valueInput);

        // Se envía una ALERTA cuando el número esta FUERA DE RANGO
        // En el HTML se declara el input de type="number"
        if (valueInput > 731 || valueInput < 1) {
            alert("Hay 731 héores registrados.\nPor favor ingrese un número entre 1 y 731")
        }


        // CONSULTA AJAX
        // Utilizamos el METODO GET para obetener los recursos de la API.
        // Especificamos la ruta PATH donde se realiza la peticíon.
        $.ajax({
            type: "GET",
            url:
                "https://www.superheroapi.com/api.php/2496364390592143/" + valueInput,
            data: "data",
            dataType: "json",
            success: function (data) {
                console.log(data);

                // La informacion obtenida se almacena en variables.
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let publisher = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primerAparicion = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;

                $("#heroInfo").html(`
                <h3 class="container text-center">SuperHero Encontrado</h3> 
                <div class="card  col-md-4">
                    <img src="${imagen}">
                </div>
                <div class="card col-md-8 p-3">
                    <h5>Nombre: ${nombre}</h5>
                    <p>Conexiones: ${conexiones}</p>
                    <ul>
                        <p><i>Publicado por: </i>${publisher}
                            <hr>
                        </p>
                        <p><i>Ocupación: </i>${ocupacion}
                            <hr>
                        </p>
                        <p><i>Primera Aparición: </i>${primerAparicion}
                            <hr>
                        </p>
                        <p><i>Altura: </i>${altura}
                            <hr>
                        </p>
                        <p><i>Peso: </i>${peso}
                            <hr>
                        </p>
                        <p><i>Alianzas: </i>${alianzas}</p>
                    </ul>
                </div>                
                `);

                /* ***************************************************************************
                // EL CÓDIGO COMENTADO SE OPTIMIZÓ,
                // SE DEJA COMENTADO Y NO SE BORRÓ PARA VER LAS DIFERENTES FORMAS DE RALIZAR LO QUE SE PIDE
                
                // VALORES QUR SE UTILIZARÁN LA DATA DEL GRÁFICO

                // Se crea un ARREGLO con el NOMBRE de las PROPIEDADES del Objeto
                let powerstatsKeys = Object.keys(data.powerstats);
                console.log(powerstatsKeys);

                // Se crea un ARREGLO con el VALOR de las PROPIEDADES.
                let powerstatsValues = Object.values(data.powerstats);
                console.log(powerstatsValues); 
                 ***************************************************************************** */


                // CÓDIGO OPTIMIZADO 
                //(es un poco mas complicado entenderlo, pero si nos encontramos con un objeto que posea muchos elementos ahorraremos tiempo y código)

                // Se crea un ARREGLO con los ATRIBUTOS y VALORES del OBJETO 
                // Un arreglo para cada ELEMENTO del OBJETO powerstats
                // Se utiliza el MÉTODO Object.entries para esto.
                let powerStatsEntries = Object.entries(data.powerstats)
                console.log(powerStatsEntries);

                let estadisticas = [];

                // Con FOREACH ejecutamos la función para cada elemento del ARRAY creado almacenado en la VARIABLE powerStatsEntries.
                // Insertamos los valores a través del MÉTODO PUSH,
                // a cada OBJETO almacenado en el ARRAY de la VARIABLE estadistica.
                // Lo que esto hace es que:
                // 1.- Todos los elementos que esten en la POSICIÓN [0] de los array queden en LABEL
                // 2.- Los elementos de la POSICIÓN [1] quedan en Y.
                // ESTOS SON LOS VALORES QUE SE UTILIZARAN PARA CREAR EL GRÁFICO
                powerStatsEntries.forEach(function (p) {
                    estadisticas.push({
                        label: p[0],
                        y: p[1],
                    });
                });
                console.log(estadisticas);


                // El NOMBRE y VALOR de estos ATRIBUTOS se utilizarán para crean el GRÁFICO
                var chart = new CanvasJS.Chart("heroStats", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadistias de poder para ${nombre}`,
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: estadisticas

                            /* *********************************************************
                            //DODIGO ANTIGUO QUE FUE OPTIMIZADO
                            [
                                { y: powerstatsValues[0], label: powerstatsKeys[0] },
                                { y: powerstatsValues[1], label: powerstatsKeys[1] },
                                { y: powerstatsValues[2], label: powerstatsKeys[2] },
                                { y: powerstatsValues[3], label: powerstatsKeys[3] },
                                { y: powerstatsValues[4], label: powerstatsKeys[4] },
                                { y: powerstatsValues[5], label: powerstatsKeys[5] },
                            ],
                            ************************************************************ */
                        },
                    ],
                });
                chart.render();
            },
            error: function () {
                alert("ERROR")
            }
        });
    });
});
