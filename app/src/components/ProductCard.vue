<template>
    <v-col @click="viewProduct(product)"
        cols="11" v-if="product">
        <v-card class="elevation-0 lighten-5" :class="color">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="7" class=" pl-7">
                        <v-chip
                        class="mb-5 text-capitalize "
                        :color="color"
                        text-color="white"
                        >
                            {{product.productType}}
                        </v-chip>
                        <h1 class="text-capitalize grey--text text--darken-3">{{product.name}}</h1>
                        <!-- <p class="caption">THC 4.0 - 10.0%</p> -->

                        <span class="d-flex mt-7">
                            <h2 class="green--text">GHc {{product.price}}</h2> 
                            /{{product.unit}}
                        </span>
                    </v-col>
                    <v-col cols="5">
                        <v-img aspect-ratio="1" width="100%" :src="product.img" class="full-width"/>
                    </v-col>
                </v-row>
            </v-card-text>
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