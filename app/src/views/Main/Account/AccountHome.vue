<template>
  <div>
    <v-list>
      <v-list-item link>
        <v-list-item-avatar size="54" color="primary" class=" elevation-3" v-ripple>
            <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
            <v-icon v-else size="32" color="white">mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">{{user.displayName}}</v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-icon color="warning">mdi-pencil</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group color="primary">
        <v-list-item
            :to="{name: 'new-brand'}"
            v-if="!user.brand" 
            color="primary" 
        >
            <v-list-item-icon>
                <v-icon>mdi-domain-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Create Brand</v-list-item-title>
                <v-list-item-subtitle>Sell and distribute your products</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon >mdi-information</v-icon>
            </v-list-item-action>
        </v-list-item>


        <v-list-item
            :to="{name: 'brand-dashboard'}"
            v-else 
            color="primary" 
        >
            <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Manage Brand</v-list-item-title>
                <v-list-item-subtitle>Products, Purchases, etc</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
            color="primary" 
        >
            <v-list-item-icon>
                <v-icon>mdi-basket</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Purchases</v-list-item-title>
                <v-list-item-subtitle>View all products you've purchased and their statuses</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>


        <v-list-item
            @click="changeDarkMode"
        >
            <v-list-item-icon>
                <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Dark Mode</v-list-item-title>
                <v-list-item-subtitle>Toggle between light and dark mode</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-switch
                    v-model="darkMode"
                ></v-switch>            
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item 
            color="warning" 
            @click="logout"
            >
            <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Account',
    computed: {
        ...mapGetters({user: "auth/getUser"})
    },
    data() {
        return {
            darkMode: this.$vuetify.theme.dark
        }
    },
    methods: {
        logout(){
            this.$firebase.auth().signOut()
            console.log(this.$firebase.auth().currentUser)
        },
        changeDarkMode(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            this.darkMode = this.$vuetify.theme.dark
        }
    },
}
</script>