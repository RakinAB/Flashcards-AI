
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
        color: '#f0f0f0', 
        padding: 0,
        background: 'linear-gradient(135deg, #2c2c2c, #4f4f4f)', // Gray gradient
        minHeight: '100vh'
      }}
    >
      <Head>
        <title color="white">Flash Cards</title>
        <meta name='description' content='Create some flashcards from your text' />
      </Head>

      
      <AppBar position="static" sx={{borderRadius:4, backgroundColor: '#00ab89'}}>
        <Toolbar>
          <Typography variant="h5" style={{flexGrow:1}}>Flash Cards</Typography>
          <SignedOut>
            <Button color='inherit' href="/sign-in">Login</Button>
            <Button color='inherit' hred="/sign-up">Create an Account</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
  pt: { xs: 10, md: 20 },  // Responsive padding
  pb: { xs: 10, md: 20 },
  display: 'flex',
  my: 4,
  flexDirection: { xs: 'column', md: 'row' },  // Stack on small screens, row on medium and up
  justifyContent: { xs: 'center', md: 'space-evenly' },
  alignItems: { xs: 'center', md: 'left' },
  backgroundColor: '#1c1c1c',
  borderRadius: 2,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  "::before": {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: 'url("/noise.png")',
    opacity: 0.02,
    zIndex: 2,
  },
  "::after": {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `
      linear-gradient(
        to right,
        rgba(28, 28, 28, 1) 0%,
        rgba(28, 28, 28, 0.95) 40%,
        rgba(28, 28, 28, 0.8) 60%,
        rgba(28, 28, 28, 0.6) 80%,
        rgba(28, 28, 28, 0.4) 100%
      ),
      url('/grid.png')
    `,
    backgroundSize: 'cover', 
    backgroundPosition: 'right',
    opacity: 0.8,
    zIndex: 1,
  },
}}>
  <Box 
    display={'flex'} 
    flexDirection={'column'}
    sx={{ 
      position: 'relative', 
      zIndex: 3,
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: { xs: 'center', md: 'left' },  // Center text on small screens
      mb: { xs: 4, md: 0 }  // Add margin bottom on small screens
    }}
  >
    <Typography variant="h1" sx={{ 
      color: '#ffffff',
      fontWeight: 'bold',
      letterSpacing: '-1px',
      fontSize: { xs: '4.5rem', md: '6.5rem' }  // Responsive font size
    }}>
      FLASH Cards
    </Typography>
    <Typography variant="h5" sx={{ 
      color: 'rgba(255,255,255,0.9)',
      mt: 2,
      fontSize: { xs: '1rem', md: '1.5rem' }  // Responsive font size
    }}>
      Quickly make flashcards from your text
    </Typography>
  </Box>
  <Button 
    variant="contained" 
    color="primary" 
    sx={{
      mt: { xs: 2, md: 0 },  // Adjust top margin for different screen sizes
      backgroundColor: '#03fccb',
      "&:hover": {
        backgroundColor: '#04d9af'
      }, 
      borderRadius: 2,
      padding: '10px 32px',
      fontSize: { xs: '1rem', md: '1.25rem' },  // Responsive font size
      position: 'relative',
      zIndex: 3,
      fontWeight: 'bold',
      textTransform: 'none',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      "&:hover": {
        backgroundColor: '#04d9af',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
      }
    }}
  >
    Get started
  </Button>
</Box>


      <Box sx={{my:6, px:4}}>
        <Typography variant="h3" gutterBottom fontWeight={'bold'}> Features</Typography>
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


      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight={'bold'}> Pricing </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#444444',
              border: '2px solid #00ab89', // Outline to differentiate the plan
            }}>
              <Typography variant="h5" gutterBottom fontWeight={'bold'}>Basic</Typography>
              <Typography variant="h6" gutterBottom fontWeight={'bold'}>$5/mo</Typography>
              <Typography textAlign={'left'} fontWeight={'bold'}>
                - Access to basic flashcard features
              </Typography>
              <Typography textAlign={'left'} fontWeight={'bold'}>
                - Limited Storage
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx=
                  {{ 
                    mt: 3, 
                    backgroundColor: '#03fccb', 
                    "&:hover": 
                      { 
                        backgroundColor:'#04d9af' 
                      }, 
                    borderRadius:12,
                    transition: 'all 0.3s ease',  // Smooth transition for hover effects
                    "&:hover": {
                      backgroundColor: '#04d9af',
                      transform: 'translateY(-2px)',  // Slight raise effect on hover
                      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                    }
                  }}
              >
                Choose Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#00ab89',
              border: '2px solid #04d9af', // Different border for Pro plan
              position: 'relative', // For "Best Value" badge
            }}>
              <Typography variant="h5" gutterBottom fontWeight={'bold'}>Pro</Typography>
              <Typography variant="h6" gutterBottom fontWeight={'bold'}>$10/mo</Typography>
              <Typography textAlign={'left'} fontWeight={'bold'}>
                - Unlimited Flashcards
              </Typography>
              <Typography textAlign={'left'} fontWeight={'bold'}>
                - Unlimited Storage
              </Typography>
              <Typography textAlign={'left'} fontWeight={'bold'}>
                - Priority Support
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx=
                  {{ 
                    mt: 3, 
                    backgroundColor: '#03fccb', 
                    "&:hover": 
                      { 
                        backgroundColor:'#04d9af' 
                      }, 
                    borderRadius:12,
                    transition: 'all 0.3s ease',  // Smooth transition for hover effects
                    "&:hover": {
                      backgroundColor: '#04d9af',
                      transform: 'translateY(-2px)',  // Slight raise effect on hover
                      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                    }
                  }}
              >
                Choose Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ py: 4, textAlign: 'center',  color: '#fff' }}>
        <Typography variant="body2">
          &copy; 2024 Flash Cards. All rights reserved.
        </Typography>
      </Box>
    </Container>
    
  )
}
