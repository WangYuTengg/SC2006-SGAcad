import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const formSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  address: yup.string().required("required"),
  postal: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
  picture: yup.string().optional(),
});

const initialValuesSpot = {
  name: "",
  description: "",
  address: "",
  postal: "",
  picture: "",
};

const SubmitSpotForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const handleSnackbarClose = () => setSnackBarOpen(false);

  const handleFormSubmit = async (values, onSubmitProps) => {

  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesSpot}
      validationSchema={formSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
                  label="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={
                    Boolean(touched.name) && Boolean(errors.name)
                  }
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SubmitSpotForm;
