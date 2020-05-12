<template>
    <div>
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
                        v-model="contact.location.address"
                        name="location"
                        :placeholder="contact.location.address || 'Location'"
                        rounded
                        filled
                        dense
                        @click="show_map = true"
                    >
                        <v-icon slot="prepend">mdi-map-marker</v-icon>
                        <v-icon 
                            @click="getGeolocation" 
                            :color="gpsLoading ? 'red' : 'grey'" 
                            slot="append-outer">mdi-crosshairs-gps</v-icon>
                        <v-icon @click="show_map = true" color="grey" slot="append">mdi-map</v-icon>
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <slot :contact="contact"></slot>
            </v-card-actions>
        </v-card>
        
        <v-dialog
            v-model="show_map"
            fullscreen
        >
            <v-card class="ma-0 pa-0 fill-height">
                <GmapMap
                    ref="gmap"
                    :center="markerPosition"
                    @click="setPosition"
                    :zoom="16"
                    class="fill-height"
                    :options="{
                       zoomControl: false,
                       mapTypeControl: false,
                       scaleControl: false,
                       streetViewControl: false,
                       rotateControl: false,
                       fullscreenControl: false,
                       disableDefaultUi: false
                    }"
                >
                    <GmapMarker
                        @drag="dragMap"
                        :position="markerPosition"
                        :clickable="true"
                        :draggable="true"
                    >
                    </GmapMarker>
                </GmapMap>
                <v-col class="px-3 pl-9" style="position: absolute; top: 15px; right: 15px">
                    <v-row justify="center" align="center">
                        <v-text-field
                            hide-details
                            solo
                            filled
                            rounded
                            :placeholder="locationPlaceholder || 'Search place'"

                        >
                            <v-icon
                                @click="getGeolocation"
                                :color="gpsLoading ? 'red' : 'grey'"
                                slot="append">mdi-crosshairs-gps</v-icon>
                            <v-btn icon @click="show_map = false" slot="append-outer" color="black">
                                <v-icon >mdi-close</v-icon>
                            </v-btn>
                        </v-text-field>
                    </v-row>
                </v-col>
                <v-col cols="12" style="position: absolute; bottom: 15px">
                    <v-btn block color="primary" large>
                        <v-icon left>mdi-map-marker</v-icon> Confirm
                    </v-btn>
                </v-col>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins
export default {
    
    name: 'BasicContactInfo ',
    data() {
        return {
            locationPlaceholder: '',
            markerPosition: {lat:5.551147, lng:-0.208125},
            user: this.$store.getters['auth/getUser'],
            gpsLoading: false,
            show_map: true,
            contact: {
                location: {}
            }
        }
    },
    methods: {
        dragMap(position){
            this.markerPosition = position.latLng
        },
        async setPosition(position){
            this.$refs.gmap.panTo(position.latLng)
            // console.log(position.latLng.lat())
            this.locationPlaceholder = await this.getClosestLandmark(position.latLng.lat(), position.latLng.lng())
            setTimeout(()=>{
                this.dragMap(position)
            }, 300)
        },
        getClosestLandmark(lng,lat){
            console.log(lng, lat)
            return this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.VUE_APP_GOOGLE_CLOUD_API}`)
                .then(res=>{
                    console.log(res.data.results)
                    return res.data.results[0].formatted_address
                })
        },
        getGeolocation(){
            this.gpsLoading = true
            Geolocation.getCurrentPosition()
                .then(coordinates=>{
                    let {latitude, longitude} = coordinates.coords
                    return this.getClosestLandmark(latitude, longitude)
                        .then(address=>{
                            this.contact.location.address = address
                            this.contact.location.lat = latitude
                            this.contact.location.lng = longitude
                            this.markerPosition = {lat: latitude, lng: longitude}
                            console.log(this.contact)
                        })
                }).catch(err=>{
                    console.error(err)
                }).finally(_=>{
                    this.gpsLoading = false
                })
        },

    },
    created() {
        this.contact.displayName = this.user.displayName
        this.contact.phoneNumber = this.user.phoneNumber
    },
}
</script>