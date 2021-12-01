import React from "react";
import {  logUserOut } from '../apollo';
import { gql, useQuery } from "@apollo/client";



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
      {data?.seeFeed?.map((photo) => (
      
        <Photo key={photo.id} {...photo}/>   
      ))}
    </div>
  );
};
export default Home;