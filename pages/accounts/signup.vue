<template>
    <form>
        <v-text-field
            v-model="credentials.name"
            label="Nombre"
            :rules="rules"
        ></v-text-field>
        <v-text-field
            v-model="credentials.email"
            label="Email"
            :rules="rules"
        ></v-text-field>
        <v-text-field
            v-model="credentials.password"
            label="contraseña"
            :rules="rules"
            type = "password"
        ></v-text-field>
        <v-text-field
            v-model="credentials.password_confirmation"
            label="confirme contraseña"
            :rules="passwordCErrors"
            type = "password"
        ></v-text-field>
        <v-text-field
            v-model="credentials.direccion"
            label="Direccion"
            :rules="rules"
        ></v-text-field>
        <v-text-field
            v-model="credentials.dni"
            label="DNI"
            :rules="rules"
            type="number"
        ></v-text-field>
        <v-text-field
            v-model="credentials.telefono"
            label="Telefono"
            :rules="rules"
            type= "number"
        ></v-text-field>
        <v-btn
        class="mr-4"
        @click="submit"
        >
        submit
        </v-btn>
        <v-btn @click="clear">
        clear
        </v-btn>
        <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        >
            {{ error }}{{message}}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </form>
</template>
<script>
export default {

    data: () => ({
        credentials:{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            telefono: '',
            dni: '',
            direccion: '',
        },
        message:'',
        loginError:'',
        snackbar: false,
        timeout: 2000,
        rules: [
            value => !!value || 'Required.',
            value => (value && value.length >= 8) || 'Min 8 characters',
        ],
    }),
    methods: {

        clear () {
            this.credentials.name = ''
            this.credentials.email = ''
            this.credentials.password = ''
            this.credentials.password_confirmation = ''
            this.credentials.telefono = ''
            this.credentials.dni = ''
            this.credentials.direccion = ''
        },
        submit(){
            this.$store.dispatch('signup',this.credentials);
            this.$router.push('/login');
        },
        goHome(){
            this.$router.push('/')
        },
        loginVerify(){
            if(this.user){
               this.goHome(); 
            }
        }
    },
    watch:{
        user(){
            this.loginVerify();
        },
        async error(){
            this.snackbar = true;
            await setTimeout(()=>{

                this.$store.dispatch('cleanErrors');
            },2000)
        },
    },
    computed: {
        
        passwordCErrors(){
            let flag = this.credentials.password == this.credentials.password_confirmation ? true:false; 
            
            return  [
                
                value => !!value || 'Required.',
                value => (value && value.length >= 8) || 'Min 8 characters',
                (flag) || "Las contraseñas no son iguales"
            ];
        },
        user(){
            return this.$store.getters['getUser'];
        },
        error(){
            return this.$store.getters['getError']
        }
    },
  }
</script>