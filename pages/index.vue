<template>
    <v-row justify="center" align="center">
		<carrusel />
		<v-col cols="12" sm="8" md="6">
			<producto />
			{{user}}
		</v-col>
    </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import carrusel from '../components/Carrusel.vue'
import producto from '../components/Producto.vue'
import {mapActions} from 'vuex';

export default {
	components: {
		Logo,
		VuetifyLogo,
		carrusel,
		producto
	},
	
  
}
</script>
