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
  const response = await fetch('http://localhost:8080/api/tasks');
  return response.json();
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await fetch('http://localhost:8080/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const editTask = createAsyncThunk('tasks/editTask', async (task) => {
  const response = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await fetch(`http://localhost:8080/api/tasks/${id}`, {
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
        state.task.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.task.status = 'succeeded';
        state.task.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.task.status = 'failed';
        state.task.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.task.list.push(action.payload);
        state.form.isModalOpen = false;
        state.form.data = initialFormData;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.task.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.task.list[index] = action.payload;
        state.form.isModalOpen = false;
        state.form.isEditMode = false;
        state.form.data = initialFormData;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.task.list = state.task.list.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFormData, resetFormData, setModalOpen, setEditMode } = tasksSlice.actions;

export default tasksSlice.reducer;