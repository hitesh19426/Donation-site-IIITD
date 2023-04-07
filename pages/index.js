import { server } from "@/config/index";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function DetailCard({name, imageUrl, categoryId}) {
  return (
    <div className="card mb-3">
      <div className="card-header">{name}</div>
      <Image src={imageUrl} className="card-img-top" alt="category pic" width={500} height={300} />
      <div className="card-body">
          <Link href={`/donations/${categoryId}/payment`} className="btn btn-primary">
            Donate now
          </Link>
      </div>
    </div>
  );
}

export default function CategoryPage({name, imageUrl}) {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <div className="col-sm-12 col-md-8 col-xxl-6 ps-5">
      <DetailCard name={name} imageUrl={imageUrl} categoryId={categoryId} />
    </div>
  );
}


export async function getServerSideProps(context) {

  const res = await fetch(`${server}/api/category`);
  const {data} = await res.json();

  console.log("data = ", data);
  
  if(!data) {
    return {
      notFound: true,
    }
  }

  const name = data[0].name;
  const imageUrl = data[0].imageUrl;

  return {
    props: {
      name,
      imageUrl
    },
    // revalidate: 3,
  };

}