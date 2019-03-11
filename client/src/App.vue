<template>
 <v-app id="inspire" style="background: #FFFFFF;">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      right
      temporary>
      <v-list dense>
        <v-list-tile router to="/register" v-if="!$store.state.isUserLoggedIn">
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/login" v-if="!$store.state.isUserLoggedIn">
          <v-list-tile-action>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color='primary' dark fixed app>    
      <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">Karma</router-link>  
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat router to="/register" v-if="!$store.state.isUserLoggedIn">
          <v-icon left dark>lock_open</v-icon>
          Sign Up
        </v-btn>
         <v-btn flat router to="/login" v-if="!$store.state.isUserLoggedIn">
          <v-icon left dark>vpn_key</v-icon>
          Sign In
        </v-btn>
        <v-btn flat router @click="logout" v-if="$store.state.isUserLoggedIn">
          <v-icon left dark>close</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
          <router-view></router-view>   
    </v-content>
    <v-footer color='primary' app absolute>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
</v-app>
</template>

<script>
// import Toolbar from './components/Toolbar'
export default {
  components: {
   // Toolbar
  },
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style>
 *{ 
   text-transform: none !important;
  }
</style>
