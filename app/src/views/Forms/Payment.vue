<template>
    <v-card>
        <v-card-title>
            <v-row align="center">
<!--                <v-col cols="3">-->
<!--                    <v-avatar-->
<!--                        size="72"-->
<!--                        color="primary"-->
<!--                    >-->
<!--                    </v-avatar>-->
<!--                </v-col>-->

                <v-col cols="9">
                    <h3 class="headline mb-0">
                        Total
                        <span class="primary--text">{{cost | currency}}</span></h3>
                    <!-- <div class=" subtitle-1">Select one of the payment options below to continue</div> -->
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <div v-if="!isNext">
                <div>
<!--                    <v-btn disabled block outlined color="primary" class="mb-5"><v-icon left>mdi-cellphone</v-icon> Mobile money</v-btn>-->
                    <paystack
                            class="col-12 pa-0"
                            :amount="cost*100"
                            :email="user.email"
                            paystackkey="pk_test_45c3f65494e4890333b2d065262dd7a65948f243"
                            :reference="Date.now().toString()"
                            :callback="paymentSuccess"
                            :close="closePaystack"
                            currency="GHS"
                    >
                        <v-btn block outlined color="warning" class="mb-5"><v-icon left>mdi-credit-card-outline</v-icon> Payment</v-btn>
                    </paystack>
                    <v-btn @click="setOnDelivery" block outlined color="secondary" ><v-icon left>mdi-account-cash</v-icon> pay on delivery</v-btn>
                </div>
            </div>
            <div v-else>
                <!-- <v-btn block outlined color="primary" class="mb-5"><v-icon left>mdi-cellphone</v-icon> Mobile money</v-btn> -->
                <!-- <v-btn block outlined color="warning" class="mb-5"><v-icon left>mdi-credit-card-outline</v-icon> Credit Card</v-btn> -->
                <template  v-if="paymentOptions.method == 'on_delivery'">
                    <v-row>
                        <v-col cols="9">
                            <v-btn 
                                block 
                                outlined 
                                color="secondary" >
                                    <v-icon left>mdi-check-outline</v-icon> 
                                    pay on delivery
                            </v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn 
                                @click="resetOnDelivery"
                                block 
                                outlined 
                                color="warning" >
                                    <v-icon>mdi-sync</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>
                <div v-if="paymentOptions.method == 'paystack'" class="text-center primary--text">
                    <h1>
                        Payment Successful
                    </h1>
                </div>
            </div>
        </v-card-text>
        <v-card-actions>
            <slot :payment="paymentOptions" type="" :isNext="isNext"></slot>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "Payment",
    props:{
        cost: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            paymentOptions:{},
            type: '',
            isNext: false,
            user: this.$store.getters["auth/getUser"]
        }
    },
    methods: {
        setOnDelivery(){
            this.type = 'On delivery'
            this.paymentOptions = {
                method: 'on_delivery',
                status: 'PENDING', //FAILED, SUCCESS
                amount: this.cost
            }
            this.isNext = true
        },
        resetOnDelivery(){
            this.paymentOptions = {}
            this.isNext = false
        },

        setPaystack(){
            this.type = 'Payment'
            this.paymentOptions = {
                method: 'paystack',
                status: 'PENDING',
                amount: this.cost
            }
            this.isNext = true
        },
        closePaystack(e){
            console.log('closed', e)
        },
        paymentSuccess(e){
            this.paymentOptions = {
                method: 'paystack',
                status: 'SUCCESS',
                amount: this.cost
            }
            this.isNext = true
            this.isNext = true
        }
    },
}
</script>