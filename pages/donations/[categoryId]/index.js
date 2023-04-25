import { useRouter } from "next/router";
import { server } from "@/config/index";
import Image from "next/image";
import Link from "next/link";

function DetailCard({name, imageUrl, description, categoryId}) {
  return (
    <div className="card mb-3">
      <div className="card-header">{name}</div>
      <Image src={imageUrl} className="card-img-top" alt="category pic" width={500} height={300} />
      <div className="card-body">
          <h5 className="card-description">{description}</h5>
          <Link href={`/donations/${categoryId}/payment`} className="btn btn-primary">
            Donate now
          </Link>
      </div>
    </div>
  );
}

export default function CategoryPage({name, imageUrl, description}) {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <div className="col-sm-12 col-md-8 col-xxl-6 ps-5">
      <DetailCard name={name} imageUrl={imageUrl} description = {description} categoryId={categoryId} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/category/${context.params.categoryId}`);
  const {data} = await res.json();
  // console.log(data);
  const { name, imageUrl, description } = data;

  const newImage = imageUrl.replaceAll("\\", "/");
  // console.log("newImage = ", newImage);

  const isImageLocal = newImage.slice(0, 6) === 'public'
  // console.log(isImageLocal);

  const image = (isImageLocal ? newImage.slice(6) : newImage)
  // console.log("image = ", image);


  return {
    props: {
      name,
      imageUrl: image, 
      description,
    },
    // revalidate: 3,
  };
}
