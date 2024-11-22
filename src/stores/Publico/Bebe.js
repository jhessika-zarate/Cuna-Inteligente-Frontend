import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { RutaApi } from "@/assets/apiConfig.js";

export const useBebeStore = defineStore("bebe", {
  state: () => ({
    bebes: [],
    bebe: {},
    loading: false,
    error: null,
  }),
  actions: {
    async getBebes() {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}bebe`);
        this.bebes = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async getBabybyUser(idUser) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}bebe/usuario/${idUser}`);
        console.log("Datos obtenidos en getBabybyUser:2", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async getTemperaturabyUser(idUser) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(
          `${RutaApi}registrotemperatura/usuario/${idUser}`
        );
        console.log("Datos obtenidos en getBabybyUser:2", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async getTemperaturabyUserDataOriginal(idUser) {
      this.loading = true;
      let response = null;

      try {
        response = await axios.get(
          `${RutaApi}registrotemperatura/usuario/${idUser}`
        );
        console.log("Datos obtenidos en getTemperaturabyUser:", response);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response && response.data.code === "200") {
          const rawData = response.data.response;

          // Transformación de datos
          const dataByBaby = {};
          rawData.forEach((registro) => {
            const { idBebe, temperatura, fecha } = registro;
            const hora = new Date(fecha).getHours(); // Obtenemos la hora del registro

            if (!dataByBaby[idBebe.idBebe]) {
              dataByBaby[idBebe.idBebe] = {
                label: `${idBebe.nombre} ${idBebe.apellidopaterno}`,
                data: Array(24).fill(null), // Inicializamos con 24 posiciones (una para cada hora del día)
                backgroundColor: "rgba(108,92,231,0.3)", // Puedes ajustar el color según el bebé
                borderColor: "#6c5ce7",
                borderWidth: 2,
                fill: true,
              };
            }

            // Asignamos la temperatura a la posición correspondiente a la hora
            dataByBaby[idBebe.idBebe].data[hora] = temperatura;
          });

          // Preparar los datos finales
          const datasets = Object.values(dataByBaby);

          return {
            allData: datasets.map((dataset) => dataset.data),
            activeIndex: 0,
            chartData: {
              datasets: datasets,
              labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Etiquetas por horas del día
            },
            gradientColors: ["#d9b29c", "#d9b29c"],
            gradientStops: [1, 0.6, 0],
            extraOptions: { responsive: true },
          };
        } else {
          return null;
        }
      }
    },
    async getTemperaturabyUserData(idUser) {
      this.loading = true;
      let response = null;

      // Lista de colores predefinidos para los bebés
      const colors = [
        { backgroundColor: "rgba(108,92,231,0.3)", borderColor: "#6c5ce7" }, // Morado
        { backgroundColor: "rgba(52,152,219,0.3)", borderColor: "#3498db" }, // Azul
        { backgroundColor: "rgba(231,76,60,0.3)", borderColor: "#e84c3c" }, // Rojo
        { backgroundColor: "rgba(46,204,113,0.3)", borderColor: "#2ecc71" }, // Verde
        { backgroundColor: "rgba(241,196,15,0.3)", borderColor: "#f1c40f" }, // Amarillo
      ];

      try {
        response = await axios.get(
          `${RutaApi}registrotemperatura/usuario/${idUser}`
        );
        console.log("Datos obtenidos en getTemperaturabyUser:", response);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response && response.data.code === "200") {
          const rawData = response.data.response;

          // Transformación de datos
          const dataByBaby = {};
          let colorIndex = 0; // Índice para asignar colores

          rawData.forEach((registro) => {
            const { idBebe, temperatura, fecha } = registro;
            const fechaRegistro = new Date(fecha);
            const hora = fechaRegistro.getHours();
            const minutos = fechaRegistro.getMinutes();
            const intervalo = Math.floor(minutos / 15); // Determina el intervalo (0:00, 0:15, 0:30, 0:45)

            // Verifica que el registro esté dentro del día actual
            const today = new Date();
            if (fechaRegistro.toDateString() !== today.toDateString()) return; // Filtra por fecha actual

            if (!dataByBaby[idBebe.idBebe]) {
              const assignedColor = colors[colorIndex % colors.length]; // Asignar un color de forma cíclica
              colorIndex++; // Incrementar el índice para el próximo bebé

              dataByBaby[idBebe.idBebe] = {
                label: `${idBebe.nombre} ${idBebe.apellidopaterno}`,
                data: Array(24 * 4).fill(null), // Inicializamos con 96 posiciones (24 horas * 4 intervalos)
                backgroundColor: assignedColor.backgroundColor,
                borderColor: assignedColor.borderColor,
                borderWidth: 2,
                fill: true,
              };
            }

            // Asignamos la temperatura al intervalo correspondiente
            const index = hora * 4 + intervalo; // Calculamos el índice en el arreglo
            dataByBaby[idBebe.idBebe].data[index] = temperatura;
          });

          // Reemplazar null con temperatura promedio o 0
          Object.values(dataByBaby).forEach((dataset) => {
            const temperatures = dataset.data.filter((temp) => temp !== null);
            const average =
              temperatures.length > 0
                ? temperatures.reduce((acc, temp) => acc + temp, 0) /
                  temperatures.length
                : 0; // Promedio o valor predeterminado

            dataset.data = dataset.data.map((temp) =>
              temp === null ? average : temp
            );
          });

          // Preparar los datos finales
          const datasets = Object.values(dataByBaby);

          return {
            allData: datasets.map((dataset) => dataset.data),
            activeIndex: 0,
            chartData: {
              datasets: datasets,
              labels: Array.from({ length: 24 * 4 }, (_, i) => {
                const hour = Math.floor(i / 4);
                const minutes = (i % 4) * 15;
                return `${hour}:${minutes === 0 ? "00" : minutes}`;
              }), // Etiquetas por intervalos de 15 minutos
              options: {
                spanGaps: true, // Conecta líneas entre puntos, incluso si hay null
              },
              fill: true, // Relleno del área debajo de la línea
            },
            gradientColors: ["#d9b29c", "#d9b29c"],
            gradientStops: [1, 0.6, 0],
            extraOptions: { responsive: true },
          };
        } else {
          return null;
        }
      }
    },

    async getActivityByBabyData(idBebe) {
      this.loading = true;
      let response = null;

      try {
        response = await axios.get(`${RutaApi}registromovimiento/${idBebe}`);
        console.log("Datos obtenidos en getActivityByBabyData:", response);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;

        if (response && response.data.code === "200") {
          const rawData = response.data.response;
          // console.log("Datos obtenidos en getActivityByBabyData:2", rawData[0].idBebe.color);

          // Inicializamos el array con 96 posiciones (24 horas * 4 intervalos de 15 minutos) en 0
          const activityData = Array(24 * 4).fill(0);

          const today = new Date();

          rawData.forEach((registro) => {
            const { fecha } = registro;
            const fechaRegistro = new Date(fecha);

            // Filtra registros para que solo incluyan los del día actual
            if (fechaRegistro.toDateString() !== today.toDateString()) return;

            const hora = fechaRegistro.getHours();
            const minutos = fechaRegistro.getMinutes();
            const intervalo = Math.floor(minutos / 15); // Determina el intervalo (0:00, 0:15, 0:30, 0:45)

            const index = hora * 4 + intervalo; // Calcula el índice en el array
            activityData[index] = 1; // Marca actividad con 1
          });

          // Configurar los datos para el gráfico
          const chartData = {
            datasets: [
              {
                label: "Actividad de Movimiento",
                data: activityData,
                //que si rawData[0].idBebe.color es Masculino que sea azul y si no rosado
                backgroundColor:
                  rawData[0].idBebe.color === "Masculino"
                    ? "rgba(52,152,219,0.3)"
                    : "rgba(231,76,60,0.3)",
                borderColor:
                  rawData[0].idBebe.color === "Masculino"
                    ? "#3498db"
                    : "#e84c3c",
                borderWidth: 2,
                fill: true,
              },
            ],
            labels: Array.from({ length: 24 * 4 }, (_, i) => {
              const hour = Math.floor(i / 4);
              const minutes = (i % 4) * 15;
              return `${hour}:${minutes === 0 ? "00" : minutes}`;
            }), // Etiquetas por intervalos de 15 minutos
          };

          return {
            allData: activityData,
            chartData,
            activeIndex: 0,
            extraOptions: { responsive: true },
          };
        } else {
          return null;
        }
      }
    },
    async getHumedadbyUser(idUser) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(
          `${RutaApi}registrohumedad/usuario/${idUser}`
        );
        console.log("Datos obtenidos en getBabybyUser:2", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async getMovimientobyBaby(idBebe) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}registromovimiento/${idBebe}`);
        console.log("Datos obtenidos en getBabybyUser:2", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async postBebe(bola) {
      this.loading = true;
      try {
        let headers = {
          "Content-Type": "application/json",
        };
        console.log("Datos enviados en postBebe:", bola);
        const response = await axios.post(`${RutaApi}bebe/registrar`, bola);
        if (response.data && response.data.code === "200") {
          this.bebe = response.data.response;
          return response.data.response;
        } else {
          throw new Error(
            response.data?.message || "Error al enviar los datos"
          );
        }
      } catch (error) {
        this.error = error;
        console.error("Error en postBebe:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async postBebe1(bebe) {
      this.loading = true;
      var response = null;
      console.log("Datos enviados en postBebe1:", bebe);
      console.log("Cokies en postBebe1:", Cookies.get("idUser"));
      let token = Cookies.get("token");
      let headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      try {
        response = await axios.post(
          `${RutaApi}bebe/${Cookies.get("idUser")}`,
          bebe,
          { headers: headers }
        );
        console.log("Datos obtenidos en postBebe1:", response);
        this.bebe = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async obtenerDatosGraficas(idBaby) {
      try {
        const response = await axios.get(`${RutaApi}datosmesbebe/${idBaby}`);
        const registros = response.data.response;
        console.log("Datos obtenidos en obtenerDatosGraficas:", registros);
        if (!registros || registros.length < 2) {
          throw new Error(
            "Se necesitan al menos dos registros para generar las gráficas."
          );
        }

        // Ordenar registros por fecha (opcional, si no están ordenados)
        registros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        // Datos para gráficas
        const alturas = registros.map((r) => r.altura);
        const pesos = registros.map((r) => r.peso);
        const fechas = registros.map((r) =>
          new Date(r.fecha).toLocaleDateString()
        );

        const penultimo = registros[registros.length - 2];
        const ultimo = registros[registros.length - 1];

        return {
          otherCharts: [
            {
              title: "Crecimiento en Altura",
              subtitle: "Evolución del bebé",
              chartId: "altura-line-chart",
              component: "line-chart",
              chartData: {
                datasets: [
                  {
                    label: "Altura (cm)",
                    data: alturas,
                    backgroundColor: "rgba(155,89,182,0.3)",
                    borderColor: "#9b59b6",
                    borderWidth: 2,
                    fill: true,
                  },
                ],
                labels: fechas,
              },
              gradientColors: ["#8e44ad", "#9b59b6"],
              gradientStops: [1, 0.5, 0],
              extraOptions: { responsive: true },
            },
            {
              title: "Comparación Últimos Registros",
              subtitle: "Altura y Peso",
              chartId: "comparacion-bar-chart",
              component: "bar-chart",
              chartData: {
                datasets: [
                  {
                    label: "Peso (kg)",
                    data: [penultimo.peso, ultimo.peso],
                    backgroundColor: "#3498db",
                    borderColor: "#3498db",
                    borderWidth: 2,
                  },
                  {
                    label: "Altura (cm)",
                    data: [penultimo.altura, ultimo.altura],
                    backgroundColor: "#2ecc71",
                    borderColor: "#2ecc71",
                    borderWidth: 2,
                  },
                ],
                labels: ["Penúltimo Registro", "Último Registro"],
              },
              gradientColors: ["#27ae60", "#2ecc71"],
              gradientStops: [1, 0.6, 0],
              extraOptions: { responsive: true },
            },
            {
              title: "Aumento de Peso",
              subtitle: "Progresión en peso del bebé",
              chartId: "peso-line-chart",
              component: "line-chart",
              chartData: {
                datasets: [
                  {
                    label: "Peso (kg)",
                    data: pesos,
                    backgroundColor: "rgba(46,204,113,0.3)",
                    borderColor: "#2ecc71",
                    borderWidth: 2,
                    fill: true,
                  },
                ],
                labels: fechas,
              },
              gradientColors: ["#27ae60", "#2ecc71"],
              gradientStops: [1, 0.5, 0],
              extraOptions: {
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "2ía",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "2)",
                    },
                  },
                },
              },
            },
          ],
        };
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
        return null;
      }
    },

    async fetchHumedadData(idBebe) {
      try {
        const response = await axios.get(`${RutaApi}registrohumedad/${idBebe}`);
        if (response.data && response.data.code === "200") {
          const registros = response.data.response;
          if (registros.length > 0) {
            const ultimoRegistro = registros.reduce((prev, current) => {
              return new Date(prev.fecha) > new Date(current.fecha)
                ? prev
                : current;
            });
            const humedad = ultimoRegistro.humedad;
            return humedad;
          }
        } else {
          console.error(
            "Error en la respuesta del servidor:",
            response.data.errorMessage
          );
        }
      } catch (error) {
        console.error("Error al obtener datos de humedad:", error);
      }
    },

    async fetchTemperaturaData(idBebe) {
      try {
        const response = await axios.get(
          `${RutaApi}registrotemperatura/${idBebe}`
        );
        if (response.data && response.data.code === "200") {
          const registros = response.data.response;
          if (registros.length > 0) {
            const ultimoRegistro = registros.reduce((prev, current) => {
              return new Date(prev.fecha) > new Date(current.fecha)
                ? prev
                : current;
            });
            const humedad = ultimoRegistro.temperatura;
            return humedad;
          }
        } else {
          console.error(
            "Error en la respuesta del servidor:",
            response.data.errorMessage
          );
        }
      } catch (error) {
        console.error("Error al obtener datos de humedad:", error);
      }
    },

    //pruebas de selecionar bebe
    /**
     get obtener bebe selecionado 
     https://backend-control-tareas-jhessika.serverbb.online/api/v1/seleccionado
     put para seleccionar el bebe actual pasandole el id del bebe
     https://backend-control-tareas-jhessika.serverbb.online/api/v1/bebe/seleccionado/1
    put para cambiar el movimiento del bebe a true
    https://backend-control-tareas-jhessika.serverbb.online/api/v1/bebe/cambiar/movimiento/true
     put para cambiar el movimiento del bebe a false
    https://backend-control-tareas-jhessika.serverbb.online/api/v1/bebe/cambiar/movimiento/true

     */
    // Cambiar bebé seleccionado en el backend y actualizar el estado local
    async setBebeSeleccionado(idBebe) {
      this.loading = true;
      try {
        const response = await axios.put(`${RutaApi}seleccionado/${idBebe}`);
        if (response.data.code === "200") {
          this.bebeSeleccionado = this.bebes.find(
            (bebe) => bebe.idBebe === idBebe
          );
          console.log("Bebé seleccionado cambiado a:", this.bebeSeleccionado);
          return response.data.response;
        } else {
          throw new Error("Error al cambiar el bebé seleccionado.");
        }
      } catch (error) {
        this.error = error;
        console.error("Error en setBebeSeleccionado:", error);
      } finally {
        this.loading = false;
      }
    },

    async getBebeSeleccionado() {
      this.loading = true;
      try {
        const response = await axios.get(`${RutaApi}seleccionado`);
        console.log("Datos obtenidos en getBebeSeleccionado:", response);

        console.log(response.status);
        if (response.status === 200) {
          this.bebes = response.data;
          return this.bebes;
        } else {
          throw new Error("Error al obtener el bebé seleccionado.");
        }
      } catch (error) {
        this.error = error;
        console.error("Error en getBebeSeleccionado:", error);
      } finally {
        this.loading = false;
      }
    },

    async putBebeSeleccionado(idBebe) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(`${RutaApi}bebe/seleccionado/${idBebe}`);
        console.log("Datos obtenidos en putBebeSeleccionado:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async putBebeMovimiento(idUsuario) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(
          `${RutaApi}bebe/movimiento/true/${idUsuario}`
        );
        console.log("Datos obtenidos en putBebeMovimiento:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async putBebeMovimientofalse() {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(`${RutaApi}bebe/movimiento/false`);
        console.log("Datos obtenidos en putBebeMovimiento:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async getGrowthDataByBaby(idBaby) {
      this.loading = true;
      let response = null;

      try {
        response = await axios.get(`${RutaApi}datosmesbebe/${idBaby}`);
        console.log("Datos obtenidos en getGrowthDataByBaby:", response);

        if (response.data.code === "200" && response.data.response.length > 0) {
          const rawData = response.data.response;

          // Filtrar registros específicos del bebé
          const filteredData = rawData.filter(
            (registro) => registro.idBebe.idBebe === idBaby
          );

          // Si no hay datos para este bebé, devolver error
          if (filteredData.length === 0) {
            return {
              code: "404",
              response: [],
              errorMessage: "No hay registros disponibles para este bebé.",
            };
          }

          // Ordenar por fecha
          filteredData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

          // Transformación de datos
          const labels = [];
          const heights = [];

          filteredData.forEach((registro) => {
            const { altura, fecha } = registro;
            const formattedDate = new Date(fecha).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
            });

            labels.push(formattedDate);
            heights.push(altura);
          });

          // JSON correctamente estructurado para la gráfica
          return {
            code: "200",
            response: {
              chartId: "purple-line-chart",
              component: "line-chart",
              chartData: {
                labels, // Fechas en el eje X
                datasets: [
                  {
                    label: "Altura del bebé (cm)",
                    data: heights, // Alturas en el eje Y
                    backgroundColor: "rgba(52,152,219,0.3)", // Color de fondo
                    borderColor: "#3498db", // Color de línea
                    borderWidth: 2,
                    fill: false, // No rellenar debajo de la línea
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Fecha de registro",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Altura (cm)",
                    },
                    beginAtZero: true,
                  },
                },
              },
            },
            errorMessage: null,
          };
        } else {
          return {
            code: "404",
            response: [],
            errorMessage: "No hay registros disponibles o ocurrió un error.",
          };
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        return {
          code: "500",
          response: [],
          errorMessage: "Error al obtener datos del servidor.",
        };
      } finally {
        this.loading = false;
      }
    },

    async getUltimoRegistro(idBebe) {
      this.loading = true;
      let response = null;
      try {
        response = await axios.get(`${RutaApi}datosmesbebe/${idBebe}`);
        // te da una lista de JSON, solo obtendrás el último
        const registros = response.data.response;

        // Ordenar los registros por fecha (opcional si no están ordenados)
        registros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        // Obtener el último registro
        const ultimo = registros[registros.length - 1]; // Accede al último elemento correctamente

        console.log("Datos obtenidos en getUltimoRegistro:", ultimo);
        response.data.response = ultimo;
        return ultimo;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response && response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async getUltimoRegistroAlimentacion(idBebe) {
      this.loading = true;
      let response = null;
      console.log("idBebe en getUltimoRegistro alimentacion:", idBebe);
      try {
        response = await axios.get(`${RutaApi}registroalimentacion/${idBebe}`);
        // te da una lista de JSON, solo obtendrás el último
        const registros = response.data.response;
        console.log(
          "Datos obtenidos en getUltimoRegistro alimentacion:",
          response
        );
        // Ordenar los registros por fecha (opcional si no están ordenados)
        registros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        // Obtener el último registro
        const ultimo = registros[registros.length - 1]; // Accede al último elemento correctamente

        console.log(
          "Datos obtenidos en getUltimoRegistro alimentacion:",
          ultimo
        );
        response.data.response = ultimo;
        return ultimo;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response && response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async postRegistroAlimento(idBebe, registro) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.post(
          `${RutaApi}registroalimentacion/${idBebe}`,
          registro
        );
        console.log("respues", response);
        this.bebe = response.data.response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async postRegistroDatosBebe(idBebe, registro) {
      this.loading = true;
      var response = null;
      console.log("Datos enviados en postRegistroDatosBebe:", registro);
      try {
        response = await axios.post(
          `${RutaApi}datosmesbebe/${idBebe}`,
          registro
        );
        console.log("respuesta", response.data);
        this.bebe = response.data.response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async putBebeReproducirMusica(idUsuario) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(
          `${RutaApi}bebe/musica/reproducir/${idUsuario}`
        );
        console.log("Datos obtenidos en putBebeReproducirMusica:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async putBebeDetenerMusica(idUsuario) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(
          `${RutaApi}bebe/musica/detener/${idUsuario}`
        );
        console.log("Datos obtenidos en putBebeDetenerMusica:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async putBebeSeleccionarMusica(idUsuario, numeroMusica) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(
          `${RutaApi}bebe/usuario/${idUsuario}/musica/${numeroMusica}`
        );
        console.log("Datos obtenidos en putBebeDetenerMusica:", response);
        return this.bebe;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async getVacunas(idBebe) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}registrovacuna/${idBebe}`);
        this.bebes = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async postVacunas(idBebe, registro) {
      this.loading = true;
      var response = null;
      console.log("Datos enviados en postRegistroDatosBebe:", registro);
      try {
        response = await axios.post(
          `${RutaApi}registrovacuna/${idBebe}`,
          registro
        );
        console.log("respuesta", response.data);
        this.bebe = response.data.response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async getLlanto(idBebe) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}registrollanto/${idBebe}`);
        this.bebes = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },
    async postLlanto(idBebe, registro) {
      this.loading = true;
      var response = null;
      console.log("Datos enviados en postLlanto:", registro);
      try {
        response = await axios.post(
          `${RutaApi}registrollanto/${idBebe}`,
          registro
        );
        console.log("respuesta", response.data);
        this.bebe = response.data.response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        if (response.data.code === "200") {
          return response.data.response;
        } else {
          return null;
        }
      }
    },

    async obtenerDatosGraficasLlanto(idBaby) {
      try {
        const response = await axios.get(`${RutaApi}registrollanto/${idBaby}`);
        const registros = response.data.response;
        console.log("Datos obtenidos en obtenerDatosGraficas:", registros);

        if (!registros || registros.length < 1) {
          throw new Error(
            "Se necesitan al menos un registro para generar las gráficas."
          );
        }

        // Filtrar los registros de la última semana
        const fechaActual = new Date();
        const fechaSemanaAnterior = new Date(fechaActual);
        fechaSemanaAnterior.setDate(fechaActual.getDate() - 7); // Fecha hace 7 días

        const registrosUltimaSemana = registros.filter((r) => {
          const fechaRegistro = new Date(r.fecha);
          return (
            fechaRegistro >= fechaSemanaAnterior && fechaRegistro <= fechaActual
          );
        });

        if (registrosUltimaSemana.length === 0) {
          throw new Error("No hay registros de llanto en la última semana.");
        }

        // Contar las razones de los llantos
        const razonesCount = registrosUltimaSemana.reduce((acc, r) => {
          const razon = r.razon;
          acc[razon] = (acc[razon] || 0) + 1;
          return acc;
        }, {});

        // Preparar los datos para el gráfico de barras
        const razones = Object.keys(razonesCount);
        const cantidades = razones.map((razon) => razonesCount[razon]);

        // Datos para el gráfico
        return {
          otherCharts: [
            {
              title: "Razones de Llanto en la Última Semana",
              subtitle: "Frecuencia de llanto por razón",
              chartId: "razones-llanto-bar-chart",
              component: "bar-chart",
              chartData: {
                datasets: [
                  {
                    label: "Cantidad de Llantos",
                    data: cantidades,
                    backgroundColor: "#3498db",
                    borderColor: "#3498db",
                    borderWidth: 2,
                  },
                ],
                labels: razones,
              },
              gradientColors: ["#3498db", "#2980b9"],
              gradientStops: [1, 0.6, 0],
              extraOptions: { responsive: true },
            },
          ],
        };
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
        return null;
      }
    },
  },
});
