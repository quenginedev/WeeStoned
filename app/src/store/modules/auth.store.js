export default {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {
        getUser(state){
            return state.user
        },
        getID(state){
            return state.user.id
        },
        getUserBrandID(state){
            return state.user.brand ? state.user.brand.id : null
        }
    },
    mutations: {
        setUser(state, user){
            return state.user = user
        },
        setUserBrand(state, brand){
            return state.user.brand = brand
        }
    }
}