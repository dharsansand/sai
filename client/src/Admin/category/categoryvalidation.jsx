import * as Yup from "yup";
const CategoryalidationSchema = Yup.object({
    categorytitle: Yup.string()
        .required("Category Title is required"),

   category: Yup.array()
    .of(
      Yup.object().shape({
        img: Yup.array()
          .min(1, "category image is required")
          .required("category image is required"),
      })
    )
    .min(1, "category is required")
    .required("category is required"),
});

export default CategoryalidationSchema