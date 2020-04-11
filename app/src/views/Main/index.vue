<template>
    <div>
        <v-toolbar flat height="72">
            <h2 class="primary--text">WeeStoned</h2>
            <v-spacer></v-spacer>
            <v-badge
                color="info"
                overlap
                class="mr-7"
            >
                <!-- <v-btn icon  color="info" dense> -->
                    <v-icon color="info">mdi-bell-outline</v-icon>
                <!-- </v-btn> -->
            </v-badge>
            <v-menu v-model="showBasketMenu" min-width="320" offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                    <v-badge
                        :content="basketCount"
                        :value="basketCount"
                        class="mr-3"
                        color="success"
                        overlap
                    >
                        <v-icon v-on="on" color="success">mdi-basket-outline</v-icon> 
                    </v-badge>
                </template>
                <checkout-list 
                    closeable
                    :max="3"
                >
                    <template slot="header">
                        Your Basket
                        <v-spacer></v-spacer>
                        <v-btn icon @click="showBasketMenu = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                    <template slot-scope="{ basketCount }">
                        <v-btn 
                            @click="showBasketMenu = false"
                            :to="{name: 'checkout'}" 
                            :disabled="basketCount < 1" 
                            color="primary" block>
                            <v-icon left>mdi-basket</v-icon> checkout
                        </v-btn>
                    </template>
                </checkout-list>
            </v-menu>
        </v-toolbar>
        <v-content class="routes">
            <v-col class=" fill-height">
                <v-alert color="info" text icon="mdi-information" dismissible>
                    App still under construction
                </v-alert>
                <v-row 
                v-if="!show_routes"
                align="center" 
                justify="center" 
                class="fill-height">
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </v-row>
                <v-row
                v-if="show_routes && error"
                align="center" 
                justify="center" 
                class="fill-height">
                    <v-col cols="11" class=" text-center">
                        <v-icon size="124">mdi-emoticon-sad-outline</v-icon>
                        <p class=" headline grey--text">Opps, Something went really wrong somewhere</p>
                        <v-btn @click="$forceUpdate" block color="info" rounded>Refresh?</v-btn>
                    </v-col>
                </v-row>
                <router-view v-if="show_routes && !error"></router-view>
            </v-col>
        </v-content>
        <v-toolbar flat height="72">
            <v-row justify="space-around" class="fixed-bottom">
                <v-btn @click="goTo('home')" :disabled="disable_nav" icon :color="isNav('home')">
                    <v-icon>mdi-home-outline</v-icon>
                </v-btn>
                <v-btn :disabled="disable_nav" icon color=""><v-icon>mdi-magnify</v-icon></v-btn>
                <v-btn :disabled="disable_nav" icon color=""><v-icon>mdi-star-outline</v-icon> </v-btn>                
                <v-btn 
                    v-if="user && user.brand"
                    @click="goTo('brand-dashboard')" 
                    :disabled="disable_nav" 
                    icon :color="isNav('brand')">
                        <v-icon>mdi-view-dashboard-outline</v-icon> 
                    </v-btn>                
                <v-btn 
                    v-if="user.id"
                    @click="goTo('account-main')" 
                    :disabled="disable_nav" 
                    icon :color="isNav('account')">
                    <v-icon>mdi-account-outline</v-icon>
                </v-btn>
                <v-btn v-else @click="goTo('sign_in')"
                    :disabled="disable_nav"
                    icon color=""><v-icon>mdi-lock-outline</v-icon> </v-btn>
            </v-row>
        </v-toolbar>
    </div>
</template>
<script>
import Crud from '../../graphql/Crud.gql'
const User = new Crud('user')
import CheckoutList from '../../components/CartList'
import {mapGetters} from 'vuex'
export default {
    name: 'AppEntry',
    components:{
        CheckoutList
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser', 
            basketCount: 'basket/getProductsCount',
            basket: 'basket/getProducts'
        }),
        miniBasket(){
            return this.basket.filter((item, index)=>{
                if(index < 3) return true
            })
        },

        basketTotal(){
            let total = 0
            
            this.basket.forEach(item=>{
                total += item.quantity * item.product.price
            })

            return total
        }
    },
    data() {
        return {
            show_routes: false,
            error: false,
            disable_nav: false,
            showBasketMenu: false
        }
    },
    methods: {
        removeBasketItem(index){
            this.$store.commit('basket/removeProduct', index)
        },
        
        isNav(parent){
            return this.$route.matched.some(({name})=>{
                return name === parent
            }) ? 'primary' : null
        },
        goTo(name){
            this.$router.push({name})
        }
    },
    mounted() {
        this.$root.$on('disable-nav', bool=>{
            this.disable_nav = bool
        })
        
        this.$firebase.auth().onAuthStateChanged(user=>{
        if(!user){
            // this.$router.push({name: 'sign_in'})
            this.$store.commit('auth/setUser', {})
            this.show_routes = true
        }else{
            let node = `{
                id
                email
                displayName
                firebase_id
                photoURL
                phoneNumber
                purchases(
                    where:{
                            status_not: "completed"
                        }
                    ) {
                    id
                }
                brand {
                    id
                }
            }`
            User.findOne(node, {
                where: {firebase_id : user.uid}
            }).then(res=>{
                if(!res)
                    this.$router.push({name: 'new-user'})
                else{
                    this.$store.commit('auth/setUser', res)
                    User.subscribeToMore(node, {
                        where: {firebase_id : user.uid}
                    }, snapshot=>{
                        console.log({snapshot})
                        if(snapshot.mutation == 'created')
                            this.$store.commit('auth/setUser', snapshot.node)
                    }, ()=>{
                        this.error = true
                    })
                }
            }).catch(err=>{
                this.disable_nav = false
                this.error = true
                console.error(err)
            }).finally(_=>{
                this.show_routes = true
            })
        }
        })
    },
}
</script>
<style scoped>
    .fixed-bottom{
        /* position: fixed; */
        /* bottom: 0; */
        height: 72px;
    }

    .fixed-top{
        /* padding-top: 7px; */
        /* box-shadow: 0px 7px 7px #ffffff; */
        height: 72px;
        /* position: fixed; */
        /* top: 0; */
        /* width: 100%; */
    }

    .routes{
        content: " ";
        width: 100vw;
        height: calc(100vh - 144px);
        overflow-y: scroll;
    }
</style>