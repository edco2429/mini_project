import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../venue.css";
import { Floor } from "../components";
import { floorData } from "../data/dummy";
import { useSelector } from "react-redux";
import { getDoc, doc, db, setDoc } from "../firebaseConfig";

const Editor = () => {
  const user = useSelector((state) => state.user.value);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    "event-name": "",
    "event-location": "",
    "start-date": "",
    "end-date": "",
    "event-timings": "",
    "organizing-committee": "",
    desc: "",
    attachments: [],
    receiver: [],
  });
  const [venueModal, setvenueModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [headName, setheadName] = useState("");
  const [venue, setVenue] = useState(null);

  const handleClassClick = (title) => {
    setVenue(title);
  };

  const handleSave = () => {
    // console.log("Saved venue:", venue);
    setForm({ ...form, "event-location": `Room No. ${venue}` });
    // Here you can do whatever you want with the venue, like saving it to a database.
  };

  const message = `
I am writing on behalf of our entire team to seek your permission for conducting ${form["event-name"]} from ${form["start-date"]} till ${form["end-date"]} at ${form["event-location"]} from ${form["event-timings"]}.

We have already secured the necessary support from the respective staff and faculty members. ${form.desc}
I assure you that I will adhere to all guidelines and regulations set forth by the department and the institution throughout the process. Additionally, I am fully prepared to address any concerns or queries you may have regarding this matter.
Please find attached a detailed proposal outlining the event plan for your review.

Thank you for considering my request. Your support and guidance are invaluable to me, and I am grateful for the opportunity to seek your permission for this endeavour.

Please feel free to contact me at ${user?.email} if you require any further information or clarification regarding this request.

I look forward to your favorable response.

Warm regards,

${headName}
Head
${form["organizing-committee"]}
`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form", form);
    setIsLoading(true);
    await emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: "Arjun",
          to_name: form.name,
          from_email: "arjun.varshney1423@gmail.com",
          to_email: form.email,
          message: message,
          subject: form.subject,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        toast.success("Email sent successfully!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
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
    const cityRef = doc(db, "event_requests", user?.email);
    await setDoc(cityRef, { ...form }, { merge: true });
  };

  useEffect(() => {
    if (user) {
      const fetchDoc = async () => {
        const docRef = doc(db, "requests", `${user?.email}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setForm({
            ...form,
            "organizing-committee": docSnap.data().committee,
          });
          setheadName(docSnap.data().name);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      fetchDoc();
    }
  }, [user]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please fill the required details to send the email for requesting
              approval.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="event-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event name
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="event-name"
                    id="event-name"
                    autoComplete="event-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="event-location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Venue of the event
                </label>
                <div className="mt-2">
                  <input
                    required
                    onClick={() => {
                      setvenueModal(true);
                    }}
                    onChange={handleChange}
                    value={form["event-location"]}
                    type="text"
                    name="event-location"
                    id="event-location"
                    autoComplete="event-location"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date of the event
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleChange}
                    type="date"
                    name="start-date"
                    id="start-date"
                    autoComplete="start-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date of the event
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleChange}
                    type="date"
                    name="end-date"
                    id="end-date"
                    autoComplete="end-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="event-timings"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Timings of the event
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="event-timings"
                    id="event-timings"
                    autoComplete="event-timings"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="organizing-committee"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Organizing committee
                </label>
                <div className="mt-2">
                  <input
                    // onChange={handleChange}
                    disabled={true}
                    defaultValue={form["organizing-committee"]}
                    type="text"
                    name="organizing-committee"
                    id="organizing-committee"
                    autoComplete="organizing-committee"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={handleChange}
                    id="desc"
                    name="desc"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Please provide a brief description about the event.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="attachments"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attachments (if any)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="attachments"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={handleChange}
                          id="attachments"
                          name="attachments"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PDF, PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Receiver Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    required
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subject for email
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="subject"
                    id="subject"
                    autoComplete="subject"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
      {venueModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl space-y-8">
            <h1 className="h1">Main Building Foyer</h1>

            {floorData.map((floor, index) => (
              <Floor
                key={index}
                floorNumber={floor.floorNumber}
                classes={floor.classes}
                onClassClick={handleClassClick}
              />
            ))}

            <div className="legend">
              <h2>Legend</h2>
              <div className="legend-item">
                <div className="legend-box available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-box ongoing"></div>
                <span>Ongoing</span>
              </div>
              <div className="legend-item">
                <div className="legend-box occupied"></div>
                <span>Occupied</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => {
                  handleSave();
                  setvenueModal(false);
                }}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Editor;
