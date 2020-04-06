<template>
    <v-row justify="center" align="center">
        <v-col cols="10">
            <v-snackbar
                v-model="showError"
                color="red"
                top
            >
                <v-icon>mdi-alert</v-icon>{{ error }}
                <v-btn
                    color="white"
                    icon
                    text
                    @click="showError = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-snackbar>
        </v-col>
        <v-col cols="10">
            <!-- <v-card class="card-rounded"> -->
                <v-card-title>
                    <v-row justify="center">
                        <v-icon size="172" color="primary">mdi-cannabis</v-icon>
                        <h3 class="primary--text">WeeStoning Pass</h3>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-btn 
                            @click="googleSignIn" 
                            block 
                            :loading="googleLoader"
                            color="red lighten-1" 
                            class="my-7 white--text">
                            <v-icon left>mdi-google</v-icon> Google
                        </v-btn>
                        <v-btn disabled block color="blue" class="white--text">
                            <v-icon left>mdi-apple</v-icon> Apple
                        </v-btn>
                    </v-form>
                </v-card-text>
                
                <v-card-actions class="text-center">
                    <p>By signing in you agree to the <router-link to="#">Terms and Conditions</router-link> of WeeStoned &copy;</p>
                </v-card-actions>
            <!-- </v-card> -->
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "SignIn",
    data(){
        return {
            error: '',
            showError: false,
            googleLoader: false,
        }
    },
    methods: {
        googleSignIn(){
            let query = this.$route.query
            this.googleLoader = true
            let provider = new this.$firebase.auth.GoogleAuthProvider()
            this.$firebase.auth().signInWithPopup(provider)
                .then(credentials=>{
                    console.log({credentials})
                    if(query.to)
                        this.$router.push(query.to)
                    else
                        this.$router.push({name: 'home'})
                }).catch(error=>{
                    this.error = error.message
                    this.showError = true
                }).finally(_=>{
                    this.googleLoader = false
                })
        }
    },
}
</script>