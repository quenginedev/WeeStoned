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
                    <template slot-scope="{basketCount}">
                        <v-row justify="end">
                            <v-col cols="6">
                                <v-btn 
                                    outlined
                                    @click="gotToDetails"
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
                            <div class="headline">Review</div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-icon left>mdi-account</v-icon>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text>text</v-btn>
                        <v-btn text color="primary">text</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>

            

            <v-stepper-content class="pa-0" step="4">
                <payment>
                    <template slot-scope="{isNext, payment,}">
                        <v-row>
                            <v-col cols="6">
                                <v-btn 
                                    outlined
                                    @click="step = 2"
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
    },
    data() {
        return {
            step: 1,
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
        setBasicInfo(contact){
            this.purchase.location = contact.location
            this.step = 4
        },
        setPayment(payment){
            this.purchase.transaction = payment
            console.log(JSON.stringify(this.purchase, null, 2))
            //TODO make purchases request
            this.$store.commit('basket/resetBasket')
            this.step = 5
        },
        gotToDetails(){
            this.purchase.requests.create = this.basket.map(item=>{
                return { product: {connect: {id: item.product.id}}, quantity: parseInt(item.quantity)}
            })
            console.log(this.purchase)
            this.step = 2
        }
    }
}
</script>