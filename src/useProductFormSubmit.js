import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createEndUserTicket } from "./user.service";

export const endUserProductInitialValues = {
  email: '',
  description: '',
  issueType: ''
};

export const endUserProductValidationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  description: yup.string().required('Description is required'),
  issueType: yup.string().required('Issue type is required')
});

export const useProductFormSubmit = (apiKeys) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const ticketData = {
        email: values.email,
        description: values.description,
        issueType: values.issueType,
      };
      await createEndUserTicket(ticketData, apiKeys);
    } catch (err) {
      console.error("Error creating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: endUserProductInitialValues,
    validationSchema: endUserProductValidationSchema,
    onSubmit: handleSubmit
  });

  return { ...formik, isLoading };
};