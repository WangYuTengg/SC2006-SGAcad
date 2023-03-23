import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
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
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
            textAlign="center"
          >
            <TextField
              label="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="postal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.postal}
              name="postal"
              error={Boolean(touched.postal) && Boolean(errors.postal)}
              helperText={touched.postal && errors.postal}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              multiline
              minRows={3}
              maxRows={5}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              name="address"
              error={Boolean(touched.address) && Boolean(errors.address)}
              multiline
              minRows={1}
              maxRows={2}
              helperText={touched.address && errors.address}
              sx={{ gridColumn: "span 4" }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.neutral.medium}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SubmitSpotForm;