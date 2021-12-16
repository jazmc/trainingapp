import React, { useState, useEffect } from "react";
import { Calendar as Cal, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Calendar() {
  const [trainings, setTrainings] = useState([]);
  const localizer = momentLocalizer(moment);
  let allViews = Object.keys(Views).map((k) => Views[k]);

  let formats = {};

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const events = trainings.map(
    (trg) =>
      (trg = {
        allDay: false,
        title:
          moment(trg.date).format("HH:mm") +
          " " +
          trg.customer.lastname +
          ", " +
          trg.customer.firstname +
          ": " +
          trg.activity +
          " (" +
          trg.duration +
          " min)",

        start: moment(trg.date).toDate(),
        end: moment(trg.date).add(trg.duration, "minutes").toDate(),
      })
  );

  return (
    <div style={{ height: "calc(100vh - 112px)" }}>
      <Cal
        selectable
        events={events}
        localizer={localizer}
        views={allViews}
        defaultView="week"
        formats={formats}
        onSelectEvent={(event) => alert(event.title)}
      />
    </div>
  );
}
