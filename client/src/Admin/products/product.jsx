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
import { ToastSuccess } from "../../components/common/toast";
import "../../Admin/common.css";
import Select from "../../components/common/select";
import Editor from "../../components/common/Editer";
import CommonUpload from "../../components/common/upload";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  // Fetch Products for the Table
  const fetchUsers = async () => {
    try {
      const res = await getData("product");
      setData(Array.isArray(res.data?.data) ? res.data?.data : []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // Fetch Categories for Dropdown
  const fetchDropdownOptions = async () => {
    try {
      const res = await getData("category");
      const options = res.data?.data.map((item) => ({
        label: item.title,
        value: item._id,
      }));
      setDropdownOptions(options);
    } catch (error) {
      console.error("Failed to fetch dropdown options", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDropdownOptions();
  }, []);

  const handleCancel = (formik) => {
    formik.resetForm();
    setEditData(null);
    setOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    try {
      // CLEANUP: Remove empty strings from the img array before sending to API
      const filteredImages = values.img.filter((url) => url !== "" && url !== null);

      const payload = {
        ...values,
        img: filteredImages, // Send only valid image URLs
      };

      if (editData) {
        await postOneData("product", payload, editData._id);
        ToastSuccess("Product Updated Successfully");
      } else {
        await postData("product", payload);
        ToastSuccess("Product Added Successfully");
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

    const toggleActive = async (record) => {
      try {
        await postOneData("product", { Active: !record.Active }, record._id);
        ToastSuccess("product updated successfully");
        fetchUsers();
      } catch (err) {
        console.error("Active toggle failed", err);
      }
    };
  
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
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
        <AddButton text="Add product" setOpen={() => { setEditData(null); setOpen(true); }} />
      </div>
      
      <DataTable data={data} columns={columns} />

      <Formik
        enableReinitialize
        initialValues={{
          title: editData?.title || "",
          subTitle: editData?.subTitle || "",
          highlight: editData?.highlight || "",
          slug: editData?.slug || "",
          content: editData?.content || "",
          // FIX: Initialize exactly 5 slots. If editing, fill the rest with empty strings.
          img: editData?.img 
            ? [...editData.img, ...Array(Math.max(0, 5 - editData.img.length)).fill("")]
            : Array(5).fill(""), 
          Active: editData?.Active ?? true,
          category: editData?.category?._id || editData?.category || "",
          description: editData?.description || "",
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <OpenModel open={open} setOpen={setOpen} formik={formik} handleCancel={() => handleCancel(formik)}>
            <Form>
              <Text text="Title" name="title" placeholder="Enter title" required />
              <Text text="SubTitle" name="subTitle" placeholder="Enter subTitle" required />
              <Text text="Slug" name="slug" placeholder="Enter Slug" required />
              
              <Select text="Category" name="category" options={dropdownOptions} required />
              
              <Text text="Highlight" name="highlight" placeholder="Enter highlight" required />
              <Text text="Content" name="content" placeholder="Enter content" required />

              <div className="mb-5">
                <Editor text="Description" name="description" required />
              </div>

              <div className="mb-3">
                <label className="fw-bold mb-2">Product Images (Max 5)</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {formik.values.img.map((url, index) => (
                    <div key={index} style={{ textAlign: "center", border: "1px dashed #ccc", padding: "5px" }}>
                      <span style={{ fontSize: "12px" }}>Image {index + 1}</span>
                      <CommonUpload
                        formik={formik}
                        name={`img[${index}]`} 
                        limit={1} 
                        existingImages={url}
                        pdfimagepathname="product"
                        settingname="product"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Checkinputbox name="Active" label="Active Status" />

              <Button type="primary" htmlType="submit" loading={formik.isSubmitting} block>
                {editData ? "Update Product" : "Save Product"}
              </Button>
            </Form>
          </OpenModel>
        )}
      </Formik>
    </>
  );
};

export default Product;