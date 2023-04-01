import { useRouter } from "next/router";
import { server } from "@/config/index";
import Image from "next/image";
import { Form, Formik } from "formik";
import MyTextInput from "@/components/MyTextInput";
import { getSession } from "next-auth/react";
import { useState } from "react";

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

const EditCategoryPage = ({ session, name, description}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async (values) => {
    console.log("handle submit function called");
    // console.log(values);

    const form = new FormData();
    form.append("name", values.name);
    form.append("description", values.description);
    form.append("imageUrl", selectedFile);
    // console.log(form);

    const result = await fetch(`${server}/api/admin/addCategory`, {
      method: "PUT",
      body: form,
    });
    const res = await result.json();

    console.log(res);
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      console.log(event.target.result);
      setSelectedImage(event.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const initialValues = {
    name: name,
    description: description,
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

            <div className="col-md-10 ms-5 mt-3 ">
              <input type="file" className="form-control" onChange={handleImage} />
            </div>

            <div className="col-md-10 ms-5 my-2">
              {selectedImage && <Image src={selectedImage} alt="" width={300} height={300} />}
            </div>

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

export async function getServerSideProps({req, params}) {
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

  console.log(session);

  const res = await fetch(
    `${server}/api/category/${params.id}`
  );
  const { data: category } = await res.json();
//   console.log("data = ", category);
  const { name, description } = category;

  return {
    props: {
      name,
      description,
    },
  };
}

export default EditCategoryPage;