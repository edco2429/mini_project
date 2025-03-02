const Scheduler = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <table style={{ width: "100%", background: "white" }}>
        <tbody>
          <tr style={{ height: "50px" }}>
            <td style={{ width: "100%" }}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=c6cbd3ffb520ca81d432c247df1c06be2320acef99a5defa26ca2da7e957b4bf%40group.calendar.google.com&ctz=Asia%2FKolkata"
                style={{ border: "0" }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Scheduler;
