<template>
   <v-container  mt-5>
     <v-layout justify-center>
       <v-flex xs12 sm8 md4>
         <v-card> 
         
          <ul>
            
            <vue-slide-up-down v-for="task in tasks" :key="task.index" class="wobbly-accordeon" :active="true" :duration="10000">              
              <li class="x">
                  <v-layout row wrap align-center justify-center>
                    <v-flex>
                        <v-img :src= task.imageurl
                            hieght=100px
                            width=111px
                            contain>
                        </v-img>
                    </v-flex>
                    <v-flex>
                        <v-card-text>
                            <a href="#">  {{ task.title }} </a>
                        </v-card-text>  
                    </v-flex>  
                    <v-flex>
                           <v-icon large>play_circle_filled</v-icon>
                    </v-flex>
                </v-layout>    
              </li>           
            </vue-slide-up-down>
           
        </ul>  
        </v-card>  
       </v-flex>
     </v-layout>
   </v-container>
</template>
<<script>

    export default {
        data () {
         return {
            tasks: [
                    { imageurl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/gallardo-0629.jpg',title: 'Clean my room' },
                    { imageurl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/gallardo-0629.jpg',title: 'Go to the grocery' },
                    { imageurl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/gallardo-0629.jpg',title: 'meeting with JP' },
                    { imageurl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/gallardo-0629.jpg',title: 'Go to the dentist' }
                ]
                
        }
       
        }
       
        
       }  
    
</script>
<style scoped>
.x {
  /* width: 700px;  
   height: 150px;   */
   color:purple;
   border:3px solid #73AD21;
   margin: auto;
   margin-bottom: 10px;
   text-align: center;   
}
ul{
    list-style-type: none;    
    padding: 0;
}
</style>
