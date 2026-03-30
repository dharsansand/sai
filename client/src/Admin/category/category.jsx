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
import CategoryalidationSchema from "./categoryvalidation.jsx";
import "../../Admin/common.css";
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
      const payload = {
        ...values,
        category: values.category?.map((item) => {
          let processedImg = [];

          if (Array.isArray(item.img)) {
            processedImg = item.img.map((img) => {
              if (typeof img === "string") {
                return img.includes(config.file)
                  ? img.replace(`${config.file}/category/`, "")
                  : img;
              }

              if (img?.response?.file?.filename) {
                return img.response.file.filename;
              }

              return img?.name || "";
            });
          }

          return {
            ...item,
            img: processedImg,
          };
        }),
      };

      if (editData) {
        await postOneData("category", payload, editData._id);
        ToastSuccess("category Edited successfully");
      } else {
        await postData("category", payload);

        ToastSuccess("category created successfully");
      }

      await fetchUsers();
      actions.resetForm();
      setEditData(null);
      setOpen(false);
    } catch (error) {
      console.error("category save failed", error);
      ToastError("category save failed");
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
    { title: "Category Title", dataIndex: "categorytitle" },
   
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
          categorytitle: editData?.categorytitle || "",
        
          category: editData?.category || [{ img: "" }],
          Active: editData?.Active ?? true,

          isEdit: !!editData,
        }}
        validationSchema={CategoryalidationSchema}
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
                  text="category Title"
                  name="categorytitle"
                  placeholder="Enter title"
                  required={true}
                />
              </div>

             
            

              <div className="mb-3">
                {formik.values.category?.map((item, index) => (
                  <Upload
                    key={index}
                    formik={formik}
                    name={`category.${index}.img`}
                    limit={1}
                    existingImages={item.img || []}
                    pdfimagepathname="category"
                    settingname="category"
                    Category={item.mobile ? null : "category"}
                  />
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
