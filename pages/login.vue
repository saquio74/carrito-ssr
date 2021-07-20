<template>
    <form  >
        <v-col sm="12" md="8">
            
        <v-text-field
            v-model="credentials.email"
            label="Email"
            :rules="rules"
        ></v-text-field>
        <v-text-field
            v-model="credentials.password"
            label="password"
            :rules="rules"
            type = "password"
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
            {{ error }}

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
        </v-col>
    </form>
</template>
<script>
export default {

    data: () => ({
        credentials:{
            email: '',
            password: ''
        },
        loginError:'',
        snackbar: false,
        timeout: 2000,
        rules: [
            value => !!value || 'Required.',
            value => (value && value.length >= 8) || 'Min 8 characters',
        ],
    }),

    computed: {
      
        emailErrors () {
            const errors = []
            
            !this.credentials.email == '' && errors.push('E-mail is required')
            return errors
        },
        passwordErrors () {
            const errors = []
            
            !this.credentials.password == '' && errors.push('Password is required.')
            return errors
        },
        user(){
            return this.$store.getters['getUser'];
        },
        error(){
            return this.$store.getters['getError']
        }
    },
    methods: {

        clear () {
            this.credentials.email = ''
            this.credentials.password = ''
        },
        submit(){
            this.$store.dispatch('login',this.credentials);
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
        }
    }
  }
</script>