<template>
    <v-col cols="12" class=" fill-height">
        <v-row justify="center" align="end" class="fill-height">
            <v-avatar size="124" color="secondary" class=" elevation-3" v-ripple>
                <v-icon size="72" color="white">mdi-diamond-outline</v-icon>
            </v-avatar>
            <v-col cols="11">
                <v-form>
                    <v-text-field
                        v-model="brandName"
                        rounded
                        filled
                        dense
                        placeholder="Brand Name"
                    >
                        <v-icon slot="prepend">mdi-domain</v-icon>
                    </v-text-field>
                    <v-btn
                        :loading="loading" 
                        color="primary"
                        @click="createBrand"
                        :disabled="!brandName"
                        outlined
                        block
                    >
                        <v-icon left>mdi-domain-plus</v-icon>
                        Continue
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-col>
</template>
<script>
import Crud from '../../graphql/Crud.gql'
const Brand = new Crud('brand')
import {mapGetters} from 'vuex'

export default {
    name: 'NewBrand',
    computed: {
        ...mapGetters({user: 'auth/getUser'})
    },
    data(){
        return {
            loading: false,
            brandName: ''
        }
    },
    methods: {
        createBrand(){
            // this.loading = true
            let brand = {
                name: this.brandName,
                owner: {
                    connect: {id : this.user.id}
                }
            }
            console.log({brand})

            Brand.insert(`{
                id
            }`, {
                data: brand
            })
            .then(res=>{
                console.log(res)
                // TODO Brand Page
                this.$store.commit('auth/setUserBrand', res)
                this.$router.push({name: 'brand-dashboard'})
            })
            .finally(_=>{
                this.loading = false
            })
        }
    },
}
</script>