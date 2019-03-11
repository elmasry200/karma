<template>
    <v-container  mt-0>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
             <div class="error" v-html="error" />
            <v-card width="600"  class="elevation-12">
              <v-toolbar :dense=true dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
            <v-card-text>             
              <v-form @submit.prevent="register" v-model="valid"> 
                <v-text-field                                 
                  v-model="email"               
                  label="E-mail"              
                  prepend-icon="email">
                </v-text-field>
                <v-layout row wrap>
                  <v-flex xs6>
                <v-text-field
                   name="password" 
                   type="password"                  
                   v-model="password"                                  
                   label="Password"                                   
                   prepend-icon="lock">
                </v-text-field>
                </v-flex>
                 <v-flex xs6>
                <v-text-field                   
                   name="confirmPassword" 
                   v-model="confirmPassword"  
                   type="password"                                    
                   label="Confirm Password" 
                   prepend-icon="lock">
                </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6>
                <v-text-field
                   v-model="firstName"  
                   label="First Name" 
                   type="text"
                   prepend-icon="person">                  
                </v-text-field>
                </v-flex>
                 <v-flex xs6>
                <v-text-field
                   v-model="lastName"  
                   label="Last Name"
                   type="text"
                   prepend-icon="person">                  
                </v-text-field>
                 </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-radio-group v-model="gender" label="Gender">                     
                          <v-radio label="Male" value="male" color="primary"></v-radio>  
                          <v-radio label="Female" value="female" color="primary"></v-radio>             
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs6>
                      <v-layout column wrap>
                          <v-select
                            v-model="birthYearSelected"
                            label="Birth Year"
                            :items = years>                            
                          </v-select>
                           <v-select
                            :items="items"
                            label="Language you want"
                            v-model="languageSelected">
                          </v-select>
                      </v-layout>    
                    </v-flex>
                </v-layout>
              </v-form>              
            </v-card-text> 
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  @click="register"
                  color="primary">Register</v-btn>
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
      valid: false,  
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      birthYearSelected: '',
      languageSelected: '',
      error: null,
      items: ['German', 'French', 'Italian', 'Greek','Russian','Spanish']
    }
  },
  methods:{   
     async register(){
  
      try
      {          
       await AthenticationService.register({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          firstName:this.firstName,
          lastName:this.lastName,
          gender: this.gender,
          birthYear: this.birthYearSelected,
          language: this.languageSelected
        })  
      }catch (error) {
        this.error = error.response.data.error
      } 
     
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
     return Array.from({length: year - 1900}, (value, index) => year - index) 
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}


 
</style>
  