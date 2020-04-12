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
                Payment
            </v-stepper-step>
            <v-stepper-step :complete="step > 4" step="4">
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
                                    @click="step = 2"
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
                                    :disabled="!contact.displayName || !contact.phoneNumber || !contact.location.name"
                                    outlined
                                    @click="step = 3"
                                    color="primary" block>
                                    Next <v-icon right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </basic-info>
            </v-stepper-content>

            <!-- TODO -->
                <!-- Review Products, location and delivery Charges -->
            <!-- TODO -->

            <v-stepper-content class="pa-0" step="3">
                <payment>
                    <template slot-scope="{isNext, payment}">
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
            <v-stepper-content step="4">
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

export default {
    name: 'Checkout',
    components: {
        CheckoutList,
        BasicInfo,
        Payment
    },
    data() {
        return {
            step: 1,
            purchase: {}
        }
    },
    methods: {
        setPayment(payment){
            this.purchase.payment = payment
            this.$store.commit('basket/resetBasket')
            this.step = 4
        }
    },
}
</script>