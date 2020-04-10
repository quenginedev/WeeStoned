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
      let start = this.$moment('00:00:00', format)

      if(now.isBetween(before, after) || now < start){
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