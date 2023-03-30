import React, {useState} from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Form, Formik } from "formik";
import MyTextInput from "@/components/MyTextInput";
import Image from "next/image";

const initialValues = {
  name: "",
  description: "",
};

const validator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
};

const AddCategoryPage = ({ session }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (values) => {
    console.log("handle submit function called");
    console.log(values);
  };

  return (
    <div className="card">
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={handleSubmit}
        >
          <Form>
            <MyTextInput
              label="Category Name"
              name="name"
              type="text"
              placeholder="Give for Alumni Legacy"
            />

            <MyTextInput
              label="Description"
              name="description"
              type="text"
              placeholder="Enter Description of the category"
            />

            {/* TODO: If you have time, then disable button if there are errors */}
            <div className="col-12 ms-5 mt-3">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log("session in admin page = ", session);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default AddCategoryPage;
