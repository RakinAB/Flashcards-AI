
'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid, Paper, Stack} from "@mui/material";
import Head from "next/head";
import { styled } from '@mui/material/styles'

const DemoPaper = styled(Paper)(({ theme }) => ({

  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#444444',
  color:'white',
  boxSizing: 'border-box', // Include padding and border in the width and height
  overflow: 'hidden', // Prevent content overflow
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
}));

export default function Home() {
  return (
    <Container 
      maxWidth='100vw'
      sx={{
        color: 'white', 
        padding: 0
      }}
    >
      <Head>
        <title color="white">Flashcards Headstarter AI</title>
        <meta name='description' content='Create some flashcards from your text' />
      </Head>

      
      <AppBar position="static" sx={{borderRadius:4}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow:1}}>Flashcards Headstarter AI</Typography>
          <SignedOut>
            <Button color='inherit'>Login</Button>
            <Button color='inherit'>Create an Account</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign:'center',
        my:4
      }}>
        <Typography variant="h2">Welcome to Flashcards Headstarter AI</Typography>
        <Typography variant="h5">
          Quickly make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{mt:2}}>Get started</Button>
      </Box>


      <Box sx={{my:6}}>
        <Typography variant="h4" gutterBottom> Features</Typography>
        <Grid 
          container 
          spacing={2} 
          display={'flex'}
          flexDirection={'row'}
          justifyContent="center" 
          alignItems="center" 
        >
          <Grid item xs={12} sm={4} md={4} lg={3} display={'flex'}
          flexDirection={'row'}
          justifyContent="center" 
          alignItems="center"  >
            <DemoPaper variant="elevation">
              <Typography variant="h5" gutterBottom>Easy Text Input</Typography>
              <Typography>
                Input your text and let the software do the rest
              </Typography>
            </DemoPaper>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} display={'flex'}
          flexDirection={'row'}
          justifyContent="center" 
          alignItems="center" >
            <DemoPaper variant="elevation">
              <Typography variant="h5" gutterBottom>Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text into brief, concise 
                flashcards, perfect for your studies
              </Typography>
            </DemoPaper>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} display={'flex'}
          flexDirection={'row'}
          justifyContent="center" 
          alignItems="center" >
            <DemoPaper variant="elevation">
              <Typography variant="h5" gutterBottom>Ease of Access</Typography>
              <Typography>
                Access your flashcards from any device, any place, any time. On the go studying
              </Typography>
            </DemoPaper>
          </Grid>
        </Grid>
      </Box>


      <Box sx={{my:6, textAlign:'center'}}>
        <Typography variant="h4" gutterBottom> Pricing</Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor:'grey',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5/mo</Typography>
              <Typography textAlign={'left'}>
                - Access to basic flashcard features
              </Typography>
              <Typography textAlign={'left'}>
                - Limited Storage
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:3}}>Choose Plan</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor:'grey',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$5/mo</Typography>
              <Typography textAlign={'left'}>
                - Unlimited Flashcards
              </Typography>
              <Typography textAlign={'left'}>
                - Unlimited Storage
              </Typography>
              <Typography textAlign={'left'}>
                - Priority Support
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:3}}>Choose Plan</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
