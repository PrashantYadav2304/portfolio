<template>
<div class="welcome container">
  
  <div class="card set">
    <div class="center-align">
      <img src="@/assets/Moni/groot.jpeg">
    </div>
    
    <div class="card-content center-align">
      <h2 class="teal-text">Welcome</h2>
      <form @submit.prevent="enterChat">
        <label for="name">
          Enter your name
        </label>
        <input type="text" name="name" v-model="name">
        <p v-if='feedback' class="red-text">{{ feedback }}</p>
        <button class="btn teal">Enter Chat</button>
      </form>
    </div>
  </div>

 
</div>
</template>

<script>

export default {
  name: 'Welcome',
  data () {
    return {
      name: null,
      feedback: null


    }
  },
  methods:{
    enterChat(){
      if(this.name){
        this.feedback = null
        this.$router.push({ name: 'Chat',params: { name: this.name}})

      } else {
        this.feedback = 'You must enter a name'
      }
      
    }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
  max-width: 500px;
  margin-top: 50px;

}
.welcome button{
  margin: 20px auto ;
}

</style>