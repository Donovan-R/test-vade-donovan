<!-- <script setup>
import { ref } from 'vue';
defineProps({
  msg: String,
});
const count = ref(0);
</script> -->

<template>
  <h1>générateur de cocktails</h1>
  <div class="cocktailsDiv">
    <!-- <div>
      {{ cocktailsList.map((cocktail) =>
      <article>
        <h3>cocktail.strDrink</h3>
        img cocktail.strDrinkThumb
      </article>
      ) }}
    </div> -->

    <div v-if="cocktailsList && cocktailsList.length">
      <article v-for="cocktail of cocktailsList">
        <h3>{{ cocktail.strDrink }}</h3>
        <img v-bind:src="cocktail.strDrinkThumb" alt="" />
        <p>{{ cocktail.strInstructions }}</p>
      </article>
      <!-- <span>{{ cocktail.strDrinkThumb }}</span> -->
    </div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{ error.message }}
      </li>
    </ul>
  </div>
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
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
