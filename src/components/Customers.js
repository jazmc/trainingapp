import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

export default function Customers() {
  const [dopen, setDopen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deletes, setDeletes] = useState([]);
  const [editing, setEditing] = useState([]);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleClickDopen = () => {
    setDopen(true);
  };

  const editCustomer = (url, customer) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Customer edited successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Customer added successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Training added successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomers = (arr) => {
    console.log(arr);
    if (
      window.confirm(
        "Are you sure you want to delete selected customers (" +
          arr.length +
          ") and all their training records?"
      )
    ) {
      arr.map((d) => deleteApiCall(d));
    }
  };

  const deleteApiCall = (url) => {
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setMessage("Customers deleted successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      label: "First name",
      name: "firstname",
      options: { sort: true, filter: true },
    },
    {
      label: "Last name",
      name: "lastname",
      options: { sort: true, filter: true },
    },
    {
      label: "Email",
      name: "email",
      options: { sort: true, filter: true },
    },
    {
      label: "Address",
      name: "streetaddress",
      options: { sort: true, filter: true },
    },
    {
      label: "Phone",
      name: "phone",
      options: { sort: true, filter: true },
    },
    {
      label: "Link",
      name: "links",
      options: {
        display: false,
        sortable: false,
        filter: true,
        customBodyRender: (value) => {
          if (value != null) {
            return value[0].href;
          }
        },
      },
    },

    {
      label: "Actions",
      name: "links",
      options: {
        sortable: false,
        filter: true,
        customBodyRender: (value) => {
          if (value != null) {
            return (
              <React.Fragment>
                <EditCustomer
                  editCustomer={editCustomer}
                  editing={editing}
                  value={value[0].href}
                />
                <AddTraining
                  customer={editing}
                  customerUrl={editing.links}
                  addTraining={addTraining}
                />
              </React.Fragment>
            );
          }
        },
      },
    },
  ];

  const customIcon = () => {
    return (
      <React.Fragment>
        <Tooltip title={"Add new customer"}>
          <IconButton
            className="MUIDataTableToolbar-icon-274"
            onClick={handleClickDopen}
          >
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  const options = {
    filterType: "dropdown",
    onRowSelectionChange: (currentSelect, allSelected) => {
      const result = allSelected.map((item) => {
        return customers.at(item.dataIndex);
      });
      const selectedIds = result.map((item) => {
        return item.links[0].href;
      });
      const current = currentSelect.map((item) => {
        return customers.at(item.dataIndex);
      });
      setEditing(current[0]);
      console.log("Editing below:");
      console.log(editing);
      setDeletes(selectedIds);
    },
    onRowsDelete: (e) => {
      deleteCustomers(deletes);
      return false;
    },
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: true,
    customToolbar: customIcon,
  };

  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <React.Fragment>
      <AddCustomer
        addCustomer={addCustomer}
        dopen={dopen}
        setDopen={setDopen}
      />
      <ThemeProvider theme={theme}>
        <MUIDataTable
          data={customers}
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
