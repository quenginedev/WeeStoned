<template>
    <router-view></router-view>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: "Brand",
    computed: {
        ...mapGetters({brand_id: 'auth/getUserBrandID'})
    },
    data() {
        return {
            show_route: false
        }
    },
    methods: {
        initDashboard(){
            
        }
    },
    mounted() {
        if(this.brand_id){
            
        }else{
            this.$router.push({name: 'new-brand'})
        }
    },
}
</script>