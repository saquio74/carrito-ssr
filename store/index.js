import axios from 'axios'
axios.defaults.baseURL="http://localhost:8000/api";
export const state = () => ({
        user: '',
        error: '',
});
export const mutations = {
    SETUSER(state, user){
        state.user = user;
    },
    SETERROR(state, error){
        state.error = error
    },
    CLEANERROR(state){
        state.error = ''
    }
}

export const actions =  {
    cleanErrors({commit}){
        commit('CLEANERROR')
    },
    async login({commit,dispatch},credentials){
        try {
            const response = await axios.post('auth/login', credentials);
            const user = await response.data;
            localStorage.token = user.access_token;
            dispatch('getUser');
        } catch (error) {
            
            const response = error.response.data.message;
            commit('SETERROR',response);
        }
    },
    async getUser({commit}){
        const token = localStorage.getItem("token")
        if(token!=''){
            
            try {
                const response = await axios.create({
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer "+token,
							},
						}).get('user');
                const user = await response.data;
                
                commit('SETUSER',user);
            } catch (error) {   
            }
        }else{
            commit('SETUSER','');
        }
    },
    async logout({dispatch}){
        const token = localStorage.getItem('token');
        if(token != ''){
            
            try{
                await axios.create({
                    headers:{
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).post('logout')
                localStorage.token = '';
                dispatch('getUser');
            }catch(error){
                console.log(error);
            }
        }
    },
    async signup({commit}, credentials){
        try {
            const response = await axios.post('auth/signup', credentials);
            const respuesta = await response.data.message;
            commit('SETERROR',respuesta)
        } catch (error) {
            
            const response = error.response.data.message 
            commit('SETERROR',response);
        }
    }
}
export const getters = {
    getUser(state){
        return state.user
    },
    getError(state){
        return state.error
    }
}