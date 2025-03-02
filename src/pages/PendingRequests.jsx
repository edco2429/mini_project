import { useEffect, useState } from "react";
import {
  getDocs,
  db,
  doc,
  updateDoc,
  setDoc,
  auth,
  createUserWithEmailAndPassword,
} from "../firebaseConfig";
import { collection } from "firebase/firestore";
import "../pendingRequests.css";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [eventRequests, seteventRequests] = useState([]);
  const [user, setuser] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showEventApproval, setshowEventApproval] = useState(false);

  useEffect(() => {
    // Fetch pending requests from Firebase
    const fetchRequests = async () => {
      const tempArr = [];
      const tempEveArr = [];
      const querySnapshot = await getDocs(collection(db, "requests"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        tempArr.push({ id: doc.id, ...doc.data() });
      });
      setRequests(tempArr);
      const querySs = await getDocs(collection(db, "event_requests"));
      querySs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        tempEveArr.push({ id: doc.id, ...doc.data() });
      });
      seteventRequests(tempEveArr);
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus, password) => {
    const reqRef = doc(db, "requests", requestId);
    // Update status in Firebase
    await updateDoc(reqRef, {
      status: newStatus,
    });
    if (newStatus === "approved") {
      await createUserWithEmailAndPassword(auth, requestId, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setuser(user);
          // console.log("user created successfully", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode, errorMessage);
        });
    }
    // Update local state
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleEventStatusChange = async (requestId, newStatus) => {
    const reqRef = doc(db, "event_requests", requestId);
    // Update status in Firebase
    await updateDoc(reqRef, {
      status: newStatus,
    });

    // Update local state
    seteventRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleRoleChange = async (requestId, newRole, committee) => {
    // Update role in Firebase
    const reqRef = doc(db, `FCRIT/${committee}/users`, requestId);
    setDoc(
      reqRef,
      {
        role: newRole,
        uid: user?.uid,
        name: user.name,
        email: user.email,
        committee,
      },
      { merge: true }
    );

    // Update local state
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, role: newRole } : request
      )
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    if (
      e.target.email.value === "admin@123" &&
      e.target.password.value === "admin"
    ) {
      setisLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Pending Requests</h1>
      {isLoggedIn ? (
        <>
          {showEventApproval ? (
            <table className="table">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">Name of committee</th>
                  <th className="th">Event</th>
                  <th className="th">Dates</th>
                  <th className="th">Timings</th>
                  <th className="th">Venue</th>
                  <th className="th">Status</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {eventRequests.map((request) => {
                  // console.log("request", request);
                  return (
                    <tr className="tr" key={request.id}>
                      <td className="td">{request["organizing-committee"]}</td>
                      <td className="td">{request["event-name"]}</td>
                      <td className="td">{`${request["start-date"]} to ${request["end-date"]}`}</td>
                      <td className="td">{request["event-timings"]}</td>
                      <td className="td">{request["event-location"]}</td>
                      <td className="td">{request.status}</td>
                      <td className="flex gap-4">
                        <button
                          className="approved button"
                          onClick={() =>
                            handleEventStatusChange(request.id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="rejected button"
                          onClick={() =>
                            handleEventStatusChange(request.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="table">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">Name</th>
                  <th className="th">Email</th>
                  <th className="th">Status</th>
                  <th className="th">Role</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {requests.map((request) => {
                  // console.log("request", request);
                  return (
                    <tr className="tr" key={request.id}>
                      <td className="td">{request.name}</td>
                      <td className="td">{request.email}</td>
                      <td className="td">{request.status}</td>
                      <td className="td">{request.role}</td>
                      <td className="flex gap-4">
                        <button
                          className="approved button"
                          onClick={() =>
                            handleStatusChange(
                              request.id,
                              "approved",
                              request.password
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="rejected button"
                          onClick={() =>
                            handleStatusChange(
                              request.id,
                              "rejected",
                              request.password
                            )
                          }
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            handleRoleChange(
                              request.id,
                              "Head",
                              request.committee
                            )
                          }
                          className="button"
                        >
                          Change Role to "Head"
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="flex gap-6 justify-center">
            <button
              className="px-4 py-2 bg-indigo-500 rounded-xl text-white"
              onClick={() => setshowEventApproval(false)}
            >
              View Website Login Requests
            </button>
            <button
              className="px-4 py-2 bg-indigo-500 rounded-xl text-white"
              onClick={() => setshowEventApproval(true)}
            >
              View Event Approval Requests
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Please Log In</h1>
          <form onSubmit={handleLogin} className="flex-col flex gap-8 w-1/3">
            <input
              className="pl-2 rounded-lg outline-none border-2 border-gray-300"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleLoginChange}
            />
            <input
              className="pl-2 rounded-lg outline-none border-2 border-gray-300"
              onChange={handleLoginChange}
              type="password"
              placeholder="Password"
              name="password"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-500 text-white rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
