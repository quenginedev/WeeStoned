<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    setDarkMode(){
      let format = 'hh:mm:ss'
      let now = this.$moment()
      let before = this.$moment('18:00:00', format)
      let after = this.$moment('6:00:00', format).add(1, 'days')
      if(now > before || now < after){
        console.log('isDark', before, after, now)
        this.$vuetify.theme.dark = true    
      }else{
        console.log('notDark', before, after, now)
        this.$vuetify.theme.dark = false    
      }
    }
  },
  created() {
      this.setDarkMode()
  },
};
</script>
<style>
  .card-rounded {
    border-radius: 32px !important;
  }
</style>