<template>
    <div>
        <h1>Activation Page</h1>
         <br>
         <div class="error" v-html="error" />
        
    </div>
</template>

<script>
import AthenticationService from '@/services/AthenticationService'

export default {
    data (){
        return {
           id: this.$route.params.id,
           error: null
        }
    },
    methods:{
      async activate (){
     try
      {
     await AthenticationService.activate({
          temporaryToken: this.id
        })        
      }catch (error) {
        this.error = error.response.data.error
      }    
    }
  },
    mounted() {
     this.activate()
  }
}
    
</script>

<style scoped>
.error {
  color: red;
}
</style>
