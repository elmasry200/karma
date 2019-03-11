<template>
 <v-container  mt-0>
     <v-layout justify-center>
       <v-flex xs12 sm8 md4>
         <div class="error" v-html="error" />
         <v-card class="elevation-12">
             <v-toolbar dark color="primary">
                <v-toolbar-title>Forget Password</v-toolbar-title>
             </v-toolbar>
           <v-card-text>             
              <v-form ref="form"> 
                <v-text-field 
                  v-model="email"
                  label="E-mail"
                  required
                  prepend-icon="email"
                  :rules="[rules.required, rules.email]">
                </v-text-field>
             </v-form>
           </v-card-text>          
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  @click="forgetPassword"
                  color="primary">Forget Password</v-btn>
            </v-card-actions>
         </v-card>
       </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AthenticationService from '@/services/AthenticationService'

export default {
 
  data () {
    return {
      email: '',
      error: null,
      rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
      } 
    }
  },
  methods:{
   
    async forgetPassword (){
    if(this.$refs.form.validate()){
      try
      {
        await AthenticationService.forgetPassword({
          email: this.email 
        })
      }catch (error) {
        this.error = error.response.data.error
      }    
     }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
  