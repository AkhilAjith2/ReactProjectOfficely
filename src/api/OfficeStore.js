import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const OfficeStore = create((set) => ({
    offices: [],
    setOffices:
        (offices) => set({ offices }),
<<<<<<< HEAD
    fetchOffices:
        async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }}),
    fetchOffice:
        async (officeId) => fetch(`${url}/offices/${officeId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }}),
    addOffice: (office) => {
        let newData = {
            availableFrom: formatDateTime(office.availableFrom),
            availableTo: formatDateTime(office.availableTo),
        };
        office = { ...office, ...newData };
        office = { ...office, pricePerDay: parseFloat(office.pricePerDay) };
        console.log(office);


        return fetch(`${url}/offices`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
            },
            body: JSON.stringify([office]), // Wrap the office object in an array
        });
    },

    updateOffice:
        (office) =>
        {
            let newData = {
                availableFrom : formatDateTime(office.availableFrom),
                availableTo : formatDateTime(office.availableTo) }
            office = { ...office, ...newData }
            office = { ...office, pricePerDay: parseFloat(office.pricePerDay)}

            return fetch(`${url}/offices/${office.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
                body: JSON.stringify(office)
            })
        },
    deleteOffice:
        async (office) => fetch(`${url}/offices/${office.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
        })
=======
  fetchOffices: 
      async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  fetchOffice:
      async (officeId) => fetch(`${url}/offices/${officeId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
      }}),
  addOffice:
      (office) => 
      {
        let newData = { 
          availableFrom : formatDateTime(office.availableFrom), 
          availableTo : formatDateTime(office.availableTo) }
        office = { ...office, ...newData }
        office = { ...office, pricePerDay: parseFloat(office.pricePerDay)}
        
        fetch(`${url}/offices`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify(office)
      })
    },
  updateOffice:
      (office) => 
      {
        let newData = { 
          availableFrom : formatDateTime(office.availableFrom), 
          availableTo : formatDateTime(office.availableTo) }
        office = { ...office, ...newData }
        office = { ...office, pricePerDay: parseFloat(office.pricePerDay)}

        return fetch(`${url}/offices/${office.id}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
        body: JSON.stringify(office)
        })
      },
  deleteOffice:
      async (office) => fetch(`${url}/offices/${office.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
      })
>>>>>>> 680f586b2b92cf6216c4ff262f70645221c68ff7
}))

const formatDateTime = (dateTime) =>
{
<<<<<<< HEAD
    return dateTime.substring(0,19);
=======
  return dateTime.substring(0, dateTime.length - 6);
>>>>>>> 680f586b2b92cf6216c4ff262f70645221c68ff7
}

export default OfficeStore;