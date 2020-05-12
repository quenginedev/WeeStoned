<template>
  <div class="fill-height">
    <v-row v-if="loading" class="fill-height"  justify="center" align="center">
        <v-progress-circular
          indeterminate
          size="72"
          color="primary"
        ></v-progress-circular>    
    </v-row>
    <v-row v-else justify="space-around">
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index" 
        :product="product"
        :color="colors[Math.floor(Math.random() * colors.length)]"
        >
          <v-col cols="3">
            <v-btn block color="primary" outlined>
              <v-icon>mdi-star-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <v-btn @click="showQuantitySelector(product)" block color="primary" outlined>
              <v-icon left>mdi-basket</v-icon> add to basket
            </v-btn>
          </v-col>
        </ProductCard>
        <v-dialog
            v-model="showSelectedProduct"
          >
            <v-card v-if="selectedProduct.product">
              <v-card-title class=" text-capitalize">
                <v-icon left color="primary">mdi-cannabis</v-icon> {{selectedProduct.product.name}}
                <v-spacer></v-spacer>
                <v-btn @click="closeSelectedProduct" icon color="primary" dense text>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="text-center pb-0">
                <p class=" text-capitalize" v-if="selectedProduct.product.brand">
                    <v-icon color="primary">mdi-cannabis</v-icon>
                        {{selectedProduct.product.brand.name}}
                    <v-icon color="primary">mdi-cannabis</v-icon>
                    <v-spacer></v-spacer>
                </p>
                <v-alert v-if="selectedProduct.product.usage" color="info" dense text icon="mdi-information">
                  <p>{{selectedProduct.product.usage}}</p>
                </v-alert>        
                <v-img aspect-ratio="1" 
                  width="100%" v-if="selectedProduct.product.img" 
                  :src="selectedProduct.product.img" class="full-width"/>
                <v-icon v-else size="72">mdi-tag</v-icon>
                <v-col class="mb-0 pb-0" cols="12">
                  <v-row  justify="space-between">
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        v-model="selectedProduct.quantity"
                        dense
                        placeholder="Qty"
                        rounded
                        filled
                        type="number"
                        min="1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        dense
                        name="price"
                        :placeholder="selectedPrice(selectedProduct.product.price)"
                        rounded
                        filled
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12">
                      <v-text-field
                        dense
                        name="total"
                        :placeholder="selectedPrice(selectedProduct.product.price * selectedProduct.quantity)"
                        rounded
                        filled
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="addToBasket" block outlined>
                  <v-icon left>mdi-basket</v-icon> Add To basket
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../../components/ProductCard'
export default {
  name: 'Home',
  components:{ProductCard},
  data() {
    return {
      colors: ['red', 'green', 'blue', 'orange'],
      products: [],
      loading: true,
      showSelectedProduct: false,
      selectedProduct: {},
    }
  },
  methods: {
    selectedPrice(price){
      return this.$options.filters.currency(price)
    },
    closeSelectedProduct(){
      this.showSelectedProduct = false
      this.selectedProduct = {}
    },
    showQuantitySelector(product){
      this.selectedProduct = { product, quantity: 1}
      this.showSelectedProduct = true
    },

    addToBasket(){
      this.$store.commit('basket/addProduct', this.selectedProduct)
      this.closeSelectedProduct()
    },
    getProducts(){
      this.loading = true
      this.$crud.product.find(`{
        id
        name
        img
        price
        productType{
          name
          unit{name}
        }
        category{name}
        brand{name id}
    }`, {
        orderBy: 'createdAt_DESC',
    })
        .then(res=>{
          this.products = res.data
        }).catch(err=>{

        }).finally(_=>{
          this.loading = false
        })
    }
  },
  created() {
    this.getProducts()
  },

}
</script>
