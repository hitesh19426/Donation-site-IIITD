import React, {useState} from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Form, Formik } from "formik";
import MyTextInput from "@/components/MyTextInput";
import Image from "next/image";
import { server } from "@/config";


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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async (values) => {
    console.log("handle submit function called");
    console.log(values);

    console.log(values.name);
    console.log(values.description);

    const form = new FormData();
    form.append('name', values.name);
    form.append('description', values.description);
    form.append('imageUrl', selectedFile);
    console.log(form);

    const result = await fetch(`${server}/api/admin/addCategory`, {
      method: 'POST',
      body: form,
    });
    const res = await result.json();

    console.log(res);
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file)
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      console.log(event.target.result);
      setSelectedImage(event.target.result);
    }
    fileReader.readAsDataURL(file)
  }

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

            {/* {console.log("selectedImage = ", selectedImage)} */}

            <div>
              <input type="file" className="" onChange={handleImage} />

              {selectedImage && <Image src={selectedImage} alt="" width={300} height={300} />}
            
            </div>
            {/* <label>
              <input type="file" hidden onChange={ ({target}) => {
                if(target.files){
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }
              }}/>
              <div>
                {selectedImage ? (
                  <Image href={selectedImage} alt="" className="card-img-top" width={500} height={300} />
                ) : (
                  <span> Select Image </span>
                )}
              </div>
            </label> */}

            {/* <button disabled={uploading} className="btn btn-success">
                {uploading ? "Uploading..." : "Upload"}
            </button> */}

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
