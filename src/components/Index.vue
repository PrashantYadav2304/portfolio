<template>
<div class="part">
    <div class="row">
    <div class="col s12 m7">
      <div class="card first">
        <div class="card-image">
          <img src="@/assets/Moni/moni.jpg">
          <span class="card-title">Moni</span>
        </div>
        <div class="card-content">
          <p>I am a simple girl. I can contain a little bit of information secure with me. I love my family and friends and I am stupid</p>
        </div>
        <div class="card-action">
          <a href="#">monichaturvedi98@gmail.com</a>
        </div>        
      </div>
    </div>
  </div>
  <div class="container">
   <div class="card-container" v-for="todo in todos" :key="todo.id">
     <div class="row">
    <div class="col s12 m6">
      <div class="card white">
         <i class="material-icons right" @click="deletetodo(todo.id)">delete</i>
        <div class="card-content black-text">
          <span class="card-title">{{ todo.title }}</span>
          <p>{{ todo.description }}</p>
           
        </div>
        <span ><router-link :to="{ name: 'Edittodo', params: {edit_slug: todo.slug}}" class="btn-floating
        right halfway-fab ">
          <i class="material-icons right">edit</i></router-link> 
        </span>
          
      </div>
    </div>
  </div>

   </div>
  
  
  </div>
</div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      
      todos:[]
            
    }
  },
  methods:{
    edittodo(){

    },
    deletetodo(id){
      db.collection('todos').doc(id).delete()
      .then(() => {this.todos = this.todos.filter(todo => {
        return todo.id != id
      })
      })
    }
  },
  created(){  
    db.collection('todos').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let todo = doc.data()
        todo.id = doc.id
        this.todos.push(todo)

      })



    })


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

i{
  cursor: pointer;
}
.part{
    display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(135, 232, 235);
}
</style>
