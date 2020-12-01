import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import EditUser from '../views/EditUser.vue'
import axios from 'axios'

Vue.use(VueRouter)


function adminAuth(to, from, next){
  if(localStorage.getItem('TK_PASS') != undefined){

    var req = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('TK_PASS')}`
      }
    }

    console.log(req);

    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res);
      next();
    }).catch(err =>{
      console.log(err.response);
      next("/login");
    });

  }else{
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: adminAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: adminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: EditUser,
    // beforeEnter: adminAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
