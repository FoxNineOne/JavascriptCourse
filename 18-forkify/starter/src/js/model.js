import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { API_SEARCH_URL } from './config.js';
import recipeView from './views/recipeView.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    //const res = await fetch(`${API_URL}/${id}`);
    //const data = await res.json();

    //if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //console.log(res, data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTimefdf: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`‼️${err}‼️`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_SEARCH_URL}search?q=${query}`);
    //console.log(data);

    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`‼️${err}‼️`);
    throw err;
  }
};
