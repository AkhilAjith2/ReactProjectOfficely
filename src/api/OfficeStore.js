import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';

const OfficeStore = create((set) => ({
	offices: [],
	setOffices: 
        (offices) => set({ offices }),
  fetchOffices: 
      async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*', 
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  fetchOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  addOffice:
      async (office) => fetch(`${url}/offices`, {
        method: 'POST',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ office })
      }),
  updateOffice:
      async (office) => fetch(`${url}/offices/${office.id}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ office })
      }),
  deleteOffice:
      async (office) => fetch(`${url}/offices/${office.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
      })
}))

export default OfficeStore;