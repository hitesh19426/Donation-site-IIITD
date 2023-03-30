import { useRouter } from "next/router";
import { server } from "@/config/index";
import Image from "next/image";
import Link from "next/link";

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

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/category`);
  const {data: categories} = await res.json();

  const ids = categories.map(category => category.id);
  const paths = ids.map(id => ({ params: { categoryId: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/category/${context.params.categoryId}`);
  const {data} = await res.json();
  const { name, imageUrl } = data;

  return {
    props: {
      name,
      imageUrl,
    },
  };
}
