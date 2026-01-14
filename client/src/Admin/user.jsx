import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Modal, Input, Popconfirm, message, Table, Switch } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { getData, postData, postOneData, deleteData } from "../Api/apiRequest";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getData("users");
      setUsers(res.data?.data || []);
    } catch (error) {
      console.error(error);
      message.error("Error fetching users");
    }
  };

  /* ================= MODAL ================= */
  const handleOpen = (user = null) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingUser(null);
    setOpen(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      const res = await deleteData("users", id);

      if (res.data?.success) {
        message.success("User deleted successfully");

        // ✅ update table instantly
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        message.error(res.data?.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting user");
    }
  };

  /* ================= FORM ================= */
const initialValues = editingUser
  ? {
      name: editingUser.name,
      username: editingUser.username,
      password: "",
      active: editingUser.active ?? true,
    }
  : {
      name: "",
      username: "",
      password: "",
       active: true,
    };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    username: Yup.string().required("Username required"),
    password: Yup.string().required("Name required"),
    active: Yup.boolean(),

  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("values",values)
    try {
      setLoading(true);

      if (editingUser) {
        // ✏️ EDIT
        const res = await postOneData("users", values, editingUser._id);

        if (res.data?.success) {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === editingUser._id ? res.data.data : u
            )
          );
          message.success("User updated");
        } else {
          message.error(res.data?.message || "Update failed");
        }
      } else {
        // ➕ CREATE
        const res = await postData("users", values);

        if (res.data?.success) {
          setUsers((prev) => [...prev, { ...res.data.data, active: values.active }]);
          message.success("User added");
        } else {
          message.error(res.data?.message || "Create failed");
        }
      }

      resetForm();
      handleClose();
    } catch (error) {
      console.error(error);
      message.error("Error saving user");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Username", dataIndex: "username" },

    { 
  title: "Active",
  dataIndex: "active",
  render: (v) => (v ? "True" : "False"),
},

    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="outlined"
            startIcon={<EditOutlined />}
            onClick={() => handleOpen(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>User Management</h2>

      <Button
        variant="contained"
        onClick={() => handleOpen()}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>

      <Table rowKey="_id" columns={columns} dataSource={users} />

      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        title={editingUser ? "Edit User" : "Add User"}
        destroyOnClose
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FieldBlock label="Name" name="name" />
            <FieldBlock label="Username" name="username" />
            <FieldBlock label="password" name="password" />
            <div style={{ marginBottom: 12 }}>
  <label>Active</label>
  <Field name="active">
    {({ field, form }) => (
      <Switch
        checked={field.value}
        onChange={(val) => form.setFieldValue("active", val)}
      />
    )}
  </Field>
</div>



            

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

/* ===== Reusable Field ===== */
const FieldBlock = ({ label, name }) => (
  <div style={{ marginBottom: 12 }}>
    <label>{label}</label>
    <Field name={name}>
      {({ field }) => <Input {...field} />}
    </Field>
    <div style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </div>
  </div>
);

export default UserTable;
