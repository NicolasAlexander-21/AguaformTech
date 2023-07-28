// Crear los arrays para los labels (nombres de los sensores) y los datos de los sensores
const labels = [];
const valores = [];
let nivelesAceptables = [7, 50, 60, 30];
const maxPoints = 10; // Número máximo de puntos que se mostrarán en el gráfico
let datos_reales = []; //datos capturados del sensor
let labels_nombre = [];
let promedios = [];
let promedio_resultado = 0;
let suma = 0;
let contador = 0;
let contador_dato = 0;
let chart_estadistica = null;
let fechaPredefinida = "";
let cantidad_sensores = 4; // para controlar las horas con sensores existentes
const mesCapturadoElement = document.getElementById("mesCapturado");

const canvas = document.getElementById("graficoTiempoReal");
const chart = new Chart(canvas, {
  type: "line",
  data: {
    labels: [], // Etiquetas en el eje x
    datasets: [
      {
        label: "Sensor de Humedad de Agua",
        data: [], // Datos en el eje y para la primera línea
        backgroundColor: "rgba(0, 123, 255, 0.4)", // Color de fondo para la primera línea
        borderColor: "rgba(0, 123, 255, 1)", // Color del borde para la primera línea
        borderWidth: 1, // Ancho del borde para la primera línea
      },
      {
        label: "Sensor de Humedad de Aire",
        data: [], // Datos en el eje y para la segunda línea
        backgroundColor: "rgba(255, 0, 0, 0.4)", // Color de fondo para la segunda línea
        borderColor: "rgba(255, 0, 0, 1)", // Color del borde para la segunda línea
        borderWidth: 1, // Ancho del borde para la segunda línea
      },
      {
        label: "Sensor de pH",
        data: [], // Datos en el eje y para la primera línea
        backgroundColor: "rgba(0, 255, 0, 0.4)", // Color de fondo para la tercera línea
        borderColor: "rgba(0, 255, 0, 1)", // Color del borde para la tercera línea
        borderWidth: 1, // Ancho del borde para la primera línea
      },
      {
        label: "Sensor de Calidad de Aire ",
        data: [], // Datos en el eje y para la segunda línea
        backgroundColor: "rgba(255, 255, 0, 0.4)", // Color de fondo para la cuarta línea
        borderColor: "rgba(255, 255, 0, 1)", // Color del borde para la cuarta línea
        borderWidth: 1, // Ancho del borde para la segunda línea
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        duration: 10000, // Duración en milisegundos que se mostrarán en el gráfico
        refresh: 1000, // Intervalo de actualización en milisegundos
        delay: 2000, // Retardo inicial en milisegundos
      },
      y: {
        beginAtZero: true, // Inicia el eje y en cero
      },
    },
    plugins: {
      legend: {
        display: false, // Oculta la leyenda del gráfico
      },
    },
  },
});

