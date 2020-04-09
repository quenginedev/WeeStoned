<template>
    <div>
        <v-row justify="center">
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
        </v-row>
        <v-card outlined>
            <v-list v-scroll rounded class="mb-12">
                <v-list-item v-for="(product, index) in products" :key="index">
                    <v-list-item-avatar>
                        <v-img v-if="product.img" :src="product.img"></v-img>
                        <v-icon v-else>mdi-tag</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class=" text-capitalize">{{product.name}}</v-list-item-title> 
                        <v-list-item-subtitle>GHS <span class=" primary--text">{{product.price}}</span></v-list-item-subtitle> 
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn @click="editProduct(product)" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
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
                    <v-btn @click="closeEditBox" icon text dense>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-form class=" text-center">
                        <v-avatar class="mb-5" size="124" color="primary">
                            <v-icon size="72">mdi-tag</v-icon>
                        </v-avatar>
                        <v-text-field
                            v-model="editedItem.name"
                            name="name"
                            rounded
                            dense
                            filled
                            placeholder="Product Name"
                        >
                            <v-icon left slot="prepend-inner">mdi-tag</v-icon>
                        </v-text-field>

                        <v-select
                            @change="setCategories"
                            v-model="editedItem.productType"
                            :items="productTypes"
                            placeholder="Product Type"
                            item-text="name"
                            item-value="id"
                            rounded
                            dense
                            filled
                        >
                            <v-icon left slot="prepend-inner">mdi-tag-heart</v-icon>
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
                            <v-icon left slot="prepend-inner">mdi-tag-multiple</v-icon>
                        </v-select>

                        <v-text-field
                            v-model="editedItem.price"
                            name="price"
                            rounded
                            dense
                            filled
                            type="number"
                            placeholder="Product Price"
                        >
                            <v-icon left slot="prepend-inner">mdi-cash</v-icon>
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
                        @click="processProduct"
                        >
                            <span v-if="!editedItem.id">Create Product</span>
                            <span v-else>Update Product</span>
                        </v-btn>
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
            return item.name && item.productType && item.price
        }
    },
    data() {
        return {
            user: this.$store.getters['auth/getUser'],
            editedItem: {},
            show_add_product: false,
            is_empty: false,
            is_loading: true,
            products: [],
            productTypes: [],
            productCategories: [],
            creatingProduct: false
        }
    },
    methods: {
        closeEditBox(){
            this.show_add_product = false
            this.editedItem = {}
        },
        getProductTypes(){
            this.$crud.productType.find(`{
                id
                name
                categories{
                    id
                    name
                }
            }`, {orderBy: 'name_ASC'}).then(res=>{
                this.productTypes = res. data
            }).catch(err=>{
                console.error(err)
            })
        },

        setCategories(id){
            let product_type = this.productTypes.find(type=>{
                return type.id == id
            })
            if(product_type)
                this.productCategories = product_type.categories
        },

        getProducts(){
            this.$crud.product.find(`{
                id
                name
                price
                img
                productType{
                    id
                    name
                    unit{id name}
                }
                category{ id name }
            }`, {
                orderBy: 'createdAt_DESC',
                where: {
                    brand : {id: this.user.brand.id}
                }
            }).then(res=>{
                this.products = res.data
            }).catch(err=>{
                console.log(err)
            })
        },

        editProduct(product){
            this.editedItem = {...product}
            this.editedItem.productType = product.productType.id 
            this.editedItem.category = product.category ? product.category.id : null
            
            let productType = this.productTypes.find(type=>{
                return type.id == product.productType.id
            })

            this.productCategories = productType.categories

            console.log(this.editedItem)
            this.show_add_product = true 
        },
        processProduct(){
            this.creatingProduct = true
            let brand = {connect: { id: this.user.brand.id } }
            let productType = {connect: {id : this.editedItem.productType}}
            let product = {
                ...this.editedItem,
                brand,
                productType,
                price: parseInt(this.editedItem.price)
            }
            
            if(this.editedItem.category){
                let category = {connect: {id : this.editedItem.category} }
                product.category = category
            }

            delete product.__typename

            if(!product.id){
                this.createProduct(product)
            }else{
                this.updateProduct(product)
            }
        },
        createProduct(product){
            this.$crud.product.insert(`{
                id
                name
                img
                price
                productType{
                name
                id
                unit{id name}
                }
                category{ id name}
            }`, {
                data: product
            }).then(res=>{
                this.products.push(res)
                this.closeEditBox()
            }).catch(err=>{
                console.error(err)
            }).finally(_=>{
                this.creatingProduct = false
            })
        },
        updateProduct(product){
            let id = product.id
            delete product.id

            this.$crud.product.update(`{
                id
                name
                img
                price
                productType{
                name
                id
                unit{id name}
                }
                category{ id name}
            }`, {
                data: product,
                where: {id}
            }).then(res=>{
                this.products = this.products.map(product=>{
                    return product.id !== res.id ? product : res
                })
                this.closeEditBox()
            }).catch(err=>{
                console.error({err, product})
            }).finally(_=>{
                this.creatingProduct = false
            })
        }
    },
    created() {
        this.getProductTypes()
        this.getProducts()
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