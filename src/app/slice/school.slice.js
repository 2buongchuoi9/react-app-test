import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { StatusState } from "~/utils/constan"
import { default as http } from "~/utils/httpRequest"

const fetchSchool = createAsyncThunk("school/get", async () => {
    const data = await http.get("/school")
    return data.data
})

const schooleSlice = createSlice({
    name: "school",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchool.pending, (state) => {
                state.status = StatusState.LOADING
            })
            .addCase(fetchSchool.rejected, (state, action) => {
                state.status = StatusState.FAIL
                state.error = action.error
            })
            .addCase(fetchSchool.fulfilled, (state, action) => {
                state.status = StatusState.SUCCESS
                // console.log("action info", action.payload)
                state.info = action.payload
            })
    },
})

const { reducer: schoolReduce, actions: schoolAction } = schooleSlice

export { schoolAction }

export default schoolReduce
