import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import { ResponsiveContainer } from "recharts";
import TempGauge from "../components/ui/LiveData/TempGauge";
import HumidityGauge from "../components/ui/LiveData/HumidityGauge";
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
export default function LiveData({ }) {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { userInfo } = state;
 
  return (
    <Layout>
<BioCard name={'Rahul Verma'} bio={" Hello, this is my bio and love to code"} image={'/images/1.jpg'}/>
    </Layout>
  );
}

