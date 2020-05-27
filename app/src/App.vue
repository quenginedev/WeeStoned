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
      let evening = this.$moment('18:00:00', format)
      // let endOfDay = this.$moment('23:59:59', format)
      let dawn = this.$moment('6:00:00', format)
      // let midnight = this.$moment('00:00:00', format)

      if(now.isBetween(dawn, evening)){
        this.$vuetify.theme.dark = false    
      }else{
        this.$vuetify.theme.dark = true    
      }
    }
  },
  mounted() {
      this.setDarkMode()
  },
};
</script>
<style>
  .card-rounded {
    border-radius: 32px !important;
  }
</style>