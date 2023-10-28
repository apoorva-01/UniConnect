import React, { useContext, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../Layout/Layout";
import { DataStore } from '../utils/DataStore';
import User from '../models/User';
import db from '../utils/db';
import BioCard from '../components/ui/BioCard';
import TinderCard from 'react-tinder-card';

export default function LiveData({ entries }) {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { userInfo } = state;

  // State to track the stack of cards
  const [cardStack, setCardStack] = useState(entries);

  // Function to handle card swipes
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);

    if (direction === 'right' || direction === 'left') {
      // Remove the top card from the stack
      setCardStack((prevStack) => prevStack.slice(1));
    }
  }

  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        {cardStack.map((user, index) => (
          <div style={{ position: 'absolute' }}>
          <TinderCard
            onSwipe={onSwipe}
            preventSwipe={['right', 'left']}
            key={user._id}
          >
            <BioCard
             
              name={user.name}
              age={user.age}
              university={user.university}
              facebook={user.facebook}
              snapchat={user.snapchat}
              whatsapp={user.whatsapp}
              instagram={user.instagram}
              bio={user.bio}
              image={user.image}
              interests={user.interests}
            />
          </TinderCard>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const users = await User.find({}).lean();
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
