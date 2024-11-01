/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCard } from "../../CurdOperation";
import CustomCardDialog from "./CustomCardDialog.jsx";
import { Typography, IconButton, Paper } from "@mui/material";
import toast from "react-hot-toast";
import theme from "../styles/theme";

function Card({ cardData, cards, updateCards, setLoaderState }) {
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const handleDeleteCard = async (event) => {
        event.stopPropagation();
        const originalCards = [...cards];
        const updatedCards = cards.filter((card) => card.id !== cardData.id);

        updateCards(updatedCards);

        try {
            setLoaderState(true);
            await deleteCard(cardData.id);
        } catch (error) {
            toast.error(error.message);
            updateCards(originalCards);  // Revert if error occurs
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    border: 2,
                    borderColor: theme.palette.primary.main,
                    backgroundColor: '#22272B',
                    color: "white",
                    cursor: "pointer",
                    mb: 1,
                }}
                onClick={() => setIsCardModalOpen(true)}
            >
                <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "white" }}
                >
                    {cardData.name}
                </Typography>
                <IconButton
                    onClick={handleDeleteCard}
                    sx={{
                        color: theme.palette.primary.delete,
                        "&:hover": {
                            color: theme.palette.primary.deleteHover,
                        },
                        transition: "0.1s ease",
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Paper>
            {isCardModalOpen && (
                <CustomCardDialog
                    isOpen={isCardModalOpen}
                    setModalState={setIsCardModalOpen}
                    cardData={cardData}
                    key={cardData.id}
                    setLoaderState={setLoaderState}
                />
            )}
        </>
    );
}

export default Card;
