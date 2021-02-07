<template>
<div class="edittodo container">
  <h2 class="center align indigo-text">Edit Todo</h2>
  <form @submit.prevent="Edittodo">
    <div class="field title ">
      <label class="left" for="add-title">Todo Title</label>
      <input type="text" name="add-title" v-model="todo.title">
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </div>
    <div class="field add-description">
        <label class="left" for="add-description">Todo Description</label>
        <input type="text" name="add-description" v-model="todo.description">
    </div>
    <div class="field center align">
        <button class="btn pink">Update Todo</button>
    </div>
  </form>


</div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'Edittodo',
  data () {
    return {
      todo: null,
      feedback: null
    
     }
  },
  methods:{
    Edittodo(){
      if(this.todo.title){
        this.feedback = null
        // create a slug
        this.todo.slug = slugify(this.todo.title, {
          replacement:'-',
          remove: /[!@#$%^&*()_+=,.;'";]/g,
          lower: true
        })
        db.collection('todos').doc(this.todo.id).update({
          title: this.todo.title,
          description: this.todo.description,
          slug: this.todo.slug
        }).then(() => {
          this.$router.push({ name: 'Index'})
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = "You must enter a title"
      }

    }

  },
  created(){
    let ref = db.collection('todos').where('slug', '==', this.$route.params.edit_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.todo = doc.data()
        this.todo.id = doc.id
      })
    })


  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edittodo{
  margin-top: 40px;
  padding: 20px;
  max-width: 600px;
}

</style>