<template>
    <div>
        <v-card>
            <v-card-text class="pb-0">
<!--                <location-selection/>-->
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
                        :position="markerPosition"
                        :clickable="false"
                        :draggable="false"
                    >
                    </GmapMarker>
                </GmapMap>
                <v-col class="px-3 pl-9" style="position: absolute; top: 15px; right: 15px">
                    <v-row justify="center" align="center">
                        <v-menu v-model="showGeocodingMenu" offset-y close-on-click>
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="addressSearch"
                                    hide-details
                                    solo
                                    filled
                                    rounded
                                    :placeholder="locationPlaceholder || 'Search place'"
                                    :autofocus="false"
                                >
                                    <v-icon
                                        @click="getGeolocation"
                                        :color="gpsLoading ? 'red' : 'grey'"
                                        slot="append">mdi-crosshairs-gps</v-icon>
                                    <v-icon
                                        @click="searchGeocoding"
                                        v-if="addressSearch"
                                        class="ml-3"
                                        :color="gpsLoading ? 'red' : 'grey'"
                                        slot="append">mdi-magnify</v-icon>    
                                    <v-btn icon @click="show_map = false" slot="append-outer" color="black">
                                        <v-icon >mdi-close</v-icon>
                                    </v-btn>
                                </v-text-field>
                            </template>
                            <v-card class="text-center">
                                <v-progress-circular class="my-3" v-if="loadingGeocoding" indeterminate color="primary"></v-progress-circular>
                                <v-list v-else>
                                    <v-list-item @click="setGeocodingPosition(address)" v-for="(address, index) in addressList" :key="index">
                                        {{address.formatted_address}}
                                    </v-list-item>
                                    <v-list-item v-if="addressList.length < 1">
                                        Location not found
                                    </v-list-item>
                                </v-list>                            
                            </v-card>
                        </v-menu>
                    </v-row>
                </v-col>
                <v-col cols="12" style="position: absolute; bottom: 15px">
                    <v-btn @click="confirmLocation" block color="primary" large>
                        <v-icon left>mdi-map-marker</v-icon> Confirm
                    </v-btn>
                </v-col>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { Plugins } from '@capacitor/core'
import LocationSelection from "../../components/LocationSelection";
const { Geolocation } = Plugins
export default {
    
    name: 'BasicContactInfo ',
    components: {LocationSelection},
    data() {
        return {
            isNewLocation: false,
            locationPlaceholder: '',
            markerPosition: {lat:5.551147, lng:-0.208125},
            user: this.$store.getters['auth/getUser'],
            gpsLoading: false,
            show_map: false,
            contact: {
                location: {
                    save :false
                }
            },
            addressSearch: '',
            addressList: [],
            showGeocodingMenu: false,
            loadingGeocoding: false
        }
    },
    methods: {
        confirmLocation(){
            this.contact.location.address = this.locationPlaceholder
            this.contact = {...this.contact, ...this.markerPosition}
            this.show_map = false
        },
        setGeocodingPosition(address){
            console.log(address)
            this.locationPlaceholder = address.formatted_address
            this.markerPosition = address.geometry.location
            this.addressSearch = ''
        },
        searchGeocoding(){
            this.loadingGeocoding = true
            this.showGeocodingMenu = true
            this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.addressSearch}&key=${process.env.VUE_APP_GOOGLE_CLOUD_API}`)
                .then(res=>{
                    console.log(res.data)
                    if(res.data)
                    this.addressList = res.data.results
                })
                .finally(_=>{
                    this.loadingGeocoding = false
                })
        },
        dragMap(position){
            console.log(position.latLng)
            this.$refs.gmap.panTo(position.latLng)
            this.markerPosition = position.latLng
        },
        async setPosition(position){
            this.$refs.gmap.panTo(position.latLng)
            this.locationPlaceholder = await this.getClosestLandmark(position.latLng.lat(), position.latLng.lng())
            this.dragMap(position)
        },
        getClosestLandmark(lat, lng){
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