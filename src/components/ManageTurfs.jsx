// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// function ManageTurfs() {
//   const [turfs, setTurfs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const turfsPerPage = 5;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTurfs();
//   }, []);

//   const fetchTurfs = async () => {
//     try {
//       const response = await axios.get("https://cricket-box-booking.onrender.com/api/admin/my-turfs", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//       });
//       if (response.status >= 200 && response.status < 300) {
//         setTurfs(response.data.turfs);
//       } else {
//         toast.error("Failed to load turfs.", { position: "top-center", autoClose: 3000, theme: "colored" });
//       }
//     } catch (error) {
//       toast.error("Error fetching turfs.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`https://cricket-box-booking.onrender.com/api/admin/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//       });
//       if (response.status >= 200 && response.status < 300) {
//         toast.success("Turf deleted successfully!", { position: "top-center", autoClose: 1500, theme: "colored" });
//         fetchTurfs();
//       } else {
//         toast.error("Failed to delete turf.", { position: "top-center", autoClose: 1500, theme: "colored" });
//       }
//     } catch (error) {
//       toast.error("Error deleting turf.", { position: "top-center", autoClose: 1500, theme: "colored" });
//     }
//   };

//   const turfsToDisplay = turfs.filter((turf) => turf.name.toLowerCase().includes(searchQuery.toLowerCase()));
//   const totalPages = Math.ceil(turfsToDisplay.length / turfsPerPage);
//   const indexOfLastTurf = currentPage * turfsPerPage;
//   const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
//   const currentTurfs = turfsToDisplay.slice(indexOfFirstTurf, indexOfLastTurf);

//   return (
//     <div className="manage-turfs">
//       <h2>Manage Turfs</h2>

//       <input type="text" placeholder="Search turfs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

//       <table className="turf-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Address</th>
//             <th>City</th>
//             <th>Landmark</th>
//             <th>Zipcode</th>
//             <th>Location</th>
//             <th>Contact Email</th>
//             <th>Contact Phone</th>
//             <th>Time Slots</th>
//             <th>Images</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentTurfs.length > 0 ? (
//             currentTurfs.map((turf) => (
//               <tr key={turf._id}>
//                 <td>{turf.name}</td>
//                 <td>{turf.address1} {turf.address2 ? `, ${turf.address2}` : ""}</td>
//                 <td>{turf.city}</td>
//                 <td>{turf.landmark}</td>
//                 <td>{turf.zipcode}</td>
//                 <td>{`Lat: ${turf.location.lat}, Lng: ${turf.location.lng}`}</td>
//                 <td>{turf.contactDetails.email}</td>
//                 <td>{turf.contactDetails.phone}</td>
//                 <td>
//                   {turf.timeSlots.map((slot, index) => (
//                     <div key={index}>
//                       {slot.startTime} - {slot.endTime} ({slot.price})
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                  <div className="image-container">
//                     {turf.images &&
//                       turf.images.map((image, index) => (
//                         <img
//                           key={index}
//                           src={`https://cricket-box-booking.onrender.com/${image}`}
//                           alt={`${turf.name} - ${index}`}
//                           style={{ width: "80px", height: "50px", margin: "2px" }}
//                           // onError={(e) => (e.target.src = "https://via.placeholder.com/80x50")}
//                         />
//                       ))}
//                   </div>
//                 </td>
//                 <td>
//                   <button onClick={() => navigate("/updateturf", { state: { turf } })}>✏️ Update</button>
//                   <button onClick={() => handleDelete(turf._id)}>❌ Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No turfs found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//         <div className="pagination">
//           <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>⬅️ Prev</button>
//           <span> Page {currentPage} of {totalPages} </span>
//           <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next ➡️</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageTurfs;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ManageTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const turfsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await axios.get("https://cricket-box-booking.onrender.com/api/admin/my-turfs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (response.status >= 200 && response.status < 300) {
        setTurfs(response.data.turfs);
      } else {
        toast.error("Failed to load turfs.", { position: "top-center", autoClose: 3000, theme: "colored" });
      }
    } catch (error) {
      toast.error("Error fetching turfs.", { position: "top-center", autoClose: 3000, theme: "colored" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://cricket-box-booking.onrender.com/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Turf deleted successfully!", { position: "top-center", autoClose: 1500, theme: "colored" });
        fetchTurfs();
      } else {
        toast.error("Failed to delete turf.", { position: "top-center", autoClose: 1500, theme: "colored" });
      }
    } catch (error) {
      toast.error("Error deleting turf.", { position: "top-center", autoClose: 1500, theme: "colored" });
    }
  };

  const turfsToDisplay = turfs.filter((turf) => turf.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(turfsToDisplay.length / turfsPerPage);
  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  const currentTurfs = turfsToDisplay.slice(indexOfFirstTurf, indexOfLastTurf);

  return (
    <div className="manage-turfs">
      <h2>Manage Turfs</h2>

      <input type="text" placeholder="Search turfs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <table className="turf-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Landmark</th>
            <th>Zipcode</th>
            {/* <th>Location</th> */}
            <th>Contact Email</th>
            <th>Contact Phone</th>
            <th>Time Slots</th>
            <th>Images</th>
            {/* <th>Price</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTurfs.length > 0 ? (
            currentTurfs.map((turf) => (
              <tr key={turf._id}>
                <td>{turf.name}</td>
                <td>{turf.address1} {turf.address2 ? `, ${turf.address2}` : ""}</td>
                <td>{turf.city}</td>
                <td>{turf.landmark}</td>
                <td>{turf.zipcode}</td>
                {/* <td>{`Lat: ${turf.location.lat}, Lng: ${turf.location.lng}`}</td> */}
                <td>{turf.contactDetails.email}</td>
                <td>{turf.contactDetails.phone}</td>
                
                <td style={{fontSize:"15px"}}>
                  {turf.timeSlots.map((slot, index) => (
                    <ol>
                    <li key={index}>
                      {slot.startTime} - {slot.endTime} ({slot.price})
                    </li>
                    </ol>
                  ))}
                </td>
                
                <td>
                  <div className="image-container">
                    {turf.images &&
                      turf.images.map((image, index) => (
                        <img
                          key={index}
                          src={`https://cricket-box-booking.onrender.com/${image}`}
                          alt={`${turf.name} - ${index}`}
                          style={{ width: "80px", height: "50px", margin: "2px" }}
                        />
                      ))}
                  </div>
                </td>
                <td>
                  <button onClick={() => navigate("/updateturf", { state: { turf } })}>✏️ Update</button>
                  <br></br>
                  <button onClick={() => handleDelete(turf._id)}>❌ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No turfs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTurfs;
