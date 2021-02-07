<template>
<div class="addtodo container">
  <h2 class="center align indigo-text">Add New Todo</h2>
  <form @submit.prevent="Addtodo">
    <div class="field title ">
      <label class="left" for="add-title">Todo Title</label>
      <input type="text" name="add-title" v-model="title">
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </div>
    <div class="field add-description">
        <label class="left" for="add-description">Todo Description</label>
        <input type="text" name="add-description" v-model="description">
    </div>
    <div class="field center align">
        <button class="btn pink">Add Todo</button>
    </div>
  </form>


</div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'Addtodo',
  data () {
    return {
      title: null,
      description: null,
      feedback: null,
      slug: null
    
     }
  },
  methods:{
    Addtodo(){
      if(this.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement:'-',
          remove: /[!@#$%^&*()_+=,.;'";]/g,
          lower: true
        })
        db.collection('todos').add({
          title: this.title,
          description: this.description,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index'})
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = "You must enter a title"
      }

    }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addtodo{
  margin-top: 40px;
  padding: 20px;
  max-width: 600px;
}

</style>