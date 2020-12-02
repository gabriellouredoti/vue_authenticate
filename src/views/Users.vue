<template>
    <div>

        <div class="container">
            <div class="row">
                <div class="col-md col-12">
                    <h2 id="title">Listagem de usuários</h2>
                    <div class="table-container">        
                        <table class="table table-bordered">
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
                                        <button class="btn button btn-danger" data-toggle="modal" data-target="#modalExemplo" @click="showMod(user.id)">DELETAR</button>   
                                        <router-link :to="{name: 'UserEdit', params: {id: user.id}}"><button class="btn button btn-warning">EDITAR</button></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Modal -->
                        <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Excluir usuário</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Deseja realmente excluir este usuário?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                    <button type="button" class="btn btn-primary" @click="deleteUser()">Salvar mudanças</button>
                                </div>
                                </div>
                            </div>
                        </div>  
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
            // showModal: false,
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
        // hideModal(){
        //     this.showModal = false;
        // },
        showMod(id){
            this.delUser = id
        },
       
        deleteUser(){

            var req = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
                }
            }

            axios.delete(`http://localhost:8686/user/${this.delUser}`,req).then( () => {
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