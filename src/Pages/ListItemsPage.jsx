/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getLists, createList } from "../CurdOperation";
import toast from "react-hot-toast";
import theme from "../Components/styles/theme";
import List from "../Components/Board/BoardList";
import Loader from "../Components/ErrorHandler/Loader"
import Toast from "../Components/ErrorHandler/Toast"
import backgroundImage from '../assets/backgroundImage.webp';
import MyCustomDialog from '../Components/MyCustomDialog'

function ListsItemsPage() {
    const { id } = useParams();
    const [lists, setLists] = useState([]);
    const [formState, setFormState] = useState(true);
    const [loader, setLoaderState] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                setLoaderState(true);
                const listsData = await getLists(id);
                setLists(listsData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoaderState(false);
            }
        };
        fetchLists();
    }, [id]);

    const createHandler = async(inputValue) => {
       
        try
         {
                const createdList = await createList(inputValue, id);
                setLists([createdList, ...lists]);
                toast.success(`${inputValue} created successfully!`);
            }
         catch (error) {
            toast.error(error.message);
        } finally {
            setFormState(true);
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    py: 8,
                    height: "100%",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                     minHeight: '100vh',
                    // overflowX:'auto'
                }}
            >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                >
                    <Grid
                        item
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                        <IconButton component={Link} to="/">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            />
                        </IconButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setFormState(false)}
                            sx={{
                                fontWeight: "bold",
                                borderRadius: "40px",
                                py: 2,
                                px: 6,
                                backgroundColor: theme.palette.primary.accent,
                                color: theme.palette.primary.dark,
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.primary.accent,
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Create List
                        </Button>
                        
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        alignItems: { md: "start", xs: "center" },
                        gap: 2,
                       overflowX:'auto',
                       textDecoration:'none'
                    }}
                >
                    {lists.length > 0 || loader ? (lists.map((list) => (
                        <List
                            listData={list}
                            key={list.id}
                            allLists={lists}
                            updateLists={setLists}
                            setLoaderState={setLoaderState}
                        />
                    ))) : (<Typography sx={{textAlign: "center", width: "100%", fontWeight: "500", fontSize: "1.3rem", py: 12}}>No lists available...</Typography>)}
                </Box>
            </Box>
            <MyCustomDialog 
              open={!formState}
              onClose={() => setFormState(true)}
              onChange={createHandler}
              name={'Create List'}
            
            />
            {loader && <Loader />}
            <Toast />
        </>
    );
}

export default ListsItemsPage;