// Cargar el archivo JSON de los datos en tiempo real
function TablaSensores() {
  fetch("https://agromatica.onrender.com")
    .then((response) => response.json())
    .then((data) => {
      const valores = {}; //Objeto para almacenar los valores
      const tablaSensores = document.getElementById("tablaSensores");
      const cuerpoTabla = tablaSensores.querySelector("tbody");
      cuerpoTabla.innerHTML = "";
      for (const sensor in data) {
        const valorSensor = data[sensor];
        datos_reales.push(valorSensor);
        const fila = document.createElement("tr");
        // Crear las celdas para el nombre, valor y unidad
        const celdaNombre = document.createElement("td");
        if (sensor == "senHumedadAgua") {
          celdaNombre.textContent = "Sensor de Agua";
        }
        if (sensor == "senHumedadAire") {
          celdaNombre.textContent = "Sensor de Humedad de Aire";
        }
        if (sensor == "senPh") {
          celdaNombre.textContent = "Sensor de pH";
        }
        if (sensor == "senCalidadAire") {
          celdaNombre.textContent = "Sensor de Calidad de Aire";
        }
        fila.appendChild(celdaNombre);
        const celdaValor = document.createElement("td");
        celdaValor.textContent = data[sensor];
        fila.appendChild(celdaValor);
        // Agregar la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
      }
      const nuevoValor1 = data.senHumedadAgua;
      const nuevoValor2 = data.senHumedadAire;
      const nuevoValor3 = data.senPh;
      const nuevoValor4 = data.senCalidadAire;
      const fechaActual = new Date().toLocaleTimeString();
      const x = fechaActual;
      chart.data.labels.push(fechaActual);
      chart.data.datasets[0].data.push({
        x: x,
        y: nuevoValor1,
      });
      chart.data.datasets[1].data.push({
        x: x,
        y: nuevoValor2,
      });
      chart.data.datasets[2].data.push({
        x: x,
        y: nuevoValor3,
      });
      chart.data.datasets[3].data.push({
        x: x,
        y: nuevoValor4,
      });
      if (chart.data.datasets[0].data.length > maxPoints) {
        const pointsToRemove = chart.data.datasets[0].data.length - maxPoints;
        chart.data.datasets[0].data.splice(0, pointsToRemove);
      }
      // Verificar si se excede el número máximo de puntos para la segunda línea
      if (chart.data.datasets[1].data.length > maxPoints) {
        const pointsToRemove = chart.data.datasets[1].data.length - maxPoints;
        chart.data.datasets[1].data.splice(0, pointsToRemove);
      }
      // Verificar si se excede el número máximo de puntos para la tercera línea
      if (chart.data.datasets[2].data.length > maxPoints) {
        const pointsToRemove = chart.data.datasets[2].data.length - maxPoints;
        chart.data.datasets[2].data.splice(0, pointsToRemove);
      }
      // Verificar si se excede el número máximo de puntos para la cuarta línea
      if (chart.data.datasets[3].data.length > maxPoints) {
        const pointsToRemove = chart.data.datasets[3].data.length - maxPoints;
        chart.data.datasets[3].data.splice(0, pointsToRemove);
        chart.data.labels.splice(0, pointsToRemove);
      }
      chart.update();
    });
}

setInterval(function () {
  TablaSensores();
}, 3000);

// Cargar el archivo JSON
// Obtener referencias a los elementos de entrada
const nombreSensorInput = document.getElementById("nombreSensor");
const fechaSensorInput = document.getElementById("fechaSensor");
const horaSensorInput = document.getElementById("horaSensor");
// Agregar eventos de escucha a los elementos de entrada
nombreSensorInput.addEventListener("input", ConsultarDatos);
fechaSensorInput.addEventListener("input", ConsultarDatos);
horaSensorInput.addEventListener("input", ConsultarDatos); //input, keyup
const fechaActual = new Date(); //Obtenemos la fecha actual
const dia = fechaActual.getDate();
fechaActual.setDate(dia - 1);
const diaAnterior = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const anio = fechaActual.getFullYear();
const diaFormateado = String(diaAnterior).padStart(2, "0");
const mesFormateado = String(mes).padStart(2, "0");
const fechaAnterior = `${anio}-${mesFormateado}-${diaFormateado}`;
// Asociar el evento 'DOMContentLoaded' a la función onPageLoad
document.addEventListener("DOMContentLoaded", onPageLoad);
function onPageLoad() {
  ConsultarDatos();
}

