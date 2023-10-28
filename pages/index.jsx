import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import { ResponsiveContainer } from "recharts";
import User from '../models/User';
import db from '../utils/db';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from 'axios'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import BioCard from '../components/ui/BioCard'
export default function LiveData({entries}) {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  
  console.log(entries)
  return (
    <Layout>
       {entries.map((user) => (
        <BioCard
          key={user._id}
          name={user.name} // You should replace with the actual field name containing the user's name
          bio={user.bio} // You should replace with the actual field name containing the user's bio
          image={user.image} // You should replace with the actual field name containing the user's image URL
          interests={user.interests} // You should replace with the actual field name containing the user's image URL
        />
      ))}
      {/* <BioCard name={''} bio={" Hello, this is my bio and love to code"} image={'/images/1.jpeg'} /> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const users = await User.find({}).lean()
  await db.disconnect();
  const serializedUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));
  return {
    props: {
      entries: serializedUsers
    },
  };
}
