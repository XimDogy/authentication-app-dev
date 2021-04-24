import * as api from '../api/index.js';

export const register = async (email, password, history, setshowMessage, setIsLoading) => {
    try {
        const { data } = await api.register(email, password);
        localStorage.setItem('profile', JSON.stringify(data));
        history.push('/');
    } catch (error) {
        setshowMessage(error.response?.data?.message);
        setIsLoading(false);
    }
    
}

export const login = async (email, password, history, setshowMessage, setIsLoading) => {
    try {
        const { data } = await api.login(email, password);
        localStorage.setItem('profile', JSON.stringify(data));
        history.push('/');
    } catch (error) {
        setshowMessage(error.response?.data?.message);
        setIsLoading(false);
    }

}


