export default {
    namespaced: true,
    state: {
        basket: []
    },
    getters: {
        getProducts(state){
            return state.basket
        },

        getProductsCount(state){
            return state.basket.length
        },
    },
    mutations: {
        addProduct(state, product){
            state.basket.push(product)
        },

        removeProduct(state, index){
            state.basket.splice(index, 1)
        }
    }
}