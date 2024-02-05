import { create } from 'zustand'
import Cookies from 'js-cookie';

const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const LoginStore = create((set) => ({
  jwttoken: Cookies.get('jwttoken'),
  userData: null,

  setToken: (jwttoken) => {
    Cookies.set('jwttoken', jwttoken, { expires: 1 });
    set({ jwttoken });
  },

  setUserData: (userData) => {
    set({ userData });
  },

  login: async (username, password) => {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      LoginStore.getState().setToken(data.jwttoken);
      LoginStore.getState().setUserData(data.userData);

      console.log(data);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const jwttoken = LoginStore.getState().jwttoken;

      if (!jwttoken) {
        // If there's no token, just clear local storage and return
        localStorage.clear();
        Cookies.remove('jwttoken');
        set({ jwttoken: '', userData: null });
        return;
      }

      const response = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwttoken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      // Clear local storage
      localStorage.clear();

      LoginStore.getState().setToken('');
      LoginStore.getState().setUserData(null);
      Cookies.remove('jwttoken');

      return response;
    } catch (error) {
      console.error('Authenticated request failed:', error.message);
      throw error;
    }
  },
}));

export default LoginStore;

// TODD: check if user is admin, probably it will be done server side 
// const LoginStore = create((set) => ({
// 	jwttoken: Cookies.get('jwttoken'),
//     setToken: 
//         (jwttoken) => 
//         {
//             Cookies.set('jwttoken', jwttoken, { expires: 1 })
//             set({ jwttoken })
//         },
// 	login: 
//         async (username, password) => 
//         {
//             try {
//                 const response = await fetch(`${url}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//                 });
//                 if (!response.ok) {
//                     throw new Error('Invalid credentials');
//                 }
//                 const data = await response.json();
//                 LoginStore.getState().setToken(data.jwttoken)
//                 console.log(data)
//             } catch (error) {
//                 console.error('Login failed:', error.message);
//                 throw error;
//             }
//         },
// 	// logout: 
//     //     async () => 
//     //     {      
//     //         try {     
//     //             const response = await fetch(`${url}/auth/logout`, {
//     //               method: 'POST',
//     //               headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
//     //               }
//     //             });

//     //             if (!response.ok) {
//     //               throw new Error(`Request failed: ${response.statusText}`);
//     //             }
//     //             set({ jwttoken: "" })
//     //             Cookies.remove('jwttoken');
//     //             return response;
//     //         } catch (error) {
//     //             console.error('Authenticated request failed:', error.message);
//     //             throw error;
//     //         }
//     //     }
//     logout: async () => {
//         try {
//             const response = await fetch(`${url}/auth/logout`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Request failed: ${response.statusText}`);
//             }

//             set({ jwttoken: "" });
//             localStorage.removeItem('jwttoken'); // Clear from localStorage on logout
//             return response;
//         } catch (error) {
//             console.error('Authenticated request failed:', error.message);
//             throw error;
//         }
//     },
// }))

// export default LoginStore;