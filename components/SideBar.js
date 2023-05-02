import React from "react";
import useSWR from "swr";
import NavBar from "./NavBar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function GetSideCategories() {
  const { data, error, isLoading } = useSWR(`/api/category`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

function SideBar() {
  const { data, error, isLoading } = GetSideCategories();

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  if (error) {
    return <div> Error fetching side topics </div>;
  }

  const { data: categories } = data;

  if (categories === undefined || categories === null) {
    return (
      <div>
        No categories found. Please check your connection and whether the
        categories exist in database or not.
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div>
        No categories found. Please add some categories before proceeding.
      </div>
    );
  }

  return <NavBar items={categories} path="donations" />;
}

export default SideBar;
