import React from "react";
import {  logUserOut } from '../apollo';
import { gql, useQuery } from "@apollo/client";

import PageTitle from "../components/PageTitle";

const FEED_QUERY=gql`
  query seeFeed{
    seeFeed{
      id
      user{
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;


const Home=()=>{
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
      
        <Photo key={photo.id} {...photo}/>   
      ))}
    </div>
  );
};
export default Home;