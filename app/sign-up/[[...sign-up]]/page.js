import { SignUp } from "@clerk/nextjs"
import { Box, Container, Toolbar, AppBar, Typography, Button, Link } from "@mui/material"


export default function SignUpPage(){
    return(
        <Container maxWidth='100vw' sx={{color:'white'}}>
            <AppBar position='static' sx={{backgroundColor: '#00ab89', borderRadius:4}}>
                <Toolbar>
                    <Typography variant="h5" sx={{flexGrow:1}}> Flash Cards</Typography>
                    <Button color='inherit'>
                        <Link href="/sign-in" passHref underline="none" color="white">
                            Login
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link href="/sign-up" passHref sx={{ textDecoration: 'none', color: 'white',  }}>
                            Sign Up
                        </Link>
                    </Button>
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