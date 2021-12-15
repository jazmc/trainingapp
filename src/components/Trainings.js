import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import moment from "moment";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deletes, setDeletes] = useState([]);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const formatDate = (value) => {
    return moment(value).format("dd.MM.yyyy HH:mm");
  };

  const deleteTrainings = (arr) => {
    console.log(arr);
    if (
      window.confirm(
        "Are you sure you want to delete selected trainings (" +
          arr.length +
          ")?"
      )
    ) {
      arr.map((d) => deleteApiCall(d));
    }
  };

  const deleteApiCall = (url) => {
    fetch(`https://customerrest.herokuapp.com/api/trainings/${url}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Trainings deleted successfully");
          setOpen(true);
          getTrainings();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      label: "Date",
      name: "date",
      options: {
        sortable: true,
        filter: true,
        customBodyRender: formatDate,
        sortOrder: "asc",
      },
    },
    {
      label: "Duration (min)",
      name: "duration",
      options: { sortable: true, filter: true },
    },
    {
      label: "Activity",
      name: "activity",
      options: { sortable: true, filter: true },
    },
    {
      label: "Customer",
      name: "customer",
      options: {
        sortable: false,
        filter: true,
        customBodyRender: (value) => {
          if (value != null) {
            return value.firstname + " " + value.lastname;
          }
        },
      },
    },
  ];

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

  const options = {
    filterType: "dropdown",
    sortOrder: { name: "date", direction: "desc" },
    onRowSelectionChange: (currentSelect, allSelected) => {
      const result = allSelected.map((item) => {
        return trainings.at(item.dataIndex);
      });
      const selectedIds = result.map((item) => {
        return item.id;
      });
      setDeletes(selectedIds);
    },
    onRowsDelete: (e) => {
      deleteTrainings(deletes);
      return false;
    },
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          data={trainings}
          columns={columns}
          options={options}
          pagination={true}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </ThemeProvider>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </React.Fragment>
  );
}
