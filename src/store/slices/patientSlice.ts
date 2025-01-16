import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAppointments, fetchMedicalRecords, fetchPrescriptions, fetchBills, fetchMessages } from '../../services/api';

export const getAppointments = createAsyncThunk('patient/getAppointments', async () => {
  const response = await fetchAppointments();
  return response.data;
});

export const getMedicalRecords = createAsyncThunk('patient/getMedicalRecords', async (page: number) => {
  const response = await fetchMedicalRecords(page);
  return response.data;
});

//uploadDocument
export const uploadDocument = createAsyncThunk('patient/uploadDocument', async (data: any) =>
  // fetchUploadDocument(data)
console.log("HEllo")

);


export const getPrescriptions = createAsyncThunk('patient/getPrescriptions', async () => {
  const response = await fetchPrescriptions();
  return response.data;
});

export const getBills = createAsyncThunk('patient/getBills', async () => {
  const response = await fetchBills();
  return response.data;
});

export const getMessages = createAsyncThunk('patient/getMessages', async (page: number) => {
  const response = await fetchMessages(page);
  return response.data;
});

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    appointments: [],
    medicalRecords: { items: [], totalPages: 0 },
    prescriptions: [],
    bills: [],
    messages: { items: [], totalPages: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalRecords = action.payload;
      })
      .addCase(getPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = action.payload;
      })
      .addCase(getBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      });
  },
});

export default patientSlice.reducer;

