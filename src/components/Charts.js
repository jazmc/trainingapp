import { React, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import _ from "lodash";

export default function Charts(props) {
  const [cdata, setCdata] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

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

  const cData = _(trainings)
    .groupBy(_.lowerCase("activity"))
    .map((a, id) => ({
      activity: id,
      duration: _.sumBy(a, _.lowerCase("duration")),
    }))
    .value();

  useEffect(() => {
    setCdata(cData);
  }, [trainings]);

  console.log(trainings);
  console.log(cdata);

  return (
    <div style={{ height: "calc(100vh - 112px)" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={300} height={40} data={cData}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#c89466" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
