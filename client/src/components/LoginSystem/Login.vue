<template>
  <v-container  mt-0>
     <v-layout justify-center>
       <v-flex xs12 sm8 md4>
          <div class="error" v-html="error" />
         <v-card class="elevation-12">
             <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
             </v-toolbar>
           <v-card-text>             
              <v-form>
                  <v-text-field                 
                  v-model="email"                 
                  label="E-mail"               
                  required
                  prepend-icon="email">
                </v-text-field>
                  <v-text-field                 
                   name="password" 
                   type="password"                   
                   v-model="password"              
                   label="Password"                                   
                   prepend-icon="lock">
                </v-text-field>
              </v-form>
           </v-card-text>          
            <v-card-actions>
              <a href="#" 
               @click="navigateTo({name: 'ForgetPassword'})"
                color="primary">Forget Password
              </a>               
                <v-spacer></v-spacer>
                <v-btn 
                  @click="login"
                  color="primary">Login</v-btn>
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
      password: '',
      error: null
    }
  },
  methods:{   
    async login (){
      try
      {
        const response = await AthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
        name: 'conversation'
      })
      }catch (error) {
        this.error = error.response.data.error
      }    
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
  