<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: "Account",
    mounted(){
        this.$firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                this.$router.push({name: 'home'})
            }
        })
    }
}
</script>