<template>
  <router-link v-if="!loading" to="/">
    <button class="backButton">back</button>
    <!-- <fa class="faIcon" icon="coffee" />
import LoadingPage from './LoadingPage.vue';
    <font-awesome-icon :icon="['fas', 'arrow-left']" /> -->
  </router-link>
  <section v-if="loading" class="loadingPage">
    <LoadingPage />
  </section>
  <section v-else class="singleCocktailSection">
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
import LoadingPage from './LoadingPage.vue';

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
        const cocktailDatas = response.data.drinks[0];
        this.cocktailInfos = {
          name: cocktailDatas.strDrink,
          instructions: cocktailDatas.strInstructions,
          image: cocktailDatas.strDrinkThumb,
          category: cocktailDatas.strCategory,
          glass: cocktailDatas.strGlass,
          ingredients: [
            cocktailDatas.strIngredient1,
            cocktailDatas.strIngredient2,
            cocktailDatas.strIngredient3,
            cocktailDatas.strIngredient4,
            cocktailDatas.strIngredient5,
            cocktailDatas.strIngredient6,
            cocktailDatas.strIngredient7,
            cocktailDatas.strIngredient8,
            cocktailDatas.strIngredient9,
            cocktailDatas.strIngredient10,
            cocktailDatas.strIngredient11,
            cocktailDatas.strIngredient12,
            cocktailDatas.strIngredient13,
            cocktailDatas.strIngredient14,
            cocktailDatas.strIngredient15,
          ],
          measures: [
            cocktailDatas.strMeasure1,
            cocktailDatas.strMeasure2,
            cocktailDatas.strMeasure3,
            cocktailDatas.strMeasure4,
            cocktailDatas.strMeasure5,
            cocktailDatas.strMeasure6,
            cocktailDatas.strMeasure7,
            cocktailDatas.strMeasure8,
            cocktailDatas.strMeasure9,
            cocktailDatas.strMeasure10,
          ],
        };
        this.loading = false;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  components: { LoadingPage },
};
</script>
