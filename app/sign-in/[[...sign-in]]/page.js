import { SignIn } from "@clerk/nextjs"
import { Box, Container, Toolbar, AppBar, Typography, Button, Link } from "@mui/material"


export default function SignUpPage(){
    return(
        <Container maxWidth='100vw' sx={{color:'white'}}>
            <AppBar position='static' sx={{backgroundColor: '#00ab89', borderRadius:4}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}W>
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
                            FLASH Cards
                        </Typography>
                    </Link>
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
                <Typography variant="h4" p={4}>Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    )
}