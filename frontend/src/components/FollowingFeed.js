import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
import axios from "axios";

const FollowingFeed = () => {
  const [guides, setGuides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function populate() {
    const token = localStorage.getItem("token");
    const headers = {
      "X-Auth-Token": token
    };
    const response = await axios.get(
      `http://localhost:5000/api/account/feed?offset=${offset}&limit=20`,
      {
        headers
      }
    );
    if (response.data.length === 0) {
      setHasMore(false);
    } else {
      setGuides(guides.concat(response.data));
      setOffset(offset + 20);
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
      <h1>Following Feed</h1>
      <GuidesList
        hasMore={hasMore}
        next={populate}
        guides={guides}
        displayAuthor={true}
      />
    </div>
  );
};

export default FollowingFeed;
