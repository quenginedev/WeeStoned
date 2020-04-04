<template>
    <v-col>
        <v-row justify="space-around">
            <v-col cols="11">
                <v-card class=" card-rounded">
                    <v-card-title>
                        <h2 class="display-1">
                            <v-icon left color="primary">mdi-tag</v-icon> 6 Products
                        </h2>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn rounded :to="{name: 'brand-products'}" color="primary" block>Manage Products</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>    
    </v-col> 
</template>