<template>
  <div class="fill-height">
    <v-row v-if="loading" class="fill-height"  justify="center" align="center">
        <v-progress-circular
          indeterminate
          size="72"
          color="primary"
        ></v-progress-circular>    
    </v-row>
    <v-row v-else justify="center">
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index" 
        :product="product"
        :color="colors[Math.floor(Math.random() * colors.length)]"
        >
        
        </ProductCard>
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
    }
  },
  methods: {
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
