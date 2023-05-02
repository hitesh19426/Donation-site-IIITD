import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

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
  
  var category;
  try {
    await dbConnect();
    category = await Category.findById(context.params.categoryId);
    category = category.toObject({getters: true})
    console.log("category = ", category);
  } catch (error) {
    console.log(error);
  }
  
  const { name, imageUrl, description } = category;
  
  return {
    props: {
      name,
      imageUrl: imageUrl, 
      description,
    },
    // revalidate: 3,
  };
}
