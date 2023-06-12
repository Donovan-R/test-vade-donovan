<!-- <script setup>
import { ref } from 'vue';
defineProps({
  msg: String,
});
const count = ref(0);
</script> -->

<template>
  <section class="cocktailSection">
    <h1>générateur de cocktails</h1>

    <!-- <div>
      {{ cocktailsList.map((cocktail) =>
      <article>
        <h3>cocktail.strDrink</h3>
        img cocktail.strDrinkThumb
      </article>
      ) }}
    </div> -->

    <div class="cocktailsDiv" v-if="cocktailsList && cocktailsList.length">
      <article class="cocktailCard" v-for="cocktail of cocktailsList">
        <div>
          <img
            class="cocktailImage"
            v-bind:src="cocktail.strDrinkThumb"
            alt="{{cocktail.strDrink}}"
          />
        </div>
        <div>
          <h3 class="cocktailName">{{ cocktail.strDrink }}</h3>

          <p class="cocktailInstructions">{{ cocktail.strInstructions }}</p>
        </div>
      </article>
      <!-- <span>{{ cocktail.strDrinkThumb }}</span> -->
    </div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{ error.message }}
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cocktailsList: [],
      errors: [],
    };
  },

  // Pulls cocktails when the component is created.
  created() {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.cocktailsList = response.data.drinks;
        console.log(response.data.drinks[0]);

        // console.log(
        //   this.cocktailsList.slice(0, 3).map((cocktail) => cocktail.strDrink)
        // );
        console.log(testTab);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    choose() {
      const threeRandomCocktails = Math.floor(
        Math.random() * this.cocktailsList.length
      );
      this.randomCocktails = this.cocktailsList[threeRandomCocktails];
      console.log(this.randomCocktails);
    },
  },
};
</script>
