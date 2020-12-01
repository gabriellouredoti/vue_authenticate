<template>
    <div>

        <div class="columns is-centered">
            <div class="column is-half">
                <h2 id="title">Listagem de usuários</h2>
                <div class="table-container">        
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>EMAIL</th>
                                <th>CARGO</th>
                                <th>AÇÕES</th>
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <!-- pipe -->
                                <td>{{ user.role | transformCodeRole}}</td>
                                <td>
                                    <button class="btn button is-danger" @click="showMod(user.id)">DELETAR</button>   
                                    <router-link :to="{name: 'UserEdit', params: {id: user.id}}"><button class="button is-warning">EDITAR</button></router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div :class="{modal: true, 'is-active': showModal}">
                        <div class="modal-background"></div>
                            <div class="modal-content">
                                <div class="card">
                                    <header class="card-header">
                                        <p class="card-header-title">
                                        Deletar usuário
                                        </p>
                                        <a href="#" class="card-header-icon" aria-label="more options">
                                        <span class="icon">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                        </a>
                                    </header>
                                    <div class="card-content">
                                        <div class="content">
                                            Você realmente deseja deletar este usuário?
                                        </div>
                                    </div>
                                    <footer class="card-footer">
                                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                                        <a href="#" class="card-footer-item" @click="deleteUser()">Continuar</a>
                                    </footer>
                                </div>
                            </div>
                        <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){

        var req = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
            }
        }

        axios.get("http://localhost:8686/user",req).then(res => {
            this.users = res.data;
        }).catch(err => {
            console.log(err);       

        });
    },
    data(){
        return {
            users: [],
            showModal: false,
            delUser: 0
        }
    },
    filters: {
        transformCodeRole: function(value){
            if(value == 0){
                return "ADMINISTRADOR";
            }else if(value == 1){
                return "USUÀRIO COMUM"
            }
        }
    },
    methods:{
        hideModal(){
            this.showModal = false;
        },
        showMod(id){
            this.delUser = id
            this.showModal = true;
            
        },
        deleteUser(){

            var req = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
                }
            }

            axios.delete(`http://localhost:8686/user/${this.delUser}`,req).then( res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter(u => u.id != this.delUser);
            }).catch(err => {
                console.log(err);
                this.showModal = false;
            });
        }
    }

}
</script>

<style>
    div > table > tbody button{
        margin-left: 2%;
    }
    #title{
        margin-bottom: 10px;
        font-size: 30px;
    }
    

</style>