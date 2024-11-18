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
        response = await axios.get(`${RutaApi}registrotemperatura/usuario/${idUser}`);
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
            const average = temperatures.length > 0 
              ? temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length 
              : 0; // Promedio o valor predeterminado
    
            dataset.data = dataset.data.map((temp) => (temp === null ? average : temp));
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

    async getBebeSeleccionado() {
      this.loading = true;
      var response = null;
      try {
        response = await axios.get(`${RutaApi}seleccionado`);
        console.log("Datos obtenidos en getBebeSeleccionado:", response);
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

    async putBebeMovimiento(movimiento) {
      this.loading = true;
      var response = null;
      try {
        response = await axios.put(
          `${RutaApi}bebe/cambiar/movimiento/${movimiento}`
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


  },
});
