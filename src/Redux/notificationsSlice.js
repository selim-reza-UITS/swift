// src/redux/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [], // {id, title, message, timestamp, client_id, read}
  },
  reducers: {
    upsertNotification: (state, action) => {
      // add new or update existing by id; newest on top
      const n = action.payload;
      const idx = state.items.findIndex(x => x.id === n.id);
      const normalized = { ...n, read: !!n.read }; // ensure read exists
      if (idx === -1) {
        state.items.unshift(normalized);
      } else {
        state.items[idx] = { ...state.items[idx], ...normalized };
        // move to top if desired
        const item = state.items.splice(idx, 1)[0];
        state.items.unshift(item);
      }
    },
    setNotifications: (state, action) => {
      state.items = action.payload;
    },
    markRead: (state, action) => {
      const id = action.payload;
      const idx = state.items.findIndex(x => x.id === id);
      if (idx !== -1) state.items[idx].read = true;
    },
    markAllRead: (state) => {
      state.items = state.items.map(i => ({ ...i, read: true }));
    },
    clearNotifications: (state) => {
      state.items = [];
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  },
});

export const {
  upsertNotification,
  setNotifications,
  markRead,
  markAllRead,
  clearNotifications,
  removeNotification
} = notificationsSlice.actions;
const notificationsReDucer = notificationsSlice.reducer;
export default notificationsReDucer;
