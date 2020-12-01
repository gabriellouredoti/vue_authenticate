<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger">
                    {{error}}
                </div>
            </div>
            <br>
            <h2 id="login">Acesso restrito</h2>
            <input class="input is-medium" type="email" name="email" id="email" placeholder="exemplo@dominio.com" v-model="email">  
            <input class="input is-medium" type="password" name="password" id="password" placeholder="******" v-model="password">  
            <button class="button is-success is-medium is-fullwidth" @click="login">Entrar</button> 
        </div>
    </div>
      
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            password: '',
            email: '',
            error: undefined
        }
    },
    methods:{
        login(){
            axios.post("http://localhost:8686/login", {email: this.email, password: this.password}).then((res) =>{
                var token = res.data.token;
                localStorage.setItem('TK_PASS', token);
                this.$router.push({name: 'Users'});

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

    #login{
        font-size: 30px;
    }

    .input{
        margin-bottom: 2%;
    }

</style>