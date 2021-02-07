<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username">    
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>

      <button class="btn deep-purple">Signup</button>
      
    </form>
  </div>
</template>


<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data(){
    return {
      email: null,
      password: null,
      username: null,
      feedback: null,
      userslug: null

    }
  },
  methods: {
    signup(){
      if(this.username && this.email && this.password){
        this.userslug = slugify(this.username, {
          replacement: '-',
          remove: /[!@#$%^&*()_+=,.;'";]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.userslug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'This username has already been taken'
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
              
               ref.set({
                 username: this.username,
                 geolocation: null,
                 user_id: cred.user.uid

               })
             
              }).then(() => {
                this.$router.push({ name: 'GMap'})
              }).catch(err => {
                console.log(err)
                this.feedback = err.message
              })
          }
        })


      } else {
        this.feedback = 'You must fill all fields'
      }

    }
  }
  
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;

}
.signup .field{
  margin-bottom: 16px;
}

</style>