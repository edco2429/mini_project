import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <section className="bg-cover h-screen relative home-section">
        <div className="absolute top-0 left-0 p-4 transition duration-300">
          <a href="#" className="text-white text-sm hover:text-yellow-400">
            About Us
          </a>
        </div>
        <div className="absolute top-0 right-0 p-4 space-x-2 transition duration-300">
          <a
            href="https://www.instagram.com/"
            className="text-white text-3xl transform hover:scale-110 transition duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/"
            className="text-white text-3xl transform hover:scale-110 transition duration-300"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com/"
            className="text-white text-3xl transform hover:scale-110 transition duration-300"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.linkedin.com/"
            className="text-white text-3xl transform hover:scale-110 transition duration-300"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gap-6 flex justify-center pb-8 transition duration-300">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full border-2 border-yellow-400 hover:border-yellow-500 transition duration-300 transform hover:scale-110"
            onClick={() => {
              navigate("/signupteach");
            }}
          >
            Teacher
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full border-2 border-yellow-400 hover:border-yellow-500 transition duration-300 transform hover:scale-110"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Student
          </button>
        </div>
      </section>

      {/* <!-- Title --> */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition duration-300">
        <h1 className="text-6xl font-extrabold text-white hover:text-yellow-400 hover:scale-110">
          <span className="text-yellow-400">CSI - FCRIT</span>
        </h1>
        <h2 className="text-2xl font-semibold text-gray-200 mt-4">
          CSI-IT Registration Platform 
        </h2>
      </div>

      {/* <!-- Content --> */}
      <div className="container mx-auto py-8 px-4">
        {/* <!-- Your content goes here --> */}
      </div>
    </div>
  );
};

export default Home;
