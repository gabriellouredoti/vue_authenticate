<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger">
                    {{error}}
                </div>
            </div>
            <br>
            <h2 class="h2-title">Criar novo usuário</h2>
    
                <div class="lb">
                    <label for="name">Nome</label>
                </div> 
                <input class="input is-medium" type="text" name="name" id="name" placeholder="Nome do usuário" v-model="name"> 
                <div class="lb">
                    <label for="name">E-mail</label>
                </div> 
                <input class="input is-medium" type="email" name="email" id="email" placeholder="exemplo@dominio.com" v-model="email">  
                <div class="lb">
                    <label for="name">Senha</label>
                </div> 
                <input class="input is-medium" type="password" name="password" id="password" placeholder="******" v-model="password">  
                <button class="button is-success is-fullwidth is-medium" @click="register">Salvar</button> 
        </div>  
    </div>
      
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods:{
        register(){

            var req = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
                }
            }
            axios.post("http://localhost:8686/user", {name: this.name, email: this.email, password: this.password}, req).then(() =>{
                this.$router.push({name: 'Home'});
            }).catch(
                err =>{
                    this.error = err.response.data.err;
                }
            );
        },

    }
}
</script>

<style>

    div.lb{
        display: flex;
        align-items: center;
        
    }

    div.lb > label{
        font-size: 20px;
    }

    h2.h2-title{
        font-size: 30px;
    }


</style>