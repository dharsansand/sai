import * as Yup from "yup";
const UservalidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),

  username: Yup.string()
    .required("Username is required"),

  password: Yup.string().when("isEdit", {
    is: false,
    then: (schema) =>
      schema
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

 
});

export default  UservalidationSchema

