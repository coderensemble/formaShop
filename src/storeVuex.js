// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    database: [], // Votre base de données
  },
  mutations: {
    // Mutation pour mettre à jour la base de données
    updateDatabase(state, newData) {
      state.database = newData;
    },
  },
  actions: {
    // Action pour récupérer les données de la base de données (simulé ici)
    fetchDatabase(context) {
      // Code pour récupérer les données de votre base de données
      const newData = [...]; // Nouvelles données de la base de données
      context.commit('updateDatabase', newData);
    },
  },
  getters: {
    // Getter pour accéder à la base de données
    getDatabase(state) {
      return state.database;
    },
  },
});

export default store;
