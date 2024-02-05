// // Reservations.js
// import Typography from '@mui/material/Typography';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useParams } from 'react-router-dom';
// import React, { useState,useEffect} from "react"
// import ReservationStore from '../../api/ReservationStore';
// const Reservations = ({ reservations }) => {
//     const { id } = useParams();
//     const [reservations, setReservations] = useState([]);
//     const formatDate = (dateTimeString) => {
//     const parsedDate = new Date(dateTimeString);

//     useEffect(() => {
//         ReservationStore.getState().fetchReservationsForOffice(20, 0, id)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log('Reservations:', data); 
//             setReservations(data);
//           })
//           .catch((error) => console.error('Error fetching reservations:', error));
//       }, []);

//     if (isNaN(parsedDate.getTime())) {
//       return 'Invalid Date';
//     }

//     const formattedDate = parsedDate.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });

//     return formattedDate;
//   };
 

//   return (
//     <div>
//       <Typography variant="h5" sx={{ marginBottom: 2 }}>
//         Reservations
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User ID</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reservations.map((reservation) => (
//               <TableRow key={reservation.id}>
//                 <TableCell>{reservation.userId}</TableCell>
//                 <TableCell>{formatDate(reservation.startDateTime)}</TableCell>
//                 <TableCell>{formatDate(reservation.endDateTime)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Reservations;
