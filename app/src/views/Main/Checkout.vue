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
                Purchase Review
            </v-stepper-step>
            <v-stepper-step :complete="step > 5" step="5">
                Complete
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content class="pa-0" step="1">
                <checkout-list>
                    <template slot-scope="{basketCount}">
                        <v-row justify="end">
                            <v-col cols="6">
                                <v-btn 
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
        </v-stepper-items>

        <v-stepper-items>
            <v-stepper-content class="pa-0" step="2">
                <basic-info>
                    <v-row justify="end">
                        <v-col cols="6">
                            <v-btn 
                                @click="step = 1"
                                color="grey" dark block>
                                <v-icon left>mdi-arrow-left</v-icon>
                                Back 
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn 
                                @click="step = 2"
                                color="primary" block>
                                Next <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </basic-info>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<script>
import CheckoutList from '../../components/CartList'
import BasicInfo from '../Forms/BasicInfo'

export default {
    name: 'Checkout',
    components: {
        CheckoutList,
        BasicInfo
    },
    data() {
        return {
            step: 2
        }
    },
}
</script>