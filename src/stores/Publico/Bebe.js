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
      let token = Cookies.get('token');
      let headers = {
          'Content-Type': 'application/json',
      }
      if(token){
          headers.Authorization = `Bearer ${token}`;
      }
      try {
        response = await axios.post(
          `${RutaApi}bebe/${Cookies.get("idUser")}`,
          bebe, {headers: headers}
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
  },
});
