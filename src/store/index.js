// store/index.js
import { createStore } from 'vuex';
import textsModule from './texts';
import fontsModule from './fonts';
import fontInfo from './fontInfo';
import customFontModule from './customFontModule'; // add

// Import Vuex module for managing features tags
import Features_tags from './Features-tags';

// Create the Vuex store
const store = createStore({
  state: {
    // Initial state with a null database
    database: null,
    fontLoaded: false,
  },
  mutations: {
    // Mutation to set the database in the state
    setDatabase(state, db) {
      state.database = db;  // Set the database in the state
    },
    setFontLoaded(state, value) {
      state.fontLoaded = value
    },
  },
  modules: {
    // Include various Vuex modules for managing specific aspects of the application
    Features_tags: Features_tags,  // Features tags module
    fontInfo: fontInfo,  // Font information module
    texts: textsModule,  // Texts module
    fonts: fontsModule,  // Fonts module
    customFontModule: customFontModule, // add
  },
});

export default store;
