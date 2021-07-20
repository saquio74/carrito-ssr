<template>
    <div>
        <div v-if="user">
            
            <v-list-item >
                <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    {{user.name}}
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout()">
                <v-list-item-action>
                    <v-icon>mdi-close</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    Cerrar sesion
                </v-list-item-content>
            </v-list-item>
        </div>
        <div v-else>
            
            <v-list-item to="/login">
                <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    entrar
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/accounts/signup">
                <v-list-item-action>
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    Registrarse
                </v-list-item-content>
            </v-list-item>
        </div>
    </div>
    
</template>
<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('logout');
        }
    },
    computed:{
        user(){
            return this.$store.getters['getUser'];
        }
    }
}
</script>