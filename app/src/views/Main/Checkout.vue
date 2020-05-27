<template>
    <v-stepper v-model="step" value="1">
        <v-stepper-header>
            <v-stepper-step
                :complete="step > 1" step="1">
                Products Review
            </v-stepper-step>
            <v-stepper-step :complete="step > 2" step="2">
                Details
            </v-stepper-step>
            <v-stepper-step :complete="step > 3" step="3">
                Review
            </v-stepper-step>
            <v-stepper-step :complete="step > 4" step="4">
                Payment
            </v-stepper-step>
            <v-stepper-step :complete="step > 5" step="5">
                Complete
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content class="pa-0" step="1">
                <checkout-list showDelivery>
                    <template slot-scope="{basketCount, basketTotal}">
                        <v-row justify="end">
                            <v-col cols="6">
                                <v-btn 
                                    outlined
                                    @click="gotToDetails(basketTotal)"
                                    :disabled="basketCount < 1" 
                                    color="primary" block>
                                    Next <v-icon right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </checkout-list>
            </v-stepper-content>
        
            <v-stepper-content class="pa-0" step="2">
                <basic-info>
                    <template slot-scope="{ contact }">
                        <v-row justify="end">
                            <v-col cols="6">
                                <v-btn 
                                    outlined
                                    @click="step = 1"
                                    color="grey" dark block>
                                    <v-icon left>mdi-arrow-left</v-icon>
                                    Back 
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn
                                    :disabled="!contact.displayName || !contact.phoneNumber || !contact.location.address"
                                    outlined
                                    @click="setBasicInfo(contact)"
                                    color="primary" block>
                                    Next <v-icon right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </basic-info>
            </v-stepper-content>
            
            <v-stepper-content class="pa-0" step="3">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Delivery Options</div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item outlined class="grey">
                                <v-list-item-icon>
                                    <v-icon class="white--text">mdi-warehouse</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content >
                                    <v-list-item-title class="white--text">
                                        <h2>Self Pickup</h2>
                                    </v-list-item-title >
                                    <v-list-item-subtitle class="white--text">
                                        <h3>No charges</h3>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item outlined class="grey mt-3">
                                <v-list-item-icon>
                                    <v-icon class="white--text">mdi-bike-fast</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content >
                                    <v-list-item-title class="white--text">
                                        <h2>Same Day Delivery</h2>
                                    </v-list-item-title >
                                    <v-list-item-subtitle class="white--text">
                                        <h3>{{ 10 | currency}}</h3>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item outlined @click="setDeliveryFee(7)" class="secondary mt-3">
                                <v-list-item-icon>
                                    <v-icon class="white--text">mdi-truck-delivery</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content >
                                    <v-list-item-title class="white--text">
                                        <h2>Scheduled Delivery</h2>
                                    </v-list-item-title >
                                    <v-list-item-subtitle class="white--text">
                                        <h3>{{ 7 | currency}}</h3>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            @click="step =2"
                            outlined
                            color="grey" 
                            dark 
                            block>
                                back
                            </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>

            

            <v-stepper-content class="pa-0" step="4">
                <payment :cost="totalCost">
                    <template slot-scope="{isNext, payment,}">
                        <v-row>
                            <v-col cols="6">
                                <v-btn 
                                    outlined
                                    @click="step = 3"
                                    color="grey" dark block>
                                    <v-icon left>mdi-arrow-left</v-icon>
                                    Back 
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn
                                    :disabled="!isNext"
                                    outlined
                                    @click="setPayment(payment)"
                                    color="primary" block>
                                    Next <v-icon right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </payment>
            </v-stepper-content>
            
            <v-stepper-content step="5">
                <v-card>
                    <v-card-text class=" text-center">
                        <v-avatar color="primary" class="mb-5" size="124">
                            <v-icon dark size="72">mdi-check-circle</v-icon>
                        </v-avatar>
                        <h3>Purchase made successfully</h3>
                        <p>You would get a notification when your delivery arrives</p>
                        <p class="info--text"><v-icon color="info" left>mdi-information</v-icon>This is a running test</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="{name: 'home'}" block color="primary" outlined>Back to store</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<script>
import CheckoutList from '../../components/CartList'
import BasicInfo from '../Forms/BasicInfo'
import Payment from '../Forms/Payment'

import {mapGetters} from 'vuex'
export default {
    name: 'Checkout',
    components: {
        CheckoutList,
        BasicInfo,
        Payment
    },
    computed: {
        ...mapGetters({
            basket: 'basket/getProducts'
        }),
        totalCost(){
            let total = 0
            
            this.basket.forEach(item=>{
                total += item.quantity * item.product.price
            })

            total += this.deliveryFee
            console.log(total)
            return total
        }
    },
    data() {
        return {
            step: 5,
            deliveryFee: 0,
            purchase: {
                status: 'PENDING',
                requests: {
                    // product & quantity
                },
                transaction: {
                    // method, amount, status
                },
                location: {
                    // lat & lng
                },
                user: {
                    connect: this.$store.getters['auth/getID']
                }, // id
            }
        }
    },
    methods: {
        setDeliveryFee(amount){
            this.deliveryFee = amount
            this.step = 4
        },
        setBasicInfo(contact){
            this.purchase.location = contact.location
            this.step = 3
        },
        setPayment(payment){
            this.purchase.transaction = payment
            console.log(JSON.stringify(this.purchase, null, 2))
            //TODO make purchases request
            this.$store.commit('basket/resetBasket')
            this.step = 5
        },
        gotToDetails(basketTotal){
            this.purchase.requests.create = this.basket.map(item=>{
                return { product: {connect: {id: item.product.id}}, quantity: parseInt(item.quantity)}
            })
            console.log(this.purchase)
            this.step = 2
        }
    }
}
</script>