import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialFormData = {
  taskName: '',
  taskDescription: '',
  status: 'Not Started',
  dateCreated: null,
  bp: '',
  devHours: 0,
  qaHours: 0,
  approvedBy: '',
  isBillable: true,
  dueDate: null,
  assignedTo: '',
  releaseDate: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('http://localhost:8080/api/alltasks');
  return response.json();
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await fetch('http://localhost:8080/api/addtask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const editTask = createAsyncThunk('tasks/editTask', async (task) => {
  const response = await fetch('http://localhost:8080/api/editTask', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await fetch(`http://localhost:8080/api/deleteTask/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    task: {
      list: [],
      status: 'idle',
      error: null,
    },
    form: {
      data: initialFormData,
      isModalOpen: false,
      isEditMode: false,
    },
  },
  reducers: {
    setFormData: (state, action) => {
      state.form.data = { ...action.payload };
    },
    resetFormData: (state) => {
      state.form.data = initialFormData;
    },
    setModalOpen: (state, action) => {
      state.form.isModalOpen = action.payload;
    },
    setEditMode: (state, action) => {
      state.form.isEditMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.tasks.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks.status = 'succeeded';
        state.tasks.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.tasks.status = 'failed';
        state.tasks.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.list.push(action.payload);
        state.form.isModalOpen = false;
        state.form.data = initialFormData;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks.list[index] = action.payload;
        state.form.isModalOpen = false;
        state.form.isEditMode = false;
        state.form.data = initialFormData;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.list = state.tasks.list.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFormData, resetFormData, setModalOpen, setEditMode } = tasksSlice.actions;

export default tasksSlice.reducer;