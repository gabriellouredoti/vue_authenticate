<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger">
                    {{error}}
                </div>
            </div>
            <br>
            <h2 class="h2-title">Editar usuário</h2>
            <div class="lb">
                <label for="name">Nome</label>
            </div> 
            <input class="input is-medium" type="text" name="name" id="name" placeholder="Nome do usuário" v-model="name">
            <div class="lb">
                <label for="name">E-mail</label>
            </div>      
            <input class="input is-medium" type="email" name="email" id="email" placeholder="exemplo@dominio.com" v-model="email">
            <button class="button is-success is-fullwidth is-medium" @click="update()">Editar</button> 
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
export default {
    created(){

        var req = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
            }
        }

        axios.get(`http://localhost:8686/user/${this.$route.params.id}`,req).then(res =>{
            this.name = res.data.name;
            this.email = res.data.email;
            this.id = res.data.id;
            this.role = res.data.role;
        }).catch(err =>{
            console.log(err)
            this.$router.push({name: 'Users'});
        })

    },
    //Data
    data(){
        return{
            name: '',
            email: '',
            id: 0,
            role: 0,
            error: undefined
        }
    },
    //Methods
    methods:{
        
        //Método para editar usuário
        update(){

            var req = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
                }
            }

            axios.put("http://localhost:8686/user", {name: this.name, email: this.email, id: this.id, role: 0}, req).then(() =>{
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