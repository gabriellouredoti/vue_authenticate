<template>
    <div class="container">
        <div class="row">
            <div class="col-md col12 form">
                <div v-if="error != undefined">
                <div class="alert alert-danger">
                    {{error}}
                </div>
            </div>
            <br>
            <h2 id="login">Acesso restrito</h2>
            <input class="form-control in" type="email" name="email" id="email" placeholder="exemplo@dominio.com" v-model="email">  
            <input class="form-control in" type="password" name="password" id="password" placeholder="******" v-model="password">  
            <button class="btn btn-success" @click="login">Entrar</button>
            </div> 
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

    div > input.in{
        margin-bottom: 1% !important;
        max-width: 50% !important;
        margin: auto;
        height: 50px;
    }

    div > .form button.btn{
        width: 50%;
        height: 50px;
    }

    div.form .alert{
        max-width: 50%;
        margin: auto;
    }


</style>