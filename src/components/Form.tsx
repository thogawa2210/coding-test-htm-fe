/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, message } from "antd";
import { AxiosInstance } from "axios";
import { Form, Formik } from "formik";
import { KeyedMutator } from "swr";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

const initialValues = {
  name: "",
  lastName: "",
  country: "",
  city: "",
  email: "",
  phone: "",
};

const FormComponent = ({
  mutate,
  axios,
  closeModal,
}: {
  mutate: KeyedMutator<any>;
  axios: AxiosInstance;
  closeModal: () => void;
}) => {
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: any }
  ) => {
    try {
      // Replace 'your-api-endpoint' with your actual endpoint
      const response = await axios.post("/contacts", { data: values });
      if (response.status === 201 || response.status === 200) {
        message.success("Form submitted successfully!");
        resetForm();
        closeModal();
        mutate();
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error(
        "Failed to submit the form. Please check your network connection."
      );
    }
  };

  return (
    <div className="p-6 rounded-md w-full max-w-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <Input
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Input
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.lastName && errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <Input
                name="country"
                placeholder="Country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.country && errors.country
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.country && errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Input
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.city && errors.city
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.city && errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Input
                name="phone"
                placeholder="Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`py-2 px-4 w-full ${
                  touched.phone && errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                style={{
                  backgroundColor: "#153376",
                  borderColor: "#153376",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
