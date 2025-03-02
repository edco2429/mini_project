import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        setTimeout(() => {
          dispatch(
            updateUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            })
          );
        }, 1500);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user != null) {
            toast.success("You are successfully logged in!", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/editor");
            }, 1500);
          } else {
            toast.error("There was an error signing you in!", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    } else {
      alert("Please fill all the fields and make sure the passwords match!");
    }
    setemail("");
    setpassword("");
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
            <h2 className="text-gray-200 font-bold text-2xl ">CSI FCRIT</h2>
            <div className="auth flex items-center">
              <Link to={"/signup"}>
                <button className="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100">
                  Sign up
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
                {/* <h1 className="text-4xl font-bold text-white tracking-wide">
                  Brand
                </h1> */}
                <h2 className="text-4xl font-bold text-white tracking-wide">
                  Welcome <span className="text-gray-800"> back</span>
                </h2>
                {/* <p className="text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <span className="text-white">
                  Create New Account?
                  {/* <a href="#" className="text-gray-900 text-lg ml-2 font-bold">
                    Sign Up
                  </a> 
                </span> */}
              </div>
              <div className="w-full md:max-w-md mt-6">
                <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                  <form>
                    <div className="flex items-center justify-center">
                      <h2 className="text-2xl font-bold tracking-wide">
                        Welcome back
                      </h2>
                    </div>
                    <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                      Sign In
                    </h2>
                    <input
                      value={email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Email Address"
                    />
                    <input
                      value={password}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Password"
                    />
                    <div className="flex items-center justify-between">
                      {/* <a className="text-gray-600">
                        Forgot Password?
                      </a> */}
                      <button
                        className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md mx-auto"
                        onClick={handleSubmit}
                      >
                        Sign In
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

export default Login;
