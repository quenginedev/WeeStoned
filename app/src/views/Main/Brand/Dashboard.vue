<template>
    <v-col>
        <v-row justify="space-around">
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        <h2 class="display-1">
                            <v-icon left color="primary">mdi-tag</v-icon> {{productNumber}} Products
                        </h2>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn :to="{name: 'brand-products'}" color="primary" block>Manage Products</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>    
    </v-col> 
</template>
<script>
export default {
    name: "BrandDash",
    data(){
        return {
            productNumber: 0
        }
    },
    methods: {
        getProductsNumber(){
            this.$crud.product.aggregate()
            .then(res=>{
                this.productNumber = res
            })
        }
    },
    created() {
        this.getProductsNumber()
    },
}
</script>