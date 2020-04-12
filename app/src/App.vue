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
      let nextDawn = this.$moment('6:00:00', format).add(1, 'days')
      let dawn = this.$moment('6:00:00', format)
      let midnight = this.$moment('00:00:00', format)

      if(now.isBetween(evening, nextDawn) || now.isBetween(midnight, dawn)){
        this.$vuetify.theme.dark = true    
      }else{
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