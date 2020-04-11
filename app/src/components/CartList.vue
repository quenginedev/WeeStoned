<template>
    <v-card outlined>
        <v-card-title class=" primary--text">
            <slot name="header"></slot>
        </v-card-title>
        <v-list>
            <v-list-item 
                v-for="(item, index) in miniBasket" :key="index" 
                >
                <v-list-item-avatar>
                    <v-img aspect-ratio="1" width="100%" v-if="item.product.img" :src="item.product.img" class="full-width"/>
                    <v-icon v-else size="72">mdi-tag</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class=" text-capitalize">
                        <span class="info--text">{{item.quantity}}</span> {{item.product.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="primary--text">
                        @ {{item.product.price | currency }} 
                        = {{item.quantity * item.product.price | currency}}
                    </v-list-item-subtitle>    
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn @click="removeBasketItem(index)" color="error" dense icon>
                        <v-icon >mdi-delete-outline</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-alert v-if="basketCount > 0" text color="primary" icon="mdi-cash">
            <span>Total</span>
            <v-spacer></v-spacer>
            <h3>{{basketTotal | currency}}</h3>
        </v-alert>
        <v-alert v-else text color="dark" icon="mdi-emoticon-sad">
            Empty Basket
        </v-alert>
        <v-card-actions>
            <slot :basketCount="basketCount"></slot>
        </v-card-actions>
    </v-card>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    props: {
        max: {type: Number, default: ()=>undefined},
        closeable: {type: Boolean, default: ()=>false}
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
            showBasketMenu: false
        }
    },
    methods: {
        removeBasketItem(index){
            this.$store.commit('basket/removeProduct', index)
        },
        
    },
}
</script>