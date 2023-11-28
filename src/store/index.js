import { createStore } from "vuex";

import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK_FiBcwgilswhX5e0C416R0VjLL3D1EY",
  authDomain: "web4-95dfa.firebaseapp.com",
  projectId: "web4-95dfa",
  storageBucket: "web4-95dfa.appspot.com",
  messagingSenderId: "457799809234",
  appId: "1:457799809234:web:2bba90097784fa6709d50b",
  measurementId: "G-2B3XQQ3GK3",
};

const APP = initializeApp(firebaseConfig);

const DB = getFirestore(APP);

export default createStore({
  state: () => ({
    notes: [],
    categories: [],
    checkedCategories: [],
  }),

  getters: {
    filteredNotes(state) {
      return state.notes.filter((el) => {
        if (state.checkedCategories.length > 0) {
          return state.checkedCategories.includes(String(el.categorie));
        }
        return state.notes;
      });
    },
  },

  mutations: {
    setNotes(state, data) {
      state.notes.push(data);
    },

    setCategories(state, data) {
      state.categories.push(data);
    },

    updateNote(state, data) {
      const idx = state.notes.findIndex((el) => el.id === data.id);
      state.notes.splice(idx, 1, data);
    },

    deleteNote(state, data) {
      const idx = state.notes.findIndex((el) => el.id === data.id);
      state.notes.splice(idx, 1);
    },

    checkCategorie(state, data) {
      state.checkedCategories.push(data);
    },

    unCheckCategorie(state, data) {
      const idx = state.checkedCategories.indexOf(data);
      state.checkedCategories.splice(idx, 1);
    },
  },

  actions: {
    fetchCategories({ commit }) {
      getDocs(collection(DB, "Categories")).then((res) =>
        res.forEach((el) => commit("setCategories", el.data()))
      );
    },

    fetchNotes({ commit }) {
      getDocs(collection(DB, "Notes")).then((res) =>
        res.forEach((el) => commit("setNotes", el.data()))
      );
    },

    addNote({ commit }, data) {
      setDoc(doc(DB, "Notes", `${data.id}`), data);
      commit("setNotes", data);
    },

    updateNote({ commit }, data) {
      setDoc(doc(DB, "Notes", `${data.id}`), data);
      commit("updateNote", data);
    },

    deleteNote({ commit }, data) {
      deleteDoc(doc(DB, "Notes", `${data.id}`));
      commit("deleteNote", data);
    },

    checkCategorie({ commit }, data) {
      commit("checkCategorie", data);
    },

    unCheckCategorie({ commit }, data) {
      commit("unCheckCategorie", data);
    },
  },
});