function ConsultarDatos() {
  let nombreSensor = nombreSensorInput.value;
  const fechaSensor = fechaSensorInput.value;
  let horaSensor = horaSensorInput.value;

  // let fechaPredefinida = "";
  console.log(fechaPredefinida < fechaActual);
  console.log(fechaAnterior);
  console.log(fechaSensor);
  console.log(fechaPredefinida);

  function fechaTexto(fechaPredefinida) {
    const fechaObj = new Date(fechaPredefinida);
    const mesTexto = fechaObj.toLocaleString("es-ES", { month: "long" });
    //const anioInput = fechaActual.getFullYear();
    console.log(fechaPredefinida);
    const anioInput = fechaPredefinida.split("-")[0];
    console.log(anioInput);
    mesCapturadoElement.textContent =
      "Datos Capturados del Mes de: " + mesTexto + " del año " + anioInput;
  }
  console.log(fechaPredefinida);

  if (nombreSensor === "" && fechaSensor === "" && horaSensor === "") {
    fechaPredefinida = fechaAnterior;
    fechaTexto(fechaPredefinida);
  } else {
    if (fechaSensor <= fechaAnterior) {
      console.log(nombreSensor, fechaPredefinida, horaSensor);
      if (nombreSensor != "" && fechaSensor != "" && horaSensor != "") {
        Swal.fire(
          "¡Oh, lo siento! ¡Ocurrió un error!",
          "No se puede consultar la información ya que solo se permite consultar por fecha, fecha y sensor o fecha y hora",
          "error"
        );
        nombreSensorInput.disabled = true;
        horaSensorInput.disabled = true;
        fechaSensorInput.value = "";
        nombreSensorInput.value = "";
        horaSensorInput.value = "";
        nombreSensor = "";
        horaSensor = "";
        nivelesAceptables = [7, 50, 60, 30];
        fechaPredefinida = fechaAnterior;
      } else {
        fechaSensorInput.addEventListener("input", function () {
          if (fechaSensorInput.value.trim() != "") {
            nombreSensorInput.disabled = false;
            horaSensorInput.disabled = false;
          } else {
            nombreSensorInput.disabled = true;
            horaSensorInput.disabled = true;
          }
        });
        fechaPredefinida = fechaSensor;

        fechaTexto(fechaPredefinida);
      }
    } else {
      //Swal.fire("Ohs lo siento ocurrio un error", "No se puede consultar la fecha ingresada, supera el día actual!", "success");//{
      Swal.fire(
        "¡Oh, lo siento! ¡Ocurrió un error!",
        "No se puede consultar la fecha ingresada, ¡supera el día actual!",
        "error"
      );
      nombreSensorInput.disabled = true;
      horaSensorInput.disabled = true;
      fechaSensorInput.value = "";
      nombreSensorInput.value = "";
      horaSensorInput.value = "";
      nombreSensor = "";
      horaSensor = "";
      nivelesAceptables = [7, 50, 60, 30];
      fechaPredefinida = fechaAnterior;
    }
  }
  console.log(fechaSensorInput.value.trim() == "");
  ConsultarServidor(nombreSensor, fechaPredefinida, horaSensor);
}

