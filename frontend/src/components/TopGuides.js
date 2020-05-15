import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
// import axios from "axios";
import axios from "../utils/axiosProxy";

const TopGuides = () => {
  const [guides, setGuides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  async function populate() {
    const results = await axios.get(`/api/guide/top?offset=${offset}&limit=10`);
   /* if (results.data.length === 0) {
      setHasMore(false);
    } else {
      setGuides(guides.concat(results.data));
      setOffset(offset + 10);
    }*/
	if (results.data.length === 10) {
      setGuides(guides.concat(results.data));
      setOffset(offset + 10);
      setHasMore(true);
    } else {
      setHasMore(false);
      if (results.data.length !== 0) setGuides(guides.concat(results.data));
    }
  }
  useEffect(() => {
    populate();
  }, []);
  return (
    <div
      style={{
        margin: "10px"
      }}
    >
      <h1>Top guides</h1>
      <GuidesList
        guides={guides}
        hasMore={hasMore}
        next={populate}
        displayAuthor
      />
    </div>
  );
};

export default TopGuides;
