<template>
    <v-col @click="viewProduct(product)"
        cols="11" v-if="product">
        <v-card outlined >
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" class="ma-0 pb-0">
                        <v-row class="px-5 " justify="space-between">
                            <v-chip
                                class="mb-5 text-capitalize "
                                :color="color"
                                text-color="white"
                                >
                                    {{product.productType.name}}
                            </v-chip>
                            <p class="">
                                <v-icon color="primary">mdi-cannabis</v-icon>
                                    {{product.brand.name}}
                                <v-icon color="primary">mdi-cannabis</v-icon>
                            </p>
                        </v-row>
                    </v-col>
                    <v-col cols="7" class=" pl-7">
                        <h1 class="text-capitalize grey--text ">{{product.name}}</h1>
                        <!-- <p class="caption">THC 4.0 - 10.0%</p> --> 
                        <span class="d-flex mt-7 ">
                            <h2 class="green--text"> {{product.price | currency}} </h2> 
                            / {{product.productType.unit.name}}
                        </span>
                    </v-col>
                    <v-col cols="5">
                        <v-avatar size="132" color="primary" class="elevation-7" >
                            <v-img aspect-ratio="1" width="100%" v-if="product.img" :src="product.img" class="full-width"/>
                            <v-icon v-else size="72">mdi-tag</v-icon>
                        </v-avatar>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn block color="primary" outlined><v-icon left>mdi-basket</v-icon> add to cart</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>
<script>
export default {
    props: ['product', 'color'],
    methods: {
        viewProduct(product){
            
        }
    },
}
</script>