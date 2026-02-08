
import {configureStore} from '@reduxjs/toolkit' 
import searchReducer from './features/searchSlice'
import collectionReducer from './features/collectionSlice'

export const store = configureStore({

reducer:{
    // here we will give the reduer function which are from the features

    search: searchReducer,
        collection: collectionReducer,


}


})