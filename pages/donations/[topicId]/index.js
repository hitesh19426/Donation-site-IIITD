import { useRouter } from "next/router";
import { server } from "@/config/index";
import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@/lib/MongoDbConnect";

function DetailCard({name, content, topicId}) {
  return (
    <div className="card mb-3">
      <div className="card-header">{name}</div>
      <Image src={content.imageUrl} className="card-img-top" alt="topic pic" width={500} height={300} />
      <div className="card-body">
          <Link href={`/donations/${topicId}/payment`} className="btn btn-primary">
            Donate now
          </Link>
      </div>
    </div>
  );
}

export default function TopicPage({ name, content }) {
  const router = useRouter();
  const { topicId } = router.query;

  return (
    <div className="col-sm-12 col-md-8 col-xxl-6 ps-5">
      <DetailCard name={name} content={content} topicId={topicId} />
    </div>
  );
}

export async function getStaticPaths() {
  // const res = await fetch(`${server}/api/donations/topics`);
  // const topics = await res.json();

  // const { db } = await connectToDatabase();
  // const topics = await db.collection("topics").find().toArray();

  // const ids = topics.map((topic) => topic.id);
  const ids = [1, 2, 3, 4, 5, 6]
  const paths = ids.map((id) => ({ params: { topicId: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // const res = await fetch(
  //   `${server}/api/donations/topics/${context.params.topicId}`
  // );
  // const res_json = await res.json();
  // const { name, content } = res_json;
  const { db } = await connectToDatabase();
  // const {topicId} = req.query;
  
  const topic = await db.collection("topics").find({id: context.params.topicId});
  console.log(topic);

  if(topic === null) {
    return {
      props: {
        name: '',
        content: {
          imageUrl: '',
        }
      }
    }
  }

  const {name, content} = topic;

  return {
    props: {
      name,
      content,
    },
  };
}
