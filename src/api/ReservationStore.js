import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';

const ReservationStore = create((set) => ({
    reservations: [],
    setReservations: 
        (reservations) => set({ reservations }),
    fetchReservationsForOffice:
        async (pageSize, pageNum, officeId) => fetch(`${url}/reservations?pageSize=${pageSize}&pageNum=${pageNum}&officeId=${officeId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    fetchReservation:
        async (reservationId) => fetch(`${url}/reservations/${reservationId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    updateReservation: async (reservationId, updatedData) => {
       return fetch(`${url}/reservations/${reservationId}`, {
         method: 'PUT',
         headers: {
           'Accept': '*/*',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
         },
         body: JSON.stringify(updatedData)
       });
     },
    deleteReservation:
        async (reservationId) => fetch(`${url}/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }})
}))

export default ReservationStore ;