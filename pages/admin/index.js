import React from "react";
import { useSession, getSession } from "next-auth/react";

const AdminPage = ({session, name, email}) => {
//   const { data: session } = useSession();
//   console.log(session);
//     console.log(name);
//     console.log(email);

  return <div>AdminPage</div>;
};

export async function getServerSideProps({req}) {
  const session = await getSession({ req });

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
      name: "admin",
      email: "admin@example.com",
    },
  };
}

export default AdminPage;
