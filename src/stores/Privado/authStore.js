import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import {RutaApi} from '@/assets/apiConfig.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: Cookies.get('authToken') || null,
        refreshToken: Cookies.get('refreshToken') || null,
        user: null,
        type:null,
        idUser:null,
        isBlocked: false,
        attemps: 0,
        blockTime: 10,

    }),
    actions: {
        unblock(){
            this.isBlocked = false;
            this.attemps = 0;
        },
        async login(credentials) {
            console.log("entro",credentials);
            try {
                const response = await axios.post(`${RutaApi}auth/login`, 
                    credentials
                );
                console.log(response);
                if(response.data.code !== "200" || this.isBlocked){
                        this.attemps = this.attemps + 1;
                        if(this.attemps > 3){
                            this.isBlocked = true;
                            this.blockTime = 10;
                        }
                        return null;
                    }
                
                
                this.authToken = response.data.response.authToken;
                this.refreshToken = response.data.response.refreshToken;
                Cookies.set('authToken', this.authToken);
                Cookies.set('refreshToken', this.refreshToken);
                Cookies.set('idUser', response.data.response.idUser);
                Cookies.set('type', response.data.response.type);
                this.type = response.data.response.type;
                this.idUser = response.data.response.idUser;
                return response.data;
            } catch (error) {
                alert("Error en login");
                return error.response;
            }
        },

        async logout() {
            this.authToken = null;
            this.refreshToken = null;
            this.user = null;
            this.type = null;
            this.idUser = null;
            Cookies.remove('authToken');
            Cookies.remove('refreshToken');
            Cookies.remove('idUser');
            Cookies.remove('type');
            Cookies.remove('user');



        }

    },
});
