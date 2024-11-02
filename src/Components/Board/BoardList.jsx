/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import {
    Box,
    Typography,
    IconButton,
    Button,
    Paper,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { getCards, createCard, deleteList } from "../../CrudOperation";

import Card from "./Card";
import toast from "react-hot-toast";
import Toast from '../ErrorHandler/Toast';
import theme from "../styles/theme";
import MyCustomDialog from "../MyCustomDialog";

function List({ listData, allLists, updateLists, setLoaderState }) {
    const [cardList, updateCardList] = useState([]);
    const [addCard, setAddCard] = useState(false);

    const fetchCards = async () => {
        try {
            setLoaderState(true);
            const cardsData = await getCards(listData.id);
            updateCardList(cardsData);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, [listData.id, setLoaderState]);

    const handleDeleteList = async () => {
        const originalLists = [...allLists];
        const newList = allLists.filter((list) => list.id !== listData.id);
        updateLists(newList);
        try {
            setLoaderState(true);
            await deleteList(listData.id);
        } catch (error) {
            toast.error(error.message);
            updateLists(originalLists);
        } finally {
            setLoaderState(false);
        }
    };

    const handleSubmit = async (cardName) => {
        if (cardName.length <= 2) {
            toast.error("Card name should be more than 2 characters.");
            return;
        }
        try {
            setLoaderState(true);
            const createdCard = await createCard(cardName, listData.id);
            updateCardList([...cardList, createdCard]);
            toast.success(`${cardName} created successfully!`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: '#B6C2CF' }}>
                    {listData.name}
                </Typography>
                <IconButton
                    onClick={handleDeleteList}
                    sx={{
                        color: theme.palette.primary.delete,
                        "&:hover": {
                            color: theme.palette.primary.deleteHover, 
                        },
                        transition: "0.1s ease"
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    overflowY: "auto",
                    maxHeight: 400,
                }}
            >
                {cardList.map((card) => (
                    <Card
                        cardData={card}
                        key={card.id}
                        cards={cardList}
                        updateCards={updateCardList}
                        setLoaderState={setLoaderState}
                    />
                ))}
            </Box>
            <Box>
                <Button onClick={() => setAddCard(true)}>Add Card</Button>
                <MyCustomDialog 
                    open={addCard}
                    onClose={() => setAddCard(false)}
                    onChange={handleSubmit} 
                    name={'Create Card'}
                />
            </Box>

            <Toast />
        </Paper>
    );
}

export default List;
