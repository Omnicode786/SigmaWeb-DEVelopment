// konse tab pr he user
// query kia he uski

import { createSlice } from "@reduxjs/toolkit";

// there is async thung in react redux as well
// hey gpt add a comment toexplain this stuff as well and insert that code here if its relavant to this file else give me a seperate file for that that integrates with my codes

const searchSlice = createSlice({
    name:'Search',
    initialState:{
        query:'',
        activeTab:'photos',
        results:[],
        loading:false,
        error:null
    },
    reducers:{
        setQuery(state, action){
                state.query = action.payload
                // console.log("This is the query: ",state.query);

        },
        setActiveTabs(state,action){

            state.activeTab = action.payload
            // console.log(state.activeTab)
        },
        setLoading(state, action){
state.loading = true
state.error = null
        },
        setResults(state, action){

            state.results = action.payload
            state.loading = false

        },
        clearResults(state){
            state.results = []
        }
        ,
        setError(state, action){
state.error = action.payload
state.loading = false

        },
        


     }
})


export const {setQuery, setActiveTabs, setError, setLoading, setResults} = searchSlice.actions;

export default searchSlice.reducer