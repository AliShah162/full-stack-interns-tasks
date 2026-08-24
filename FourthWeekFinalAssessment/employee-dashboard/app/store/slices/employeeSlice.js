import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees', //this is built in from redux toolkit
  async (_, { rejectWithValue }) => { //we use "_" when we dont need the payload or want to skip it.
    try {
      const response = await axios.get('https://dummyjson.com/users');
      // Transform the data to match our schema
      return response.data.users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        department: user.company?.department || 'N/A',
        company: user.company?.name || 'N/A',
        designation: user.company?.title || 'N/A',
        status: user.status || 'active',
        image: user.image,
        address: user.address,
        birthDate: user.birthDate,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', employeeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {                      
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    },
  },
  extraReducers: (builder) => { //This is a Redux Toolkit feature that handles actions not defined in the reducers field. It's specifically designed for handling async thunk actions
    builder //A callback parameter provided by Redux Toolkit. It Has methods like .addCase() built into it
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => { //A method on the builder object. Used to handle specific action types
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedEmployee, clearSelectedEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;