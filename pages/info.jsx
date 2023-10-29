import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from "../Layout/Layout";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Interest from '../components/ui/Interest';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { DataStore } from '../utils/DataStore';
import { useRouter } from 'next/router';
const steps = ['Age(Just a number)', 'Your Vibe', 'Other Socials Link'];

export default function Info() {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [age, setAge] = React.useState('');
  const [selectedInterests, setSelectedInterests] = React.useState([]);
  const [interestsCache, setInterestsCache] = React.useState([]);
  const [university, setUniversity] = React.useState('');
  const [facebookLink, setFacebookLink] = React.useState('');
  const [whatsappLink, setWhatsappLink] = React.useState('');
  const [instagramLink, setInstagramLink] = React.useState('');
  const [snapchatLink, setSnapchatLink] = React.useState('');
  console.log(userInfo)
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Save the age in cache
      localStorage.setItem('userAge', age);
    } else if (activeStep === 1) {
      // Save selected interests as an array in localStorage
      const interests = JSON.parse(localStorage.getItem('userInterests')) || [];
      interests.push(...selectedInterests);
      localStorage.setItem('userInterests', JSON.stringify(interests));
    }
    else if (activeStep === 2) {
      // Send data to the APIfacebookLink
      const userData = {
        _id:userInfo._id,
        age: age,
        interests: selectedInterests,
        university: university,
        facebook: facebookLink,
        whatsapp: whatsappLink,
        instagram: instagramLink,
        snapchat: snapchatLink,
      };

      (async () => {
        try {
          const response = await axios.post('/api/setUserInfo', userData);
          router.push('/');
          if (response.status === 200) {
            // Data sent to the API successfully
            console.log('Data sent to the API successfully');
          } else {
            // Handle errors if necessary
            console.error('API request failed');
          }
          
        } catch (error) {
          console.error('An error occurred:', error);
          // Handle the error
        }
      })();  

    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleInterestSelect = (interest) => {
    // Toggle the selection of interests
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    }
  };

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed
            </Typography>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <TextField
                label="Your Age"
                id="outlined-start-adornment"
                sx={{ m: 5, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            ) : null}
            {activeStep === 1 ? (
              <>
              {/* <Stack sx={{marginTop:"2rem"}} direction="row" spacing={2}> */}

                <Interest
                  name="Music"
                  image="/images/music.jpg"
                  desc="Listening & Singing"
                  onSelect={handleInterestSelect}
                  selected={selectedInterests.includes('Music')}
                />
                <Interest
                  name="Dance"
                  image="/images/dance.jpg"
                  desc="Listening & Singing"
                  onSelect={handleInterestSelect}
                  selected={selectedInterests.includes('Dance')}
                />
                
                <Interest
                  name="Fashion"
                  image="/images/fashion.jpg"
                  desc="Listening & Singing"
                  onSelect={handleInterestSelect}
                  selected={selectedInterests.includes('Dance')}
                />
                <Interest
                  name="Fitness"
                  image="/images/fitness.jpg"
                  desc="Listening & Singing"
                  onSelect={handleInterestSelect}
                  selected={selectedInterests.includes('Dance')}
                />
                {/* </Stack> */}

                {/* Add more Interest components for other interests */}
              </>
            ) : null}
            {activeStep === 2 ? (
              <>
                <TextField
                  label="University Name"
                  id="university"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  value={university} // Bind the value to the state variable
                  onChange={(e) => setUniversity(e.target.value)} // Update the state variable
                />
                <TextField
                  label="Facebook Profile Link"
                  id="facebook"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  value={facebookLink} // Bind the value to the state variable
                  onChange={(e) => setFacebookLink(e.target.value)} // Update the state variable
                />
                <TextField
                  label="Whatsapp Link"
                  id="whatsapp"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  value={whatsappLink} // Bind the value to the state variable
                  onChange={(e) => setWhatsappLink(e.target.value)} // Update the state variable
                />
                <TextField
                  label="Instagram Profile Link"
                  id="instagram"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  value={instagramLink} // Bind the value to the state variable
                  onChange={(e) => setInstagramLink(e.target.value)} // Update the state variable
                />
                <TextField
                  label="Snapchat Profile Link"
                  id="snapchat"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  value={snapchatLink} // Bind the value to the state variable
                  onChange={(e) => setSnapchatLink(e.target.value)} // Update the state variable
                />
              </>
            ) : null}


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Layout>
  );
}
