<template>
    <v-col>
        <v-row justify="space-around">
            <v-col cols="12">
                <v-card outlined>
                    <v-card-title>
                        <h2 class="display-1">
                            <v-icon left color="primary">mdi-tag</v-icon> {{productNumber}} Products
                        </h2>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn outlined :to="{name: 'brand-products'}" color="primary" block>Manage Products</v-btn>
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
            productNumber: 0,
            user: this.$store.getters['auth/getUser']
        }
    },
    methods: {
        getProductsNumber(){
            this.$crud.product.aggregate({
                where: {
                    brand: {id: this.user.brand.id}
                }
            })
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