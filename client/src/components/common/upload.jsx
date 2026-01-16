import React, { useState, useEffect } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ErrorMessage } from "formik";


import { ToastError, ToastSuccess } from "../common/toast";
import axios from "axios";

import config from "../../config";
import { postData } from "../../Api/apiRequest";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CommonUpload = ({
  formik,
  name,
  limit,
  setFileUploaded,
  existingImages,
  pdfimagepathname,
  settingname,
  id,
  labelName,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  // edit modal
  const [editImg, setEditImg] = useState(false);

  useEffect(() => {
    if (existingImages) {
      const existingImagesUrl = Array.isArray(existingImages)
        ? existingImages.map((item) => ({
            url: `${config.imgFile}/${pdfimagepathname}/${item.url}`,
          }))
        : existingImages.split(",").map((url) => ({
            url: `${config.imgFile}/${pdfimagepathname}/${url}`,
          }));
      setFileList(existingImagesUrl);
    }
    setEditImg(false);
  }, [id && editImg ? formik?.values?.images : null]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || "Image");
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList: newFileList }, setFieldValue) => {
    setFileList(newFileList);
    setFieldValue(name, newFileList);
    if (setFileUploaded) {
      setFileUploaded(newFileList.length > 0);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    await postData(`${settingname}/${pdfimagepathname}`, formData)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        onError(error);
      });
  };

  const props = {
    beforeUpload: (file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/avif",
        // "image/svg",
      ];
    //   const maxSize = 400 * 1024; // 200 KB in bytes

      if (!allowedTypes.includes(file.type)) {
        ToastError(
          "Images only! Allowed file types: jpeg, jpg, png, webp, avif"
        );
        return Upload.LIST_IGNORE;
      }

    //   if (file.size > maxSize) {
    //     ToastError(`exceeds the maximum file size of 400KB.`);
    //     return Upload.LIST_IGNORE;
    //   }

      return true;
    },
  };

  // edit modal
  const [editModal, setEditModal] = useState(false);
  const [editPreviewImage, setEditPreviewImage] = useState("");
  const [editPreviewTitle, setEditPreviewTitle] = useState("");
  const [editImgValue, setEditImgValue] = useState("");
  const [editFileList, setEditFileList] = useState([]);

  const EdithandleCancel = () => {
    setEditModal(false);
    setEditFileList([]);
  };

  const EdithandlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setEditPreviewImage(file.url || file.preview);
    setEditPreviewTitle(file.name || "Image");
    setEditModal(true);
  };

  const EdithandleChange = ({ fileList: newFileList }) => {
    setEditFileList(newFileList);
    setEditImgValue(newFileList?.[0]?.response?.file?.filename);
  };

  const EdituploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const EditcustomRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    await postData(`${settingname}/${pdfimagepathname}`, formData)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        onError(error);
      });
  };

  const EditHandleOk = async (index) => {
    try {
      if (editImgValue) {
        const res = await axios.post(`${config?.apiUrl}/gallery/editimage`, {
          index: index,
          imgurl: editImgValue,
          id: id,
        });
        if (res?.status == 200) {
          ToastSuccess(res?.data?.message);
          setEditModal(false);
          setPreviewVisible(false);
          setEditFileList([]);
          formik?.setFieldValue(`images.[${index}]`, editImgValue);
          setEditImg(true);
        }
      }
    } catch (error) {
      console.log("err", error);
      ToastError("Something went wrong, please try again later..");
    }
  };

  return (
    <>
      <label className={`form-label mb-2 ${labelName ? "" : "hidden"}`}>
        {labelName || ""}
      </label>

      <Upload
        {...props}
        className={`${
          formik.touched[name] && formik.errors[name]
            ? "userformhead__errorr"
            : null
        }`}
        listType="picture-card"
        fileList={fileList ? fileList : ""}
        customRequest={customRequest}
        onPreview={handlePreview}
        onChange={(info) => {
          handleChange(info, formik.setFieldValue);
        }}
      >
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
      <ErrorMessage
        name={name}
        component="div"
        className="userformhead__formErr"
      />
      <Modal
        open={previewVisible}
        title={previewTitle}
        // footer={null}
        onCancel={handleCancel}
        // footer={
        //   id
        //     ? [
        //         <CommonButton
        //           antdBtn={true}
        //           text={"Replace Image"}
        //           mb={"mb-3"}
        //           mt={"mt-3"}
        //           htmlType={"button"}
        //           color={"green"}
        //           onClick={() => setEditModal((prev) => !prev)}
        //         />,
        //         <CommonButton
        //           antdBtn={true}
        //           text={"Cancel"}
        //           mb={"mb-3"}
        //           mt={"mt-3"}
        //           htmlType={"button"}
        //           color={"red"}
        //           onClick={() => setPreviewVisible(false)}
        //         />,
        //       ]
        //     : []
        // }
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      {/* edit upload  */}

      <Modal
        className="replace_image_modal"
        open={editModal}
        onCancel={EdithandleCancel}
        onOk={() =>
          EditHandleOk(fileList?.findIndex((data) => data?.url == previewImage))
        }
        okText="Submit"
      >
        <div>
          <h5 className="text-center mt-2 mb-4">Replace Image</h5>
          <Upload
            // {...props}
            className={`${
              formik.touched[name] && formik.errors[name]
                ? "userformhead__errorr"
                : null
            }`}
            listType="picture-card"
            fileList={editFileList}
            customRequest={EditcustomRequest}
            onPreview={EdithandlePreview}
            onChange={(info) => {
              EdithandleChange(info);
            }}
          >
            {editFileList?.length >= 1 ? null : EdituploadButton}
          </Upload>
        </div>
      </Modal>
    </>
  );
};

export default CommonUpload;
