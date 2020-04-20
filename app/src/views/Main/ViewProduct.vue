<template>
    <v-row justify="center">
        <h1>Product</h1>
    </v-row>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    data() {
        return {
            colors: '',
            product: ''
        }
    },
    created() {
        console.log(this.$route)
    },

}
</script>
