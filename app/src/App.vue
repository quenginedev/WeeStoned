<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    
  }),
};
</script>
<style>
  .card-rounded {
    border-radius: 32px !important;
  }
</style>