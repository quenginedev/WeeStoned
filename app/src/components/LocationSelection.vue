<template>
    <v-list>
        <v-list-item @click="$emit('setContact', )" ripple>
            <v-list-item-avatar>
                <v-icon>mdi-map</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <span class="body-2">32 Kojo Thompson Road</span>
            </v-list-item-content>
        </v-list-item>
        <v-list-item ripple class="primary" dark>
            <v-list-item-avatar>
                <v-icon>mdi-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <span class="body-2">Add Location</span>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "LocationSelection"
    }
</script>

<style scoped>

</style>