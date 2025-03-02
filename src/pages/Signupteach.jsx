import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, setDoc, doc } from "../firebaseConfig";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [department, setdepartment] = useState("");
  const [id, setid] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else if (e.target.name === "password") {
      setpassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setcpassword(e.target.value);
    } else if (e.target.name === "department") {
      setdepartment(e.target.value);
    } else if (e.target.name === "id") {
      setid(e.target.value);
    }
  }; // Added missing closing bracket here

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password === cpassword &&
      (password !== "" && cpassword !== "" && email !== "" && department !== "" && id !== "")
    ) {
      const reqRef = doc(db, "requests", email);
      setDoc(
        reqRef,
        { name, email, department, password, id, status: "pending" },
        { merge: true }
      )
        .then(() => {
          emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
              from_name: "Arjun",
              to_name: "H.O.D",
              from_email: "arjun.varshney1423@gmail.com",
              to_email: "arjun.varshney1423@gmail.com",
              message: "You have a new request! Please check the admin panel!",
              subject: "Login access",
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
          );
          toast.success(
            "Your request has been sent! You will receive an email when the request is approved!",
            {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode, errorMessage);
          toast.error("An error occurred!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      alert("Please fill all the fields and make sure the passwords match!");
    }
    setname("");
    setemail("");
    setpassword("");
    setdepartment("");
    setcpassword("");
    setid("");
  };

  return (
    <div className="h-screen fixed w-full">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="bg-cover border-t-2 border-blue-600 h-full home-section">
        <div className="px-8 py-2">
          <nav className="flex items-center justify-between">
            <h2 className="text-gray-200 font-bold text-2xl">CSI FCRIT</h2>
            <div className="auth flex items-center">
              <Link to={"/login"}>
                <button className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">
                  Sign in
                </button>
              </Link>
            </div>
          </nav>
          <div className="body mt-20 mx-8">
            <div className="md:flex items-center justify-between">
              <div
                className="w-full md:w-1/2 mr-auto"
                style={{ textShadow: "0 20px 50px hsla(0,0%,0%,8)" }}
              >
                <h2 className="text-4xl font-bold text-white tracking-wide">
                  Welcome <span className="text-gray-800">Aboard</span>
                </h2>
                <p className="text-black font-semibold mt-4">
                  Unleashing the power of management
                </p>
              </div>
              <div className="w-full md:max-w-md mt-6">
                <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                  <form>
                    <div className="flex items-center justify-center">
                      <h2 className="text-2xl font-bold tracking-wide">
                        Welcome
                      </h2>
                    </div>
                    <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                      Sign Up
                    </h2>
                    <input
                      value={name}
                      name="name"
                      onChange={handleChange}
                      type="name"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Name"
                    />
                    <input
                      value={email}
                      name="email"
                      onChange={handleChange}
                      type="email"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Email Address"
                    />
                    <input
                      value={department}
                      name="department"
                      onChange={handleChange}
                      type="department"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Department"
                    />
                    <input
                      value={id}
                      name="id"
                      onChange={handleChange}
                      type="id"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="ID"
                    />
                    <input
                      value={password}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Password"
                    />
                    <input
                      value={cpassword}
                      name="cpassword"
                      onChange={handleChange}
                      type="password"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Confirm Password"
                    />

                    <div className="flex items-center justify-between">
                      <button
                        className="bg-gray-800 mx-auto text-gray-200 px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
