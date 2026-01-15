import { useEffect, useState } from "react";
import AddButton from "../../components/common/addButton";
import { Formik, Form, Field } from "formik";
import { Button, Popconfirm } from "antd";
import OpenModel from "../../components/common/model";
import DataTable from "../../components/common/DataTable";

// Dummy data (replace with API later)
const initialData = [
  { _id: 1, name: "John", email: "john@gmail.com" },
  { _id: 2, name: "Smith", email: "smith@gmail.com" },
];

const User = () => {
  // Modal open/close
  const [open, setOpen] = useState(false);

  // Table data
  const [data, setData] = useState([]);

  // To check edit or add
  const [editData, setEditData] = useState(null);

  // Load table data
  useEffect(() => {
    setData(initialData);
  }, []);

  // Cancel modal
  const handleCancel = (formik) => {
    formik.resetForm();
    setEditData(null);
    setOpen(false);
  };

  // Handle form submit (ADD / EDIT)
  const handleSubmit = (values, actions) => {
    if (editData) {
      // EDIT USER
      const updated = data.map((item) =>
        item._id === editData._id ? { ...item, ...values } : item
      );
      setData(updated);
    } else {
      // ADD USER
      setData([
        ...data,
        { _id: Date.now(), ...values },
      ]);
    }

    actions.resetForm();
    setEditData(null);
    setOpen(false);
  };

  // Edit click
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // Delete click
  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          {/* Edit Button */}
          <Button
            type="link"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      
      <AddButton
        text="Add User"
        setOpen={() => {
          setEditData(null);
          setOpen(true);
        }}
      />

     
      <DataTable data={data} columns={columns} />


      <Formik
        enableReinitialize
        initialValues={{
          name: editData?.name || "",
          email: editData?.email || "",
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <OpenModel
            open={open}
            setOpen={setOpen}
            formik={formik}
            handleCancel={handleCancel}
          >
            <Form>
              <div className="mb-3">
                <label>Name</label>
                <Field name="name" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <Field name="email" className="form-control" />
              </div>

              <Button type="primary" htmlType="submit">
                {editData ? "Update" : "Save"}
              </Button>
            </Form>
          </OpenModel>
        )}
      </Formik>
    </>
  );
};

export default User;
