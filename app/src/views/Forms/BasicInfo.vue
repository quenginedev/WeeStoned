<template>
    <v-card>
        <v-card-text class="pb-0">
            <v-form>
                <h3 class="mb-3">Contact Info</h3>
                <v-text-field
                    v-model="contact.displayName"
                    name="name"
                    placeholder="Name"
                    rounded
                    filled
                    dense
                >
                    <v-icon slot="prepend">mdi-account</v-icon>
                </v-text-field>
                <v-text-field
                    v-model="contact.phoneNumber"
                    name="phone"
                    placeholder="Phone"
                    type="tel"
                    rounded
                    filled
                    dense
                >
                    <v-icon slot="prepend">mdi-phone</v-icon>
                </v-text-field>
                <v-text-field
                    v-model="contact.location.name"
                    name="location"
                    placeholder="Location"
                    rounded
                    filled
                    dense
                >
                    <v-icon slot="prepend">mdi-map-marker</v-icon>
                    <v-icon slot="append">mdi-crosshairs-gps</v-icon>
                    <v-icon slot="append-outer">mdi-map</v-icon>
                </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <slot></slot>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: 'BasicContactInfo',
    data() {
        return {
            user: this.$store.getters['auth/getUser'],
            contact: {
                location: {}
            }
        }
    },
    created() {
        this.contact = {
            displayName: this.user.displayName,
            phoneNumber: this.user.phoneNumber,
            location: {}
        }
    },
}
</script>