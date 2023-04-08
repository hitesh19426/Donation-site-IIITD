import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { server } from "@/config";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const CategoryItem = ({ id, category, setError }) => {
  const [deleting, setDeleting] = useState(false);

  const onDeleteHandler = async (id) => {
    // const response = await fetch(`${}`)
    console.log("delete function clicked for category", id);
    try {
      setDeleting(true);
      setError(null);
      const response = await fetch(`${server}/api/admin/category/${id}`, {
        method: "DELETE",
      });

      const res = await response.json();
      console.log(res);
      setDeleting(false);
      setError(null);
    } catch (err) {
      setDeleting(false);
      setError(err);
      console.log("error occured", err);
    }
  };

  return (
    <>
      <li
        className="list-group-item d-flex col justify-content-between border-secondary"
        key={id}
      >
        <div className="flex-column col">
          <div className="d-flex col">
            <span className="fw-bold col px-3 mr-auto mt-2">
              {category.name}
            </span>
            <div className="mr-auto">
              <Link
                className="btn btn-danger mx-3"
                href={`admin/editCategory/${category._id}`}
              >
                <MdEdit />
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteHandler(category._id)}
                disabled={deleting}
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

const AdminPage = ({ session, categories }) => {
  const [error, setError] = useState(null);

  return (
    <div className="d-grid gap-4 mx-5 col">
      <div className="row">
        <ul className="list-group row">
          {categories.map((category) => (
            <CategoryItem
              key = {category.id}
              id={category.id}
              category={category}
              setError={setError}
            />
          ))}
        </ul>
      </div>

      {error && (
        <div className="row fw-bold alert alert-danger">
          Some Error Occured. Try again.
        </div>
      )}

      <div className="row">
        <Link href={`/admin/addCategory`} className="btn btn-success">
          Add New Category
        </Link>
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

  const res = await fetch(`${server}/api/category`);
  const { data: categories } = await res.json();

  return {
    props: {
      session,
      categories,
    },
  };
}

export default AdminPage;
