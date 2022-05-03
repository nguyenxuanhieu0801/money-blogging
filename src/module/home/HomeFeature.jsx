import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase-app/firebase-config";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("status", "==", 1), where("host", "==", true), limit(3));
      onSnapshot(q, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
      });
    }
    getData();
  }, []);
  if (posts.length <= 0) return null;

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post} />
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