function ConsultarServidor(nombreSensor, fechaPredefinida, horaSensor) {
  let resultados = [];
  //fetch("https://agromatica.onrender.com/verDatos")
  fetch("./Data/Historial.json")
    .then((response) => response.json())
    .then((data) => {
      //crear un indice por fecha
      const indiceFecha = {};
      for (const dato of data) {
        const fecha = dato.fecha;
        if (!indiceFecha[fecha]) {
          indiceFecha[fecha] = [];
        }
        indiceFecha[fecha].push(dato);
      }
      // Crear un índice por nombre de sensor
      const indiceSensor = {};
      for (const dato of data) {
        for (const sensor in dato) {
          if (sensor !== "_id" && sensor !== "fecha") {
            if (!indiceSensor[sensor]) {
              indiceSensor[sensor] = [];
            }
            indiceSensor[sensor].push(dato);
          }
        }
      }
      // Función de filtrado por fecha utilizando el índice
      function filtrarPorFecha(fecha) {
        for (const claveFecha in indiceFecha) {
          if (claveFecha === fecha) {
            resultados.push(...indiceFecha[claveFecha]);
          }
        }
        return resultados;
      }
      // Función de filtrado por nombre de sensor utilizando el índice
      function filtrarPorSensor(data, nombre) {
        let labels_horas = [];
        console.log(data);
        data.forEach((sensor) => {
          resultados = Object.values(sensor[nombre]);
          labels_horas = Object.keys(sensor[nombre]);
          labels_horas.sort((a, b) => a - b);
          console.log(resultados);
        });

        return [resultados, labels_horas];
      }
      // Función de filtrado por hora utilizando el índice
      function filtrarPorHora(data, hora) {
        console.log(data);
        console.log(hora);
        let datos_hora = [];
        data.forEach((sensor) => {
          for (let clave_sensor in sensor) {
            if (sensor.hasOwnProperty(clave_sensor)) {
              if (clave_sensor !== "_id" && clave_sensor !== "fecha") {
                datos_hora.push(sensor[clave_sensor][hora]);
                console.log(datos_hora);
              }
            }
          }
        });
        labels_nombre = [
          "Humedad de Agua",
          "Humedad de Aire",
          "pH",
          "Calidad de Aire",
        ];
        return [datos_hora, labels_nombre];
      }

      if (nombreSensor == "" && fechaPredefinida != "" && horaSensor == "") {
        if (fechaPredefinida != fechaAnterior) {
          console.log(
            "se esta consultado con la fecha que se ingreso",
            fechaPredefinida
          );
          resultados = filtrarPorFecha(fechaPredefinida);
          console.log(resultados);
          if (resultados.length == 0) {
            Swal.fire(
              "¡Oh, lo siento! ¡Ocurrió un error!",
              "Lo siento la fecha consultada no tiene datos para mostrar",
              "error"
            );
          }
        } else {
          console.log(
            "se esta consultado con la fecha predefinnida",
            fechaPredefinida
          );
          resultados = filtrarPorFecha(fechaPredefinida);
        }
        const sensores = Object.keys(resultados).filter(
          (key) => key !== "_id" && key !== "fecha"
        );
        let res = 0;
        contador = 0;
        promedios = [];
        sensores.forEach((sensor) => {
          const mediciones = resultados[sensor];
          const valores = Object.values(mediciones);
          console.log(valores);
          for (const valor of valores) {
            if (contador > 1) {
              suma = 0;
              contador_dato = 0;
              for (const dato_sensor in valor) {
                suma += valor[dato_sensor];
                contador_dato += 1;
              }
              res = suma / contador_dato;
              promedios.push(res);
            }
            contador += 1;
          }
        });
        console.log(promedios);
        labels_nombre = [
          "Humedad de Agua",
          "Humedad de Aire",
          "pH",
          "Calidad de Aire",
        ];
        Graficar_Histograma(promedios, labels_nombre);
      }
      if (nombreSensor != "" && fechaPredefinida != "" && horaSensor === "") {
        resultados = filtrarPorFecha(fechaPredefinida);
        resultados = filtrarPorSensor(resultados, nombreSensor);
        let valor = 0;
        nivelesAceptables = [];
        if (nombreSensor == "senHumedadAgua") {
          valor = 50;
        }
        if (nombreSensor == "senPh") {
          valor = 7;
        }
        if (nombreSensor == "senHumedadAire") {
          valor = 25;
        }
        if (nombreSensor == "senCalidadAire") {
          valor = 65;
        }
        for (let i = 0; i < 24; i++) {
          nivelesAceptables.push(valor);
        }
        Graficar_Histograma(resultados[0], resultados[1]);
      }
      if (nombreSensor == "" && fechaPredefinida != "" && horaSensor != "") {
        let hora = 0;
        resultados = filtrarPorFecha(fechaPredefinida);
        hora = horaSensor.substring(0, 2);
        resultados = filtrarPorHora(resultados, hora);
        Graficar_Histograma(resultados[0], resultados[1]);
      }

      function Graficar_Histograma(promedios, labels_nombre) {
        const ctx = document.getElementById("grafico").getContext("2d");
        if (chart_estadistica) {
          chart_estadistica.destroy();
        }
        chart_estadistica = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels_nombre,
            datasets: [
              {
                label: "Promedio de Valores",
                data: promedios,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
              {
                label: "Niveles Aceptables",
                data: nivelesAceptables,
                borderColor: "rgba(255, 99, 132, 0.6)",
                fill: false,
                type: "line",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  title: function (context) {
                    const label = context[0].label; // Obtener el label de la barra actual
                    return "Sensor de " + label;
                  },
                },
              },
            },
          },
        });
      }
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
}

