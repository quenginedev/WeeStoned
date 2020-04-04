<template>
    <div>
        <!-- <v-row justify="center">
            <v-col cols="11" class="py-0 my-0">
                <v-text-field 
                    filled
                    rounded
                    dense
                    placeholder="Search"
                >
                    <v-icon slot="append">mdi-magnify</v-icon>
                </v-text-field>        
            </v-col>
        </v-row> -->
        <v-list v-scroll rounded class="mb-12">
            <v-list-item v-for="(item, index) in 7" :key="index">
                <v-list-item-avatar color="secondary">
                    <v-icon dark>mdi-tag</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Royal high</v-list-item-title> 
                    <v-list-item-subtitle>GHS <span class=" primary--text">30.00</span></v-list-item-subtitle> 
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-btn
            class="product-add-btn"
            color="primary"
            dark
            small
            fab
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>
<script>
import Crud from '../../../graphql/Crud.gql'
const Product = new Crud('product')

export default {
    name: 'BrandProducts',
    data() {
        return {
            isEmpty: false,
            products: [],
            isLoading: true
        }
    },
    created() {
    },
}
</script>
<style scoped>
    .product-add-btn{
        position: fixed;
        bottom: 80px;
        right: 32px;
    }
</style>