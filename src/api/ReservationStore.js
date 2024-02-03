import { create } from 'zustand'
import LoginStore from './LoginStore';

const url = 'https://officely.azurewebsites.net';

const ReservationStore = create((set) => ({
    reservations: [],
    setReservations: 
        (reservations) => set({ reservations }),
    fetchReservations:
        async (pageSize, pageNum) => fetch(`${url}/reservations?pageSize=${pageSize}&pageNum=${pageNum}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    fetchReservation:
        async (reservationId) => fetch(`${url}/reservations/${reservationId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
    updateReservation:
        async (reservation) => fetch(`${url}/reservations/${reservation.id}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
            body: JSON.stringify({ reservation})
        }),
    deleteReservation:
        async (office) => fetch(`${url}/offices/${office.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*', 
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`
        }})
}))

export default ReservationStore ;