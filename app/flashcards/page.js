'use client'

import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { AppBar, Button, Toolbar, Link, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(()=>{
        async function getFlashcards(){
            if(!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else{
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()  
    },[user]) 

    if(!isLoaded){
        return <></>
    }
    if(!isSignedIn){
        router.push(`/sign-in`)
    }

    const handleCardClick = (id) =>{
        router.push(`/flashcard?id=${id}`)
    }

    return(
        <Container maxWidth='100vw'>
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
                    <Typography variant="h5" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight:'bold' }}>
                        FLASH Cards
                    </Typography>
                </Link>
                <SignedOut>
                    <Button color='inherit' href="/sign-in">Login</Button>
                    <Button color='inherit' href="/sign-up">Create an Account</Button>
                </SignedOut>
                <SignedIn>
                <Button color='inherit' href="/generate" sx={{fontWeight:'bold'}}>Generate +</Button>
                    <UserButton />
                </SignedIn>
                </Toolbar>
            </AppBar>
            <Typography variant='h2' sx={{mt:4, fontWeight:'bold'}}>Sets</Typography>
            <Grid container spacing={3} sx ={{mt:4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{backgroundColor: '#444444', color:'#f0f0f0'}}>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant='h6'>
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
