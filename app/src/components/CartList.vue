<template>
    <v-card outlined>
        <v-card-title class=" primary--text">
            <slot name="header"></slot>
        </v-card-title>
        <v-list>
            <cart-list-item @remove="removeBasketItem" v-for="(item, index) in miniBasket" :item="item" :key="index">
            </cart-list-item>
        </v-list>
        <v-alert v-if="basketCount > 0 && showDelivery" text color="primary" icon="mdi-cash">
            <span>Total</span>
            <v-spacer></v-spacer>
            <h3>{{basketTotal | currency}}</h3>
        </v-alert>
        <v-alert v-if="basketCount < 1" text color="dark" icon="mdi-emoticon-sad">
            Empty Basket
        </v-alert>
        <v-card-actions>
            <slot :basketCount="basketCount"></slot>
        </v-card-actions>
    </v-card>
</template>
<script>
import {mapGetters} from 'vuex'
import CartListItem from '../components/CartListItem'
export default {
    name: "CartList",
    components:{ CartListItem },
    props: {
        max: {type: Number, default: ()=>undefined},
        closeable: {type: Boolean, default: ()=>false},
        showDelivery: {type: Boolean, default: false}
    },
    computed: {
        ...mapGetters({
            basketCount: 'basket/getProductsCount',
            basket: 'basket/getProducts'
        }),
        miniBasket(){
            if(this.max)
                return this.basket.filter((item, index)=>{
                    if(index < this.max) return true
                })
            else
                return this.basket
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
            showBasketMenu: false,
            delivery: true,
            deliveryCharge: 7,
        }
    },
    methods: {
        removeBasketItem(index){
            this.$store.commit('basket/removeProduct', index)
        },
        
    },
}
</script>