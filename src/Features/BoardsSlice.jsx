/* eslint-disable no-useless-catch */
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getAllBoards,createBoard} from "../CrudOperation";



export const fetchBoards = createAsyncThunk('boards/fetchBoards',
     async ()=>{
        try{
            let allBoards = await getAllBoards();
            return allBoards;
        }
        catch(error){
            throw error;
        }
 })

 export const createBoards = createAsyncThunk('createBoard/fecthBoards',
    async (boardName,{rejectWithValue})=>{
        try{
            let createdBoard  = await createBoard(boardName);
            return createdBoard;
        }
        catch(error){
            throw rejectWithValue(error.message);
        }
    }
 )

 const boardSlice = createSlice({
    name:'boards',
    initialState:{
        boards:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
           .addCase(fetchBoards.pending,(state)=>{
            state.loading = true;
            state.error = null;
           })
           .addCase(fetchBoards.fulfilled,(state,action)=>{
            state.loading= false;
            state.boards = action.payload;
           })
           .addCase(fetchBoards.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
           })
           .addCase(createBoards.pending,(state)=>{
            state.loading = true;
            state.error = null;
           })
           .addCase(createBoards.fulfilled,(state,action)=>{
            state.loading = false;
            state.boards.push(action.payload);
           })
           .addCase(createBoards.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
           })
    }
 }
);

 export default boardSlice.reducer;

