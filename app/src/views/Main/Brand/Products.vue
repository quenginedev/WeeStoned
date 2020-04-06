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
        <v-dialog
            class=""
            v-model="show_add_product"
            scrollable 
            persistent
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card class="">
                <v-card-title class="mb-3">
                    <p class="headline pa-0 ma-0">Create Product</p>
                    <v-spacer></v-spacer>
                    <v-btn @click="show_add_product = false" icon text dense>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-form class=" text-center">
                        <v-avatar class="mb-5" size="124" color="secondary">
                            <v-icon size="72">mdi-image</v-icon>
                        </v-avatar>
                        <v-text-field
                            v-model="editedItem.name"
                            name="name"
                            rounded
                            dense
                            filled
                            placeholder="Product Name"
                        >
                            <v-icon slot="prepend">mdi-tag</v-icon>
                        </v-text-field>

                        <v-select
                            v-model="editedItem.productType"
                            :items="productTypes"
                            placeholder="Product Type"
                            item-text="name"
                            item-value="id"
                            rounded
                            dense
                            filled
                        >
                            <v-icon slot="prepend">mdi-tag-heart</v-icon>
                        </v-select>

                        <v-select
                            v-if="editedItem.productType"
                            v-model="editedItem.category"
                            :items="productCategories"
                            placeholder="Product Categories"
                            item-text="name"
                            item-value="id"
                            rounded
                            dense
                            filled
                        >
                            <v-icon slot="prepend">mdi-tag-multiple</v-icon>
                        </v-select>

                        <v-text-field
                            v-model="editedItem.price"
                            name="price"
                            rounded
                            dense
                            filled
                            type="number"
                            min="1"
                            placeholder="Product Price"
                        >
                            <v-icon slot="prepend">mdi-cash</v-icon>
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        :loading="creatingProduct" 
                        block 
                        rounded
                        :disabled="!canSave" 
                        color="primary"
                        @click="createProduct"
                        >Create Product</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn
            @click="show_add_product = true"
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
const ProductType = new Crud('productType')
export default {
    name: 'BrandProducts',
    computed: {
        canSave(){
            let item = this.editedItem 
            return item.name && item.productType && item.price && item.category
        }
    },
    data() {
        return {
            editedItem: {},
            show_add_product: true,
            is_empty: false,
            is_loading: true,
            products: [],
            productTypes: [],
            productCategories: [],
            creatingProduct: false
        }
    },
    methods: {
        getProductTypes(){
            ProductType.find(`{
                id name
            }`, {orderBy: 'name_ASC'}).then(res=>{
                this.productTypes = res. data
            }).catch(err=>{
                console.error(err)
            })
        },

        createProduct(){
            console.log(this.editedItem)
        }
    },
    created() {
        this.getProductTypes()
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