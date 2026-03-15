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
import BrannervalidationSchema from "./brannervalidation";
import "../../Admin/common.css";
const Branner = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const [editData, setEditData] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getData("banner");
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
        banner: values.banner?.map((item) => {
          let processedImg = [];

          if (Array.isArray(item.img)) {
            processedImg = item.img.map((img) => {
              if (typeof img === "string") {
                return img.includes(config.file)
                  ? img.replace(`${config.file}/banner/`, "")
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
        await postOneData("banner", payload, editData._id);
        ToastSuccess("User Edited successfully");
      } else {
        await postData("banner", payload);
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
      await deleteData("banner", id);
      setData((prev) => prev.filter((item) => item._id !== id));
      ToastSuccess("User deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const toggleActive = async (record) => {
    try {
      await postOneData("banner", { Active: !record.Active }, record._id);
      ToastSuccess("User updated successfully");
      fetchUsers();
    } catch (err) {
      console.error("Active toggle failed", err);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "subTitle", dataIndex: "subTitle" },
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
          text="Add Banner"
       
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
          content: editData?.content || "",
          banner: editData?.banner || [{ img: "" }],
          Active: editData?.Active ?? true,

          isEdit: !!editData,
        }}
        validationSchema={BrannervalidationSchema}
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
                  text="title"
                  name="title"
                  placeholder="Enter title"
                  required={true}
                />
              </div>

              <div className="mb-3">
                <Text
                  text="subTitle"
                  name="subTitle"
                  placeholder="Enter subTitle"
                  required={true}
                />
              </div>
              <div className="mb-3">
                <Text
                  text="content"
                  name="content"
                  placeholder="Enter content"
                  required={true}
                />
              </div>

              <div className="mb-3">
                {formik.values.banner?.map((item, index) => (
                  <Upload
                    key={index}
                    formik={formik}
                    name={`banner.${index}.img`}
                    limit={1}
                    existingImages={item.img || []}
                    pdfimagepathname="banner"
                    settingname="banner"
                    banner={item.mobile ? null : "banner"}
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
export default Branner;
