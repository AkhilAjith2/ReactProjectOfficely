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
      async (office) => 
      {
        office = { ...office, availableFrom: formatDateTime(office.availableFrom) }
        office = { ...office, availableTo: formatDateTime(office.availableTo) }
        fetch(`${url}/offices`, {
        method: 'POST',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ office })
      })
    },
  updateOffice:
      async (office) => 
      {
        office = { ...office, availableFrom: formatDateTime(office.availableFrom) }
        office = { ...office, availableTo: formatDateTime(office.availableTo) }
        return fetch(`${url}/offices/${office.id}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify({ office })
        })
      },
  deleteOffice:
      async (office) => fetch(`${url}/offices/${office.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
      })
}))

const formatDateTime = (dateTime) =>
{
  const date = new Date(dateTime);
        
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
export default OfficeStore;