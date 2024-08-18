'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

import { useSearchParams } from "next/navigation"
import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"

export default function Flashcard(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const router = useRouter()

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(()=>{
        async function getFlashcard(){
            if(!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docSnap = await getDocs(colRef)
            const flashcards = []

            docSnap.forEach((doc)=>{
                flashcards.push({id:doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()  
    },[user]) 

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if(!isLoaded || !isSignedIn){
        router.push(`/sign-in`)
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
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={15} sm={7} md={5} key={index}>
                        <Card sx={{
                                backgroundColor: '#444444',
                                color: '#f0f0f0',
                                borderRadius: 6
                            }}
                        >
                            <CardActionArea
                                onClick={() => {
                                    handleCardClick(index);
                                }}                    
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            perspective: "1000px",
                                            "& > div": {
                                            transition: "transform 0.6s",
                                            transformStyle: "preserve-3d",
                                            position: "relative",
                                            width: "100%",
                                            height: "200px",
                                            boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
                                            transform: flipped[index]
                                                ? "rotateY(180deg)"
                                                : "rotateY(0deg)",
                                            borderRadius:6
                                            },
                                            "& > div > div": {
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            p: 2,
                                            boxSizing: "border-box",
                                            },
                                            "& > div > div:nth-of-type(2)": {
                                                transform: "rotateY(180deg)",
                                            },
                                            borderRadius:6
                                        }}
                                    >
                                        <div>
                                            <div>
                                            <Typography variant="h5" component={"div"}>
                                                {flashcard.front}
                                            </Typography>
                                            </div>
                                            <div>
                                            <Typography variant="h5" component={"div"}>
                                                {flashcard.back}
                                            </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>                           
                ))} 
            </Grid>
        </Container>
    )
}