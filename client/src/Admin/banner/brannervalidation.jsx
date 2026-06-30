import * as Yup from "yup";
const BrannervalidationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required"),

    subTitle: Yup.string().required("Sub Title is required"),
    content: Yup.string().required("Content is required"),
  banner: Yup.array()
    .of(
      Yup.object({
        img: Yup.string()
          .url("Invalid image URL")
          .required("Banner image is required"),
      })
    )
    .min(1, "Banner is required"),
});

export default BrannervalidationSchema