// fetch("./Data/Alimentador.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const miBoton = document.getElementById("activarAlimentador");
//     miBoton.setAttribute("data-tooltip-Alimentador",`Estado: ${data.estado}\nNivel de comida: ${data.nivelComida}%\nEnergía restante: ${data.energiaRestante}%`);
//   })
//   .catch((error) => {
//     console.error("Error al cargar el archivo JSON:", error);
//   });

// fetch("./Data/Aireador.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const miBoton = document.getElementById("activarAliador");
//     miBoton.setAttribute("data-tooltip-Aliador",`Estado: ${data.estado}\nVelocidad: ${data.velocidad}%\nEnergía restante: ${data.energiaRestante}%`);
//   })
//   .catch((error) => {
//     console.error("Error al cargar el archivo JSON:", error);
//   });

let datosAlimentador = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("./Data/Alimentador.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        datosAlimentador.push(data[i]);
      }

      const cardTextElement = document.querySelector(".card-text1");
      const estado = document.createElement("span");
      estado.textContent = "Estado: ";
      const nivelComida = document.createElement("span");
      nivelComida.textContent = "Nivel de comida:  ";
      const energiaRestante = document.createElement("span");
      energiaRestante.textContent = "Energía restante: ";

      cardTextElement.appendChild(estado);
      cardTextElement.appendChild(document.createTextNode(`${data.estado}`));
      cardTextElement.appendChild(document.createElement("br"));
      cardTextElement.appendChild(nivelComida);
      cardTextElement.appendChild(
        document.createTextNode(`${data.nivelComida}%`)
      );
      cardTextElement.appendChild(document.createElement("br"));
      cardTextElement.appendChild(energiaRestante);
      cardTextElement.appendChild(
        document.createTextNode(`${data.energiaRestante}%`)
      );
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
});
let datosAireador = [];
document.addEventListener("DOMContentLoaded", function () {
  fetch("./Data/Aireador.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        datosAireador.push(data[i]);
      }

      const cardTextElement = document.querySelector(".card-text2");
      const estado = document.createElement("span");
      estado.textContent = "Estado: ";
      const velocidad = document.createElement("span");
      velocidad.textContent = "Velocidad: ";
      const energiaRestante = document.createElement("span");
      energiaRestante.textContent = "Energía restante: ";

      cardTextElement.appendChild(estado);
      cardTextElement.appendChild(document.createTextNode(`${data.estado}`));
      cardTextElement.appendChild(document.createElement("br"));
      cardTextElement.appendChild(velocidad);
      cardTextElement.appendChild(
        document.createTextNode(`${data.velocidad}%`)
      );
      cardTextElement.appendChild(document.createElement("br"));
      cardTextElement.appendChild(energiaRestante);
      cardTextElement.appendChild(
        document.createTextNode(`${data.energiaRestante}%`)
      );
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
});

/* parte del semaforo interactivo - fase de prueba */

// parte del modal que alberga el boton

let primerboton = document.getElementById("activarAireador");
let segundoboton = document.getElementById("activarAlimentador");

