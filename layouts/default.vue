<template>
	<v-app dark>
		<v-navigation-drawer
		v-model="drawer"
		:mini-variant="miniVariant"
		:clipped="clipped"
		fixed
		app
		>
			<v-list>
				<v-list-item
				v-for="(item, i) in items"
				:key="i"
				:to="item.to"
				router
				exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
				<login />
			</v-list>
			
		</v-navigation-drawer>
		<v-app-bar
		:clipped-left="clipped"
		fixed
		app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			
			
			<v-toolbar-title v-text="title" />
			<v-spacer />
			
			
			
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
		
			<v-footer
			:absolute="!fixed"
			app
			>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
import login from '../components/UserLogin.vue'
export default {
	components:{
		login,	
	},
	data () {
		return {
		clipped: false,
		drawer: false,
		fixed: false,
		items: [
			{
			icon: 'mdi-home',
			title: 'Home',
			to: '/'
			},
			{
			icon: 'mdi-chart-bubble',
			title: 'Nosotros',
			to: '/inspire'
			}
		],
		miniVariant: false,
		right: true,
		rightDrawer: false,
		title: 'Celu-informatica'
		}
	},
	beforeCreate(){
		this.$store.dispatch('getUser');
	},
	methods:{
		callUsers (){
			this.$store.dispatch('getUser');
		}	
	},
	computed:{
		user(){
			return this.$store.getters['getUser'];
		}
	}
}
</script>
