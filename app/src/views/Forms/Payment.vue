<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="3">
                    <v-avatar
                        size="72"
                        color="primary"
                    >
                        <v-icon  size="32">mdi-cash</v-icon>
                    </v-avatar>
                </v-col>

                <v-col cols="9">
                    <h3 class="headline mb-0">Payment Options</h3>
                    <div class=" subtitle-1">Select one of the payment options below to continue</div>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <div v-if="!isNext">
                <div>
                    <v-btn disabled block outlined color="primary" class="mb-5"><v-icon left>mdi-cellphone</v-icon> Mobile money</v-btn>
                    <v-btn disabled block outlined color="warning" class="mb-5"><v-icon left>mdi-credit-card-outline</v-icon> Credit Card</v-btn>
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
            </div>
        </v-card-text>
        <v-card-actions>
            <slot :payment="paymentOptions" :isNext="isNext"></slot>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "Payment",
    data() {
        return {
            paymentOptions:{},
            isNext: false
        }
    },
    methods: {
        setOnDelivery(){
            this.paymentOptions = {
                method: 'on_delivery',
                name: 'On delivery'
            }
            this.isNext = true
        },
        resetOnDelivery(){
            this.paymentOptions = {}
            this.isNext = false
        }
    },
}
</script>