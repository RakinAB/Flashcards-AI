'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { AppBar, Link, Toolbar, Box, Button, Card, CardActionArea, CardContent, CircularProgress, Container, Grid, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Flashcard(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [setName, setSetName] = useState("") // New state for storing the set name
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

            // Fetch the set name from the user's document
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)
            if (userDocSnap.exists()) {
                const collections = userDocSnap.data().flashcards || []
                const currentSet = collections.find((f) => f.name === search)
                if (currentSet) {
                    setSetName(currentSet.name)
                }
            }
        }
        getFlashcard()  
    },[user, search]) // Add 'search' to the dependency array

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if(!isLoaded){
        return <></>
    }
    if(!isSignedIn){
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
                        textDecoration: 'none',
                        color: 'white',
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
                    <Button color='inherit' href="/generate">Generate +</Button>
                    <Button color='inherit' href="/flashcards"> My Sets</Button>
                    <UserButton />
                </SignedIn>
                </Toolbar>
            </AppBar>
            
            {/* Display the flashcard set name */}
            <Typography variant="h3" sx={{ mt: 4, fontWeight:'bold' }}>
                {setName}
            </Typography>

            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
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
