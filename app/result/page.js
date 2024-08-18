'use client'

import { useEffect, useState } from "react"
import getStripe from "@/utils/get-stripe"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, CircularProgress, Container, Typography, AppBar, Toolbar, Button, Link } from "@mui/material"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
const ResultPage = () =>{
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCheckoutSession = async () =>{
            if(!session_id) return

            try{
                const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const sessionData = await res.json()
                if(res.ok){
                    setSession(sessionData)
                } else{
                    setError(sessionData.error)
                }
            }
            catch(error){
                setError('An error occurred')
            } finally{
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    },[session_id])
    if(loading){
        return(
            <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
                <CircularProgress />
                <Typography variant='h6'>Loading...</Typography>
            </Container>
        )
    }
    if(error){
        return(
            <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
                <Typography variant='h6'>{error}</Typography>
            </Container>
        )
    }

    return(
        <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
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
                {
                    session?.payment_status === 'paid' ? (
                        <>
                        <Typography variant='h4'>Thank you for your purchase</Typography>
                            <Box sx={{mt:22}}>
                                <Typography variant="h6">Sesssion ID: {session_id} </Typography>
                                <Typography variant='body1'>
                                    We have recieve your payment. You will recieve an email with your order details shortly
                                </Typography>
                            </Box>
                        </>
                    ):(
                        <>
                            <Typography variant='h4' sx={{mt:4}}>Payment Failed</Typography>
                            <Box sx={{mt:22}}>
                                <Typography variant='body1'>
                                    Your payment was not successful.
                                    Please try again...
                                </Typography>
                            </Box>
                        </>
                    )
                }
            </Container>
    )
}

export default ResultPage