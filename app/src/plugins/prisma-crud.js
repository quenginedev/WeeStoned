import Crud from '../graphql/Crud.gql'

export default {
    install(Vue, options = {
        operations: []
    }){
        Vue.prototype.$crud = {}
        options.operations.forEach(name=>{
            Vue.prototype.$crud[name] = new Crud(name)
        })
    }
}