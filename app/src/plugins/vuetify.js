import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#4CAF50',
            secondary: '#00A9FF',
            accent: '#FF4F6D',
          },
        },
      },
});
