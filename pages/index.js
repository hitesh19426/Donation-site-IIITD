import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/HoverCard.module.css";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

function CategoryCard({ name, imageUrl, categoryId }) {
  return (
    <div className="col pb-4">
      <div className={`card ${styles.cardhover}`}>
        <div className="card-header">{name}</div>
        <Image
          src={imageUrl}
          className="card-img-top"
          alt="category pic"
          width={300}
          height={200}
        />
        <div className="card-body">
          <Link
            href={`/donations/${categoryId}/payment`}
            className="btn btn-primary"
          >
            Donate now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ categories }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          imageUrl={category.imageUrl}
          categoryId={category.id}
        />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  var categories;
  try {
    await dbConnect();
    categories = await Category.find();
    categories = categories.map((category) =>
      category.toObject({ getters: true })
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
