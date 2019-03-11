<template>
<v-app>
   <v-navigation-drawer  v-model="sideNav" right  absolute z-index=-1>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon large>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
   </v-navigation-drawer>
   <v-toolbar fixed app class="deep-orange" dark>  
      <v-toolbar-title class="white--text">Karma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>        
      </v-toolbar-items>
   </v-toolbar>
   </v-app>
</template>
<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'account_box', title: 'Profile'},
        { icon: 'face', title: 'Sign up'},
        { icon: 'lock_open', title: 'Sign in'}
      ]
    }
  }
}
</script>
