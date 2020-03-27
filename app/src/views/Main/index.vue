<template>
    <v-content class="pt-7 pb-12">
        <v-col cols="10" >
            <v-row justify="center" class="fixed-top" align="center">                
                <v-col cols="11" >
                    <v-row justify="space-between" align="center">
                        <h2 class="primary--text">WeeStoned</h2>
                        <v-spacer></v-spacer>
                        <v-badge
                            color="info"
                            overlap
                            class="mr-3"
                        >
                            <v-btn icon  color="info" dense> <v-icon>mdi-bell-outline</v-icon> </v-btn>
                        </v-badge>
                        <v-badge
                            content="4"
                            color="success"
                            overlap
                        >
                            <v-btn icon color="success" dense> <v-icon>mdi-basket-outline</v-icon> </v-btn>
                        </v-badge>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <router-view v-if="show_routes" class=" my-3"></router-view>
        </v-col>
        <v-row justify="center" class="fixed-bottom">
            <v-col cols="11">
                <v-row justify="space-around" class="">
                    <v-btn rounded color="primary"><v-icon left>mdi-home-outline</v-icon>Home</v-btn>
                    <v-btn icon color="primary"><v-icon>mdi-magnify</v-icon> </v-btn>
                    <v-btn icon color="primary"><v-icon>mdi-menu</v-icon> </v-btn>
                    <v-btn icon color="primary"><v-icon>mdi-tune</v-icon> </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-content>
</template>
<script>
export default {
    name: 'AppEntry',
    data() {
        return {
            show_routes: false
        }
    },
    created() {
        this.$firebase.auth().onAuthStateChanged(user=>{
        if(!user){
            this.$router.push({name: 'sign_in'})
        }else{
            this.show_routes = true
        }
        })
    },
}
</script>
<style scoped>
    .fixed-bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
    }

    .fixed-top{
        padding-top: 7px;
        /* box-shadow: 0px 7px 7px #ffffff; */
        z-index: 2;
        position: fixed;
        top: 0;
        width: 100%;
        background: #fff;
    }
</style>