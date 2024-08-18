'use client'

import { useUser } from "@clerk/nextjs"
import { Link, AppBar, Toolbar, Box, Button, Card, CardActionArea, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { getDoc, writeBatch, doc, setDoc, collection} from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db } from "@/firebase"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () =>{
        setLoading(true);  // Start loading
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => {
                setFlashcards(data);
                setLoading(false);  // Stop loading
            })
            .catch(() => setLoading(false))  // Stop loading in case of error
    }

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    if(!isLoaded || !isSignedIn){
        router.push(`/sign-in`)
    }

    const saveFlashcards = async () => {
        if(!name) {
            alert('Please enter a name...')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()){
            const collections = docSnap.data().flashcards || []
            if(collections.find((f)=> f.name === name)){
                alert("Flashcard collection with the same name already exists...")
                return
            } else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge:true})
            }
        } else{
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return(
        <Container maxWidth='md'>
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
                sx={{
                    mt:4, 
                    mb:6, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3" sx={{mb:2}}>
                    Generate Flashcards
                </Typography>
                <Paper sx={{p:4, width:'100%', backgroundColor:'#444444', }}>
                    <TextField 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        label="Enter Text"
                        fullWidth
                        multiline
                        rows={6}
                        variant="standard"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            fontWeight:'bold',
                            '& .MuiInputBase-input': {
                              color: '#f0f0f0', // This makes the input text white
                            },
                            '& .MuiInput-underline:before': {
                              borderBottomColor: 'rgba(255, 255, 255, 0.5)', // White underline with opacity
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                              borderBottomColor: '#f0f0f0', // White underline on hover
                            },
                            '& .MuiInput-underline:after': {
                              borderBottomColor: '#f0f0f0', // White underline when focused
                            },
                            '& .MuiInputLabel-root': {
                              color: '#f0f0f0', // Label color with opacity
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#f0f0f0', // Label color when focused
                            },
                          }}
                    />
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                        sx=
                            {{
                                p:2, 
                                mt:4, 
                                borderRadius:12,
                                backgroundColor: '#03fccb',
                                "&:hover": {
                                    backgroundColor: '#04d9af'
                                }, 
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    backgroundColor: '#04d9af',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                                }
                           }}
                    >
                        Generate
                    </Button>
                </Paper>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress sx={{color: '#f0f0f0'}}/>
                </Box>
            ) : (
                flashcards.length > 0 && (
                <Box sx={{mt:4}}>
                    <Typography variant="h5">Flashcards Preview</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                backgroundColor: '#444444',
                                color: '#f0f0f0',
                                borderRadius: 6
                            }}>
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
                    <Box sx={{mt:4, display: 'flex', justifyContent: 'center'}}>
                        <Button 
                            variant="contained" 
                            color='secondary' 
                            onClick={handleOpen}
                            sx=
                            {{
                                p:2, 
                                mb:4, 
                                borderRadius:12,
                                backgroundColor: '#03fccb',
                                "&:hover": {
                                    backgroundColor: '#04d9af'
                                }, 
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    backgroundColor: '#04d9af',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                                }
                           }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for your collection:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label='Collection Name'
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) =>setName(e.target.value)}
                        variant="outlined"
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )

}
