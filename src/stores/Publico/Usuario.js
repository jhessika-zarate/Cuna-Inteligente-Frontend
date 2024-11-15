import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { RutaApi } from "@/assets/apiConfig.js";

export const useUsusrioStore = defineStore("usuario", {
    state: () => ({
        usuarios: [],
        usuario: {},
        loading: false,
        error: null,
    }),
    actions: {
    async postUsuario(usuario) {
        this.loading = true;
        var response = null;
        try {
            response = await axios.post(`${RutaApi}usuario`, usuario);
            this.usuario = response.data;
        } catch (error) {
            this.error = error;
        }finally{
            this.loading = false;
        if(response.data.code === "200"){
            return response.data.response;
        }else{
            return null;
        }
    }},

    async getUsuarios() {
        this.loading = true;
        var response = null;
        try {
            response = await axios.get(`${RutaApi}usuario`);
            this.usuarios = response.data;
        } catch (error) {
            this.error = error;
        }finally{
            this.loading = false;
        if(response.data.code === "200"){
            return response.data.response;
        }else{
            return null;
        }
    }},


    },
});
