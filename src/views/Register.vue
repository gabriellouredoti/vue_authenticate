<template>
    <div class="container">
        <div class="row">
            <div class="col-md col-12 form">
                <div v-if="error != undefined">
                    <div class="alert alert-danger">
                        {{error}}
                    </div>
                </div>
                <h2 class="h2-title m-4">Criar novo usuário</h2>
        
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input class="form-control in" type="text" name="name" id="name" placeholder="Nome do usuário" v-model="name"> 
                </div>
                <div class="form-group">
                    <label for="name">E-mail</label>
                    <input class="form-control in" type="email" name="email" id="email" placeholder="exemplo@dominio.com" v-model="email">
                </div>
                <div class="form-group">
                    <label for="name">Senha</label>
                    <input class="form-control in" type="password" name="password" id="password" placeholder="******" v-model="password">
                </div>
                <button class="btn btn-success" @click="register">Salvar</button>
               
            </div>       
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
            error: undefined,
            sucess: undefined
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

    div.form-group > label{
        display: flex;
        margin: auto;
        max-width: 50% !important;
        font-size: 20px;
        font-weight: bold;
    }



</style>