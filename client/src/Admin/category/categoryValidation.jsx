import * as Yup from "yup";
const categoryvalidationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required"),
    subTitle: Yup.string().required("Sub Title is required"),

    highlight: Yup.string().required("highlight is required"),
    slug: Yup.string().required("slug is required"),

    

    content: Yup.string().required("Content is required"),
img: Yup.array()
  .of(Yup.string().url("Invalid image URL")) 
  .min(1, "img is required"),
});

export default categoryvalidationSchema