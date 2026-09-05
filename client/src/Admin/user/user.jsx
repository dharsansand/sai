import { useEffect, useState } from "react";
import AddButton from "../../components/common/addButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Popconfirm } from "antd";
import OpenModel from "../../components/common/model";
import DataTable from "../../components/common/DataTable";
import {
  deleteData,
  getData,
  postData,
  postOneData,
} from "../../Api/apiRequest";
import uservalidationSchema from "./uservalidation";
import Text from "../../components/common/textbutton";
import PasswordInput from "../../components/common/password";

import Checkinputbox from "../../components/common/checkbox";
import { ToastSuccess, ToastError } from "../../components/common/toast";
import "../../Admin/common.css";
import { useGetUsersQuery } from "../../services/users";

const User = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

 const { data: users = [], isLoading, refetch } = useGetUsersQuery();
   const data = Array.isArray(users) ? users : [];
 
   const fetchUsers = () => {
     refetch();
   };
  
  
  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= MODAL CANCEL =================
  const handleCancel = (formik) => {
    formik.resetForm();
    setEditData(null);
    setOpen(false);
  };

  // ================= ADD / EDIT =================
  const handleSubmit = async (values, actions) => {
    try {
      if (editData) {
        await postOneData("users", values, editData._id);
       ToastSuccess("User Edited successfully");

      } else {
        await postData("users", values);
       ToastSuccess("User created successfully");

      }

      
      await fetchUsers();

      actions.resetForm();
      setEditData(null);
      setOpen(false);
    } catch (error) {
      console.error("User save failed", error);
      ToastError("User save failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteData("users", id);
      setData((prev) => prev.filter((item) => item._id !== id));
      ToastSuccess("User deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const toggleActive = async (record) => {
  try {
    await postOneData("users", { Active: !record.Active }, record._id);
    ToastSuccess("User updated successfully");
    fetchUsers();
  } catch (err) {
    console.error("Active toggle failed", err);
  }
};


  // ================= TABLE COLUMNS =================
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Username", dataIndex: "username" },
  {
  title: "Active",
  render: (_, record) => (
    <input
      type="checkbox"
      checked={record.Active}
      onChange={() => toggleActive(record)}
    />
  ),
},

    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
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
       <div className="addBannerWrapper">
      <AddButton
       className="commonAddstyle"
        text="Add User"
        setOpen={() => {
          setEditData(null);
          setOpen(true);
        }}
      />
      </div>

      <DataTable data={data} columns={columns} />

      <Formik
        enableReinitialize
        initialValues={{
          name: editData?.name || "",
          username: editData?.username || "",
          password: "",
          Active: editData?.Active ?? true,
          isEdit: !!editData,
        }}
        validationSchema={uservalidationSchema}
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
                <Text
                  text="Name"
                  name="name"
                  placeholder="Enter name"
                  required={true}
                />
              </div>

              <div className="mb-3">
                <Text
                  text="User Name"
                  name="username"
                  placeholder="Enter user Name"
                  required={true}
                />
              </div>

              {!editData && (
                <PasswordInput
                  text="Password"
                  name="password"
                  formik={formik}
                  required={true}
                />
              )}

              <div className="mb-3">
               <Checkinputbox   name="Active" label="Active" />

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
