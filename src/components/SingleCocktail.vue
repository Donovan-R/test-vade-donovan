<template>
  <router-link v-if="!loading" to="/">
    <span> back</span>
    <!-- <fa class="faIcon" icon="coffee" />
    <font-awesome-icon :icon="['fas', 'arrow-left']" /> -->
  </router-link>
  <section v-if="loading" class="loadingPage">
    <h2>chargement en cours</h2>
  </section>
  <section v-if="!loading" class="singleCocktailSection">
    <div class="singleCocktailImageContainer">
      <h2 class="singleCocktailName">{{ cocktailInfos.name }}</h2>
      <img
        class="singleCocktailImage"
        v-bind:src="cocktailInfos.image"
        v-bind:alt="cocktailInfos.name"
      />
    </div>
    <div class="singleCocktailInfosContainer">
      <h3>Category</h3>
      <p>{{ cocktailInfos.category }}</p>
      <div class="dosageDiv">
        <ul
          class="ingredientsList"
          v-if="
            cocktailInfos.ingredients && cocktailInfos.ingredients.length > 0
          "
        >
          <li class="titleIngredient"><strong>Ingredients</strong></li>
          <li
            v-for="ingredient of cocktailInfos.ingredients.filter(
              (ingredient) => ingredient !== null
            )"
          >
            {{ ingredient }}
          </li>
        </ul>
        <ul
          class="measuresList"
          v-if="cocktailInfos.measures && cocktailInfos.measures.length > 0"
        >
          <li class="titleMeasure"><strong>Measures</strong></li>
          <li
            v-for="measure of cocktailInfos.measures.filter(
              (measure) => measure !== null
            )"
          >
            {{ measure }}
          </li>
        </ul>
      </div>
      <h3>How shaking me ?</h3>
      <p class="InstructionsText">
        {{ cocktailInfos.instructions }}
      </p>
      <h3>Tip</h3>
      <p>For a better experience, serve it in a {{ cocktailInfos.glass }}</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  //   name: 'cocktailDetails',
  data() {
    return {
      cocktailInfos: {
        name: '',
        instructions: '',
        image: '',
        category: '',
        glass: '',
        ingredients: [],
        measures: [],
      },
      loading: true,
      errors: [],
    };
  },

  // Pulls cocktails when the component is created.
  created() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
    const cocktailId = this.$route.params.id;
    axios
      .get(url + cocktailId)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.cocktailInfos = {
          name: response.data.drinks[0].strDrink,
          instructions: response.data.drinks[0].strInstructions,
          image: response.data.drinks[0].strDrinkThumb,
          category: response.data.drinks[0].strCategory,
          glass: response.data.drinks[0].strGlass,
          ingredients: [
            response.data.drinks[0].strIngredient1,
            response.data.drinks[0].strIngredient2,
            response.data.drinks[0].strIngredient3,
            response.data.drinks[0].strIngredient4,
            response.data.drinks[0].strIngredient5,
            response.data.drinks[0].strIngredient6,
            response.data.drinks[0].strIngredient7,
            response.data.drinks[0].strIngredient8,
            response.data.drinks[0].strIngredient9,
            response.data.drinks[0].strIngredient10,
          ],
          measures: [
            response.data.drinks[0].strMeasure1,
            response.data.drinks[0].strMeasure2,
            response.data.drinks[0].strMeasure3,
            response.data.drinks[0].strMeasure4,
            response.data.drinks[0].strMeasure5,
            response.data.drinks[0].strMeasure6,
            response.data.drinks[0].strMeasure7,
            response.data.drinks[0].strMeasure8,
            response.data.drinks[0].strMeasure9,
            response.data.drinks[0].strMeasure10,
          ],
        };
        this.loading = false;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
