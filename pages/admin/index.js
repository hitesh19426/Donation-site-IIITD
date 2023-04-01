import React from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { server } from "@/config";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Modal = ({title}) => {
  return (
    <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
          </div>
        </div>
      </div>
  )
}


const CategoryItem = ({key, category}) => {
  
  const onDeleteHandler = (id) => {
      // const response = await fetch(`${}`)
      console.log('delete function clicked for category', id);
  }

  return (
    <li className="list-group-item d-flex justify-content-between border-secondary" key={key}>
      <span className="fw-bold px-3 mr-auto mt-2">{category.name} </span>
      <div className="">
        <Link className="btn btn-danger mx-3" href={`admin/editCategory/${category._id}`}>
          <MdEdit />
        </Link>
        <button className="btn btn-danger" onClick={() => onDeleteHandler(category._id)}>
          <MdDeleteForever />
        </button>
      </div>
    </li>
  )
}

const AdminPage = ({session, categories}) => {
  return (
    <div className="d-grid gap-4 mx-5">
      
      <div className="">
        <ul className="list-group row">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </ul>
      </div>


      <Link href={`/admin/addCategory`} className="btn btn-success">
        Add New Category
      </Link>
    </div>
  );
};

export async function getServerSideProps({req}) {
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
  const {data: categories} = await res.json();

  return {
    props: {
      session,
      categories
    },
  };
}

export default AdminPage;
