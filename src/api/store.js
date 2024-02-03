import { create } from 'zustand'
import { officeSpaces } from './data';

const url = 'https://officely.azurewebsites.net';

// TODO: add fetch and save methods after update in the backend
const OfficeStore = create((set) => ({
	offices: officeSpaces,
	setOffices: 
        (offices) => set({ offices }),
    fetchOffices: 
        async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
            method: 'GET',
            headers: {
              'Accept': '*/*', 
              'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
            }
          }),
        //async (pageSize, pageNum) => console.log('fetching offices'),
	// saveOffice: async (office) => fetch(`${url}/office`, {
	// 	method: 'POST', 
	// 	headers: {'Content-Type': 'application/json'},
	// 	body: JSON.stringify({value: language})})
}))

// TODD: check if user is admin, probably it will be done server side 
const LoginStore = create((set) => ({
	jwttoken: "",
	login: 
        async (username, password) => 
        {
            try {
                const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                });
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                const data = await response.json();
                set({ jwttoken: data.jwttoken })
                console.log(data)
            } catch (error) {
                console.error('Login failed:', error.message);
                throw error;
            }
        },
	logout: 
        async () => 
        {      
            try {     
                const response = await fetch(`${url}/auth/logout`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorizatiox': `Bearer ${LoginStore.getState().jwttoken}`,
                  }
                });
        
                if (!response.ok) {
                  throw new Error(`Request failed: ${response.statusText}`);
                }
                set({ jwttoken: "" })
                return response;
            } catch (error) {
                console.error('Authenticated request failed:', error.message);
                throw error;
            }
        }
}))

const safeCall = async (jwttoken, method = 'GET', body = null) => {
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwttoken}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
  }
export { OfficeStore, LoginStore};