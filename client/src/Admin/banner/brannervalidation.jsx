import * as Yup from "yup";
const BrannervalidationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required"),

    subTitle: Yup.string().required("Sub Title is required"),
    content: Yup.string().required("Content is required"),
   banner: Yup.array()
    .of(
      Yup.object().shape({
        img: Yup.array()
          .min(1, "Banner image is required")
          .required("Banner image is required"),
      })
    )
    .min(1, "Banner is required")
    .required("Banner is required"),
});

export default BrannervalidationSchema