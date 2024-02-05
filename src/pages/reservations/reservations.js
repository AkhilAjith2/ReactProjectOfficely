// ReservationsTable.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
} from "@mui/material";
import Table from '@mui/joy/Table';
import ReservationStore from "../../api/ReservationStore";


const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch reservations data when the component mounts
    ReservationStore.getState()
      .fetchReservationsForOffice(20, 0, id) // Assuming `id` is available
      .then((response) => response.json())
      .then((data) => {
        console.log("Reservations:", data);
        setReservations(data);
      })
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  const formatDate = (dateTimeString) => {
    try {
      // Extracting year, month, and day from the date-time string
      const [datePart] = dateTimeString.split("T");
      return datePart;
    } catch (error) {
      console.error(`Error parsing date: ${error.message}`);
      return "Invalid Date";
    }
  };

  const extractTime = (dateTimeString) => {
    try {
      const [, timePart] = dateTimeString.split("T");
      const [hours, minutes] = timePart.split(":");
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error(`Error extracting time: ${error.message}`);
      return "Invalid Time";
    }
  };

  const onDelete = async (reservationId) => {
    try {
      setReservations((prevReservations) => {
        // Filter out the deleted reservation
        const updatedReservations = prevReservations.filter((reservation) => reservation.id !== reservationId);
  
        console.log(`Updated Reservations: ${JSON.stringify(updatedReservations)}`);
  
        return updatedReservations;
      });
  
      await ReservationStore.getState().deleteReservation(reservationId);
  
      console.log(`Reservation deleted successfully: ${reservationId}`);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Typography sx={{marginTop: "2%", marginLeft: "2.5%"}}>
            <h2>Reservations for Office Space</h2>
      </Typography>
      <Box sx={{marginTop: "5%",marginLeft:"2.5%", width: "95%"}}>
      <Table hoverRow size="lg" variant ="plain" >
          <thead>
            <tr>
              <th>User ID</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Actions</th>

              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.userId}</td>
                <td>{formatDate(reservation.startDateTime)}</td>
                <td>{extractTime(reservation.startDateTime)}</td>
                <td>{formatDate(reservation.endDateTime)}</td>
                <td>{extractTime(reservation.endDateTime)}</td>
                <td>
                    <Button variant="outlined" color="error" onClick = {() => onDelete(reservation.id)}>
                        Delete
                    </Button>
                </td>
                {/* Add more table cells if needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </div>
  );
};


export default ReservationsTable;