import React from "react";
import { server } from "@/config/index";
import useSWR from "swr";
import NavBar from "./NavBar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function GetSideTopics() {
  const { data, error, isLoading } = useSWR(
    `${server}/api/donations/topics`,
    fetcher
  );

  return {
    topics: data,
    isLoading,
    isError: error,
  };
}

function SideBar() {
  const { topics, error, isLoading } = GetSideTopics();

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  if (error) {
    return <div> Error fetching side topics </div>;
  }

  return (
    <NavBar items={topics} path="donations" />
  );
}

export default SideBar;
