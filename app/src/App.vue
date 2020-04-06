<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created() {
      this.$vuetify.theme.dark = false
  },
};
</script>
<style>
  .card-rounded {
    border-radius: 32px !important;
  }
</style>