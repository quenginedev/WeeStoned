<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-img aspect-ratio="1" width="100%" v-if="item.product.img" :src="item.product.img" class="full-width"/>
            <v-icon v-else size="72">mdi-tag</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-text-field
                v-if="edit"
                class=" mb-n5"
                type="number"
                rounded
                filled
                v-model="item.quantity"
                @keypress.enter="edit=false"
                dense
            ></v-text-field>
            <v-list-item-title v-else class=" text-capitalize">
                <span class="info--text">{{item.quantity}}</span> {{item.product.name}}
            </v-list-item-title>
            <v-list-item-subtitle  @click="edit=true" class="primary--text">
                @ {{item.product.price | currency }} 
                = {{item.quantity * item.product.price | currency}}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn v-if="!edit" @click="$emit('remove', index)" color="error" dense icon>
                <v-icon >mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn v-else @click="edit=false" color="primary" dense icon>
                <v-icon >mdi-check-circle</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>    
</template>
<script>
export default {
    name: "CartListItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            edit: false
        }
    },
}
</script>