<template>
 <v-container  mt-0>
     <v-layout justify-center>
       <v-flex xs12 sm8 md4> 
          <div class="error" v-html="error" />
         <v-card class="elevation-12">
             <v-toolbar dark color="primary">
                <v-toolbar-title>Reset Password</v-toolbar-title>
             </v-toolbar>
           <v-card-text>             
              <v-form  ref="form">
                  <v-text-field
                   name="newPassword" 
                   type="password"
                   v-model="newPassword"              
                   label="New Password"                                   
                   prepend-icon="lock"
                   :rules="[rules.required, rules.password]">
                </v-text-field>
               <v-text-field
                   name="confirmPassword" 
                   v-model="confirmPassword"
                   type="password"                 
                   label="Confirm Password" 
                   prepend-icon="lock"
                   :rules="[rules.required, comparePasswords]">
                </v-text-field>
             </v-form>
           </v-card-text>          
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  @click="resetPassword"
                  color="primary">Reset Password</v-btn>
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
          id: this.$route.params.id,
          newPassword: '',
          confirmedPassword: '',
          error: null,
          rules: {
             required: value => !!value || 'Required.',
             password: value => {
               const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
               return pattern.test(value) || 'Minimum eight characters, at least one letter and one number.'
           }
         }
    }
  },
  methods:{
   
    async resetPassword (){
    if(this.$refs.form.validate()){
      try
      {
          await AthenticationService.resetPassword({
             resetToken: this.id,
             newPassword: this.newPassword           
         })
      }catch (error) {
        this.error = error.response.data.error
      }    
    }
   } 
  },
   computed : {
    comparePasswords () {
      return this.newPassword !== this.confirmPassword && this.confirmPassword ? 'Passwords do not match' : true
    }
  }

}
</script>

<style scoped>
.error {
  color: red;
}
</style>
  