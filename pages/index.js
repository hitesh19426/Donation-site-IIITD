import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/HoverCard.module.css";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

function CategoryCard({ name, imageUrl, categoryId }) {
  return (
    <div className="col">
      <div className={`card ${styles.cardhover}`}>
        <div className="card-header">{name}</div>
        <Image
          src={imageUrl}
          className="card-img-top"
          alt="category pic"
          width={500}
          height={300}
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
    <div className="row row-cols-sm-1 rows-cols-lg-2 row-cols-xxl-4 g-4">
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
