import { useEffect, useState } from "react";
import AddButton from "../../components/common/addButton";
import DataTable from "../../components/common/DataTable";
import { Form, Formik } from "formik";
import Text from "../../components/common/textbutton";
import {
  deleteData,
  getData,
  postData,
  postOneData,
} from "../../Api/apiRequest";
import OpenModel from "../../components/common/model";
import Checkinputbox from "../../components/common/checkbox";
import { Button, Popconfirm } from "antd";
import Upload from "../../components/common/upload";
import { ToastSuccess } from "../../components/common/toast";
// import BrannervalidationSchema from "./brannervalidation";
import "../../Admin/common.css";
import categoryvalidationSchema from "./categoryValidation";
const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const [editData, setEditData] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getData("category");
      console.log("res", res);
      setData(Array.isArray(res.data?.data) ? res.data?.data : []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCancel = (formik) => {
    formik.resetForm();
    setEditData(null);
    setOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    try {
        console.log("values",values)
      const payload = {
        title: values.title,
        subTitle: values.subTitle,

highlight:values.highlight,
        content: values.content,
        Active: values.Active,
         img: values.img,
      };

      if (editData) {
        await postOneData("category", payload, editData._id);
        ToastSuccess("category Updated Successfully");
      } else {
        await postData("category", payload);
        ToastSuccess("category Added Successfully");
      }

      fetchUsers();
      setOpen(false);
      setEditData(null);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("category", id);
      setData((prev) => prev.filter((item) => item._id !== id));
      ToastSuccess("category deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const toggleActive = async (record) => {
    try {
      await postOneData("category", { Active: !record.Active }, record._id);
      ToastSuccess("category updated successfully");
      fetchUsers();
    } catch (err) {
      console.error("Active toggle failed", err);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
   
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
          className="
          
          
          
          "
          text="Add Category"
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
          title: editData?.title || "",
          subTitle: editData?.subTitle || "",

          highlight:editData?.highlight || "",

          content: editData?.content || "",
            img: editData?.img || [""], 
          Active: editData?.Active ?? true,

          isEdit: !!editData,
        }}
        validationSchema={categoryvalidationSchema}
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
                  text="Title"
                  name="title"
                  placeholder="Enter title"
                  required={true}
                />
              </div>

               <div className="mb-3">
                <Text
                  text="SubTitle"
                  name="subTitle"
                  placeholder="Enter subTitle"
                  required={true}
                />
                </div>

              <div className="mb-3">
                <Text
                  text="highlight"
                  name="highlight"
                  placeholder="Enter content"
                  required={true}
                />
              </div>

              <div className="mb-3">
                <Text
                  text="Content"
                  name="content"
                  placeholder="Enter content"
                  required={true}
                />
              </div>

              <div className="mb-3">
               {formik.values.img?.map((url, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Upload
                      formik={formik}
                      name={`img[${index}]`} 
                      limit={1}
                      existingImages={url} 
                      pdfimagepathname="category"
                      settingname="category"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <Checkinputbox name="Active" label="Active" />
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
export default Category;
