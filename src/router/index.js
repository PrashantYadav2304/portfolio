import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Addtodo from '@/components/Addtodo'
import Edittodo from '@/components/Edittodo'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import GMap from '@/components/GMap'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import firebase from 'firebase'
import ViewProfile from '@/components/ViewProfile'


Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: true
      }
    
    },
    {
      path: '/add-todo',
      name: 'Addtodo',
      component: Addtodo,
      meta: {
        requireAuth: true
      }
    
    },
    {
      path: '/edit-todo/:edit_slug',
      name: 'Edittodo',
      component: Edittodo,
      meta: {
        requireAuth: true
      }
    
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      meta: {
        requireAuth: true
      }
    
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        if(to.params.name){
          next()
        } else {
          next({ name: 'Welcome'})
        }
      }
    },
    {
      path: '/gmap',
      name: 'GMap',
      component: GMap,
      meta: {
        requireAuth: true
      }
    
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requireAuth: true
      }
    
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route require a auth
  if(to.matched.some(rec => rec.meta.requireAuth)){
    
    let user = firebase.auth().currentUser
    if(user){
      next()
    } else {
      next({ name: 'Login'})
    }

  } else {
    next()
  }
})

export default router