document.addEventListener("DOMContentLoaded", function () {
  primerboton.addEventListener("click", function () {
    primerboton.classList.remove("apagado");
    if (primerboton.classList.value == "encendido") {
      primerboton.classList.remove("encendido");
      primerboton.classList.add("apagado");
      primerboton.innerText = "Aireador Apagado";
      console.log("Lo apago");
    } else {
      primerboton.classList.remove("encendido");
      if (datosAireador[2] < 50) {
        Swal.fire(
          "¡Oh, lo siento! ¡Ocurrió un error!",
          "No se puede encender el Aireador Energia Insuficiente",
          "error"
        );
      } else {
        segundoboton.classList.remove("encendido");
        primerboton.classList.add("encendido");
        segundoboton.classList.add("apagado");
        primerboton.innerText = "Aireador Encendido";
        segundoboton.innerText = "Alimentador Apagado";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  segundoboton.addEventListener("click", function () {
    segundoboton.classList.remove("apagado");
    if (segundoboton.classList.value == "encendido") {
      segundoboton.classList.remove("encendido");
      segundoboton.classList.add("apagado");
      segundoboton.innerText = "Alimentador Apagado";
      console.log("Lo apago");
    } else {
      segundoboton.classList.remove("encendido");
      if (datosAlimentador[1] < 25 || datosAlimentador[2] < 50) {
        Swal.fire(
          "¡Oh, lo siento! ¡Ocurrió un error!",
          "No se puede encender el Alimentador por comida o energia Insuficiente",
          "error"
        );
      } else {
        primerboton.classList.remove("encendido");
        primerboton.classList.add("apagado");
        segundoboton.classList.add("encendido");
        primerboton.innerText = "Aireador Apagado";
        segundoboton.innerText = "Alimentador Encendido";
      }
    }
  });
});

console.log(datosAlimentador);

function generarPDF() {
  let imgData;
  const doc = new jsPDF();
  let x = 25; // Coordenada X de la imagen en el PDF
  let y = 20; // Coordenada Y de la imagen en el PDF
  const width = 150; // Ancho de la imagen en el PDF
  const height = 100; // Altura de la imagen en el PDF
  const canvas = document.getElementById("grafico");
  const valores_canvas = canvas.getContext("2d");
  // Obtener la instancia del gráfico a través del contexto
  const miGrafica = Chart.getChart(valores_canvas);
  // // Obtener la cantidad de barras
  let barras_label = miGrafica.data.labels;
  let datos_label = miGrafica.data.datasets[0].data;
  //console.log(miGrafica.data.datasets[0].data[0]);
  // console.log(miGrafica.data.labels);
  // console.log(miGrafica.data.labels[0]);
  // console.log(miGrafica.data.labels[1]);
  // console.log(miGrafica.data.labels[2]);
  // console.log(miGrafica.data.labels[3]);

  // console.log(`La gráfica tiene ${barras_label} barras.`);
  let validarFecha = document.getElementById("fechaSensor").value;
  const validarNombre = document.getElementById("nombreSensor").value;
  const validarSelect = document.getElementById("nombreSensor");
  console.log(validarNombre);
  let validartextoNombre =
    validarSelect.options[validarSelect.selectedIndex].textContent;
  console.log(validartextoNombre);
  const validaHora = document.getElementById("horaSensor").value;
  let texto = "";
  console.log(validarNombre);
  console.log(validarFecha);
  console.log(validaHora);
  console.log(
    validarFecha != "" &&
      validarNombre != "Seleccionar Sensor" &&
      validaHora == ""
  );
  console.log(fechaPredefinida);

  if (validarFecha == "") {
    validarFecha = fechaPredefinida;
  }
  if (validarFecha && validarNombre == "" && validaHora == "") {
    texto +=
      "De la presente grafica obtenemos la lectura del promedio de los 4 sensores que se estan capturando en el sistema, en base a la fecha que usted ingreso que es: " +
      validarFecha +
      ". De la cual obtuvimos los siguientes resultados, del sensor de "; //+ barras_label[0]+" obtuvo un promedio de "+datos_label[0]+", el sensor de "+barras_label[1]+" obtuvo un promedio de "+datos_label[1]+", el sensor de " +barras_label[2]+ " obtuvo un promedio de "+datos_label[2]+", el sensor de "+barras_label[3]+ " obtuvo un promedio de "+datos_label[3]+"."
    for (const i in barras_label) {
      if (i != barras_label.length - 1) {
        texto +=
          barras_label[i] +
          " obtuvo un promedio de " +
          datos_label[i] +
          ", el sensor de ";
      } else {
        texto +=
          barras_label[i] + " obtuvo un promedio de " + datos_label[i] + ".";
      }
    }
  }
  if (validarFecha && validarNombre) {
    texto +=
      "De la presente grafica obtenemos la lectura de un sensor en especifico en este caso es el que usted ingreso en el sistema y se trata del " +
      validartextoNombre +
      " del día " +
      validarFecha +
      ". De la cual obtuvimos los resultados que se captaron en cada hora del día ya que en cada hora se guarda en la base de datos la lectura, que el sensor capto en ese momento, se detalla a continuación los valores capturados en cada hora del día a las ";
    for (const i in barras_label) {
      if (i != barras_label.length - 1) {
        texto +=
          barras_label[i] +
          ":00 obtuvo una lectura de " +
          datos_label[i] +
          ", a las ";
      } else {
        texto +=
          barras_label[i] + ":00 obtuvo una lectura de " + datos_label[i] + ".";
      }
    }
  }

  if (validarFecha && validaHora) {
    texto +=
      "De la presente grafica obtenemos la lectura de los sensores en una determinada hora que es la que usted ingreso en el sistema y se trata de la fecha " +
      validarFecha +
      " en la hora " +
      validaHora +
      ":00. De la cual se obtuvieron los resultados que se captaron de los sensores en esa determinada hora para el sensor de ";
    for (const i in barras_label) {
      if (i != barras_label.length - 1) {
        texto +=
          barras_label[i] +
          " obtuvo una lectura de " +
          datos_label[i] +
          ", el sensor de ";
      } else {
        texto +=
          barras_label[i] + " obtuvo una lectura de " + datos_label[i] + ".";
      }
    }
  }

  console.log(texto);
  const title = "Analisis Estadistico de los Datos Capturados";

  // Configurar el estilo del título
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  // Calcular la posición X centrada para el título

  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize(); // Calcular el ancho del texto
  const titleX = 25; //(doc.internal.pageSize.getWidth - titleWidth) / 2;
  const titleY = 20;
  //const pageWidth = doc.internal.pageSize.getWidth;
  //const titleX = (pageWidth - titleWidth) / 2; // Calcula la posición X centrada
  doc.text(title, titleX, titleY);

  // Agregar el título al PDF
  doc.text(title, titleX, 20);
  console.log(canvas);
  console.log(canvas.dataset);
  html2canvas(canvas, { scale: 5 }).then(function (canvas) {
    imgData = canvas.toDataURL("image/png");
    //console.log(imgData);
    doc.addImage(imgData, "PNG", x, y, width, height);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Definir el ancho máximo de línea
    let maxWidth = doc.internal.pageSize.width - 50; // Ajusta el valor según tus necesidades
    console.log(doc);
    console.log(maxWidth);
    // Dividir el texto en líneas que se ajusten al ancho máximo
    let titleLines = doc.splitTextToSize(texto, maxWidth);

    // Calcular la altura total del texto del título
    let titleHeight = titleLines.length * doc.internal.getFontSize();

    if (titleHeight > doc.internal.pageSize.getHeight - 20) {
      // Si el texto supera el límite, puedes ajustar el tamaño de fuente o reducir el texto para que quepa en la página
      doc.setFontSize(20);
      titleLines = doc.splitTextToSize(texto, maxWidth); // Volver a dividir el texto con el nuevo tamaño de fuente
    }
    doc.text(titleLines, titleX, 150);
    doc.save("documento.pdf", { quality: 1 });
  });
}

document.getElementById("Generarpdf").addEventListener("click", generarPDF);
