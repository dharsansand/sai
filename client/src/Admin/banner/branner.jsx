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
import { useGetHomeBannersQuery } from "../../services/bannerHomeApi";
const Branner = () => {
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]);

  const [editData, setEditData] = useState(null);
  const { data: banner = [], isLoading, refetch } = useGetHomeBannersQuery();
    const data = Array.isArray(banner) ? banner : [];

  const fetchUsers = () => {
    refetch();
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
        title: values.title,
        subTitle: values.subTitle,
        content: values.content,
        Active: values.Active,
        banner: values.banner,
        highlight: values.highlight,
      };

      if (editData) {
        await postOneData("banner", payload, editData._id);
        ToastSuccess("Banner Updated Successfully");
      } else {
        await postData("banner", payload);
        ToastSuccess("Banner Added Successfully");
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
      await deleteData("banner", id);
      setData((prev) => prev.filter((item) => item._id !== id));
      ToastSuccess("Banner deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const toggleActive = async (record) => {
    try {
      await postOneData("banner", { Active: !record.Active }, record._id);
      ToastSuccess("Banner updated successfully");
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
          highlight: editData?.highlight || "",

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
                <div className="mb-3">
                  <Text
                    text="Highlight"
                    name="highlight"
                    placeholder="Enter highlight"
                    // required={true}
                  />
                </div>
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
                    formik={formik}
                    name={`banner.${index}.img`}
                    limit={1}
                    existingImages={item.img}
                    pdfimagepathname="banner"
                    settingname="banner"
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
