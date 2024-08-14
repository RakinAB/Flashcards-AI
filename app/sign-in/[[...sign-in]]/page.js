import { SignIn } from "@clerk/nextjs"
import { Box, Container, Toolbar, AppBar, Typography, Button, Link } from "@mui/material"


export default function SignUpPage(){
    return(
        <Container maxWidth='sm' sx={{color:'white'}}>
            <AppBar position='static' sx={{backgroundColor: '#04d9af', borderRadius:4}}>
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow:1}}> Flash Cards</Typography>
                    <Button color='inherit'>
                        <Link href="/sign-in" passHref underline="none" color="white">
                            Login
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link href="/sign-up" passHref sx={{ textDecoration: 'none', color: 'white' }}>
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
                <Typography variant="h4">Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    )
}