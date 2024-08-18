import { SignUp } from "@clerk/nextjs"
import { Box, Container, Toolbar, AppBar, Typography, Button, Link } from "@mui/material"


export default function SignUpPage(){
    return(
        <Container maxWidth='100vw' sx={{color:'white'}}>
            <AppBar position="static" sx={{borderRadius:4, backgroundColor: '#00ab89'}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link 
                    href="/" 
                    passHref
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'none', // Remove underline
                        color: 'white', // Set text color to white
                      }}
                >
                    <Typography variant="h5" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        Flash Cards
                    </Typography>
                </Link>
                <SignedOut>
                    <Button color='inherit' href="/sign-in">Login</Button>
                    <Button color='inherit' href="/sign-up">Create an Account</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                </Toolbar>
            </AppBar>

            <Box 
                display={'flex'} 
                flexDirection={'column'} 
                alignItems={'center'} 
                justifyContent={'center'}
            >
                <Typography variant="h4" p={4}>Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
    )
}