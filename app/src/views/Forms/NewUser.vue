<template>
    <v-col cols="12" class=" fill-height">
        <v-row justify="center" align="center" class=" fill-height">
            <v-avatar size="124" color="secondary" class=" elevation-3" v-ripple>
                <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
                <v-icon v-else size="72" color="white">mdi-account-plus</v-icon>
            </v-avatar>
            <v-col cols="11">
                <v-form>
                    <v-text-field
                        v-model="user.displayName"
                        rounded
                        filled
                        dense
                        placeholder="Display Name"
                    >
                        <v-icon slot="prepend">mdi-account</v-icon>
                    </v-text-field>
                    <v-row v-if="!hasPhone">
                        <v-col cols="6">
                            <v-select
                                v-model="countyCode"
                                filled
                                rounded
                                dense
                                :items="countries"
                                placeholder="GH"
                            >
                                <v-icon slot="prepend">mdi-phone</v-icon>
                            </v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.phoneNumber"
                                type="tel"
                                rounded
                                filled
                                dense
                                placeholder="Phone Number"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-else
                        v-model="user.phoneNumber"
                        type="tel"
                        rounded
                        filled
                        dense
                        placeholder="Phone Number"
                    >
                        <v-icon slot="prepend">mdi-phone</v-icon>
                    </v-text-field>

                    <v-btn
                        v-show="!hasPhone"
                        id="verify-btn"
                        @click="sendSMS"
                        :loading="sms_sending"
                        block
                        rounded
                        :disabled="isDisabled"
                        color="primary"
                    ><v-icon left>mdi-cellphone-key</v-icon> Verify</v-btn>
                    <v-btn
                        v-show="hasPhone"
                        @click="saveUserData"
                        :loading="sms_sending"
                        block
                        outlined
                        :disabled="isDisabled"
                        color="primary"
                    ><v-icon left>mdi-check</v-icon> Continue</v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-dialog
            v-model="showVerifier"
        >
            <v-card>
                <v-card-title>
                    <v-row justify="end">
                        <v-btn 
                            @click="showVerifier = false"
                            icon
                        ><v-icon>mdi-close</v-icon></v-btn>                    
                    </v-row>
                    <v-alert 
                        v-if="!error"
                        border="left"
                        colored-border
                        type="info"
                    >
                        Verification code sent to {{formattedPhone}}
                    </v-alert>
                    <v-alert 
                        v-else
                        border="left"
                        colored-border
                        type="error"
                    >
                        {{error}}
                    </v-alert>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="verificationCode"
                        rounded
                        filled
                        dense
                        placeholder="Verification Code"
                    >
                    </v-text-field>
                    <v-row>
                        <v-col cols="6">
                            <v-btn
                                :loading="sms_sending"
                                @click="sendSMS"
                                color="secondary"
                                rounded block
                            ><v-icon left>mdi-sync</v-icon> resend</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn
                                :loading="verifying"
                                @click="verifyCode"
                                color="primary"
                                rounded block
                            ><v-icon left>mdi-check</v-icon> verify</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-col>
</template>
<script>
import countriesJSON from '../../assets/CountyPhone.json'
import Crud from '../../graphql/Crud.gql'

const User = new Crud('user') 

export default {

    computed: {
        isDisabled(){
            return !(this.user.displayName && this.user.phoneNumber && this.countyCode)
        },

        formattedPhone(){
            let phone = this.user.phoneNumber || ''
            return '+' + this.countyCode + (phone[0] == "0" ? phone.substring(1) : phone) 
        }
    },
    data() {
        return {
            error: '',
            showVerifier: false,
            hasPhone: false,
            countries:  Object.keys(countriesJSON).map(key=>{
                return {text: key, value: countriesJSON[key]}
            }).sort((a,b)=> a.text < b.text ? -1 : 1),
            user: this.$firebase.auth().currentUser,
            prevUser: this.$firebase.auth().currentUser,
            countyCode: '233',
            verificationCode: '',
            sms_sending: false,
            verifying: false,
        }
    },

    methods: {
        sendSMS(){
            var phoneNumber = this.formattedPhone;
            var appVerifier = window.recaptchaVerifier;
            this.sms_sending = true
            // this.$firebase.auth().
            this.$firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(confirmationResult=> {
                    window.confirmationResult = confirmationResult;
                    this.showVerifier = true
                }).catch(error=>{
                    console.error(error)
                }).finally(_=>{
                    this.sms_sending = false
                })
        },
        verifyCode(){
            this.verifying = true
            let credential = this.$firebase.auth.PhoneAuthProvider
                .credential(confirmationResult.verificationId, this.verificationCode)
            console.log({credential, confirmationResult})

            this.prevUser.linkWithCredential(credential)
                .then(linkResult=>{
                    this.showVerifier = false
                    this.saveUserData()
                }).catch(err=>{
                    console.error(err)
                }).finally(_=>{
                    this.verifying = false
                })
        },

        saveUserData(){
            this.sms_sending = true
            let user = this.$firebase.auth().currentUser
            User.insert(`{
                id
                email
                displayName
                firebase_id
                photoURL
                phoneNumber
            }`, {
                data: {
                    firebase_id: user.uid,
                    displayName: this.user.displayName || user.displayName,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    photoURL: user.photoURL	
                }
            }).then(res=>{
                this.$store.commit('auth/setUser', res)
                this.sms_sending = true
                this.$router.push({name: 'home'})
                this.$root.$emit('disable-nav', false)
            }).catch(err=>{
                console.error(err)
            })
        }
    },

    mounted() {
        window.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('verify-btn', {
            'size': 'invisible',
            'callback': response=>{
                console.log(response)
            }
        })
        
    },
    created() {
        this.$root.$emit('disable-nav', true)
        this.hasPhone = this.user.phoneNumber ? true : false
    },
}
</script>