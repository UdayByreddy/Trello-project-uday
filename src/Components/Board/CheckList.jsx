/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSquareCheck,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import {
    Box,
    Typography,
    IconButton,
    LinearProgress,
    InputBase,
    Button,
    CircularProgress,
} from "@mui/material";

import { getCheckitems, createCheckitem } from "../../CrudOperation";
import Checkitem from "./Checkitem";
import toast from "react-hot-toast";
import theme from "../styles/theme";

function Checklist({ data, deleteChecklist, setLoaderState }) {
    const [checkitems, setCheckitems] = useState([]);
    const [percentageCompleted, setPercentageCompleted] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Checkitems
    useEffect(() => {
        const fetchCheckitems = async () => {
            try {
                setLoaderState(true);
                const checkItems = await getCheckitems(data.id);
                setCheckitems(checkItems);
                updateProgressBar(checkItems);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoaderState(false);
            }
        };
        fetchCheckitems();
    }, [data.id, setLoaderState]);

    // Update Progress Bar Calculation
    const updateProgressBar = useCallback((items) => {
        let checkedItemsCount = items.filter((item) => item.state === "complete").length;
        let completed = items.length ? Math.floor((checkedItemsCount / items.length) * 100) : 0;
        setPercentageCompleted(completed);
    }, []);

    // Validate Checkitem Name
    const isChecklistNameValid = (name) => name.length > 2;

    // Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const checkitemName = event.target.checkitemName.value;

        if (!isChecklistNameValid(checkitemName)) {
            return toast.error("Checkitem name should be more than 2 characters.");
        }

        try {
            setIsLoading(true);
            setLoaderState(true);
            event.target.checkitemName.value = "";

            const createdCheckitem = await createCheckitem(checkitemName, data.id);
            const updatedCheckitems = [...checkitems, createdCheckitem];
            setCheckitems(updatedCheckitems);
            updateProgressBar(updatedCheckitems);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setLoaderState(false);
        }
    };

    return (
        <Box
            sx={{
                border: "2px solid",
                borderColor: "#22272B",
                p: 4,
                borderRadius: 1,
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        style={{
                            width: "32px",
                            height: "32px",
                            color: theme.palette.primary.accent,
                        }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                        {data.name}
                    </Typography>
                </Box>
                <IconButton
                    onClick={deleteChecklist}
                    sx={{
                        color: theme.palette.primary.delete,
                        "&:hover": {
                            color: theme.palette.primary.deleteHover,
                        },
                        transition: "0.1s ease",
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ width: "24px", height: "24px" }} />
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                <Typography sx={{ width: "3rem", textAlign: "center", fontWeight: "bold", color: theme.palette.secondary.main }}>
                    {percentageCompleted}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={percentageCompleted}
                    sx={{
                        width: "100%",
                        height: "10px",
                        borderRadius: "5px",
                        backgroundColor: theme.palette.secondary.main,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: percentageCompleted === 100 ? theme.palette.success.main : "#22272B",
                            transition: "0.3s ease",
                        },
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "start" }}>
                {checkitems.map((checkitem) => (
                    <Checkitem
                        key={checkitem.id}
                        data={checkitem}
                        checkitems={checkitems}
                        setCheckitems={setCheckitems}
                        cardId={data.idCard}
                        updateProgressBar={updateProgressBar}
                    />
                ))}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            height: "100%",
                            minWidth: "40px",
                            fontSize: "1rem",
                            py: "15px",
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "ADD"}
                    </Button>
                    <InputBase
                        placeholder="Add item"
                        id="checkitemName"
                        sx={{
                            backgroundColor: "#22272B",
                            color: theme.palette.secondary.main,
                            px: 4,
                            py: 1,
                            borderRadius: "5px",
                            flex: 1,
                            minHeight: "32px",
                            width: "100px",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Checklist;
