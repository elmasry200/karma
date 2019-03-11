<template>
  <v-layout row mt-5>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="primary" dark>
         
          <v-toolbar-title>Course {{language}}</v-toolbar-title>
    
        
        </v-toolbar>
        <v-list two-line>
          <template v-for="(level, index) in levels">
            <v-list-tile :key="index" avatar ripple class="x">
              <v-list-tile-content>
                <v-list-tile-title class="headline">{{ level.title }}</v-list-tile-title>
                <div>{{ level.subject }}</div>
               
              </v-list-tile-content>
              <v-list-tile-action>
               
              
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < levels.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import levelsObject from '@/levels.js'
  export default {
     
    data () {
      return {
        levelsObject
  
      }
    },
    computed: {
      language: function () {
        return this.$store.state.user.language
      },
       levels: function () {  
         console.log(this.levelsObject[this.language])       
         return this.levelsObject[this.language]
      }   
    },
    methods: {
     /* mounted () {
        this.levels = this.levelsObject[this.language]
        return this.levels
      }*/
    }
  }
</script>
<style scoped>
.content {
  margin-bottom: 15px
}
.x:hover { 
border-left: 10px solid red;
opacity: 0.5;
}
</style>
