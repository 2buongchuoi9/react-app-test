import { combineReducers, configureStore } from "@reduxjs/toolkit"
import schoolReduce from "./slice/school.slice"

const rootReducer = combineReducers({
    school: schoolReduce,
    // info: infosReducer,
    // category: categoryReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
