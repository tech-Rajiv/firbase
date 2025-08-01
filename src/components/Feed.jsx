import SingleFeed from "./SingleFeed";
import FeedSkeleton from "./skeleton/feedSkeleton";
import { useSelector } from "react-redux";
function Feed() {
 const allFeed = useSelector(state => state.tweets.feed)
console.log(allFeed,'all');
 const loading = useSelector(state => state.tweets.loading)
  return (
    <div className="min-h-[90vh]">
      <div className="gridss">
        {loading ? <FeedSkeleton /> : <SingleFeed feed={allFeed} />}
      </div>
    </div>
  );
}

export default Feed;
