<template>
  <section class="cocktailSection">
    <h1>générateur de cocktails</h1>
    <div class="cocktailsDiv" v-if="cocktailsRandom && cocktailsRandom.length">
      <article
        class="cocktailCard"
        v-for="cocktail of cocktailsRandom"
        :key="cocktail.idDrink"
      >
        <div>
          <img
            class="cocktailImage"
            v-bind:src="cocktail.strDrinkThumb"
            v-bind:alt="cocktail.strDrink"
          />
        </div>
        <div>
          <h3 class="cocktailName">{{ cocktail.strDrink }}</h3>
          <p class="cocktailCategory">Category: {{ cocktail.strCategory }}</p>
        </div>
        <div class="buttonDiv">
          <router-link
            :to="{ name: 'cocktailDetails', params: { id: cocktail.idDrink } }"
          >
            <button @click="showCocktailDetails(cocktail.idDrink)">
              Shake me
            </button>
          </router-link>
        </div>
      </article>
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
      cocktailsRandom: [],
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
        this.getRandom();
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  //* add getRandom method
  methods: {
    getRandom() {
      const randomNumber = Math.floor(
        Math.random() * this.cocktailsList.length
      );
      this.cocktailsRandom.push(this.cocktailsList[randomNumber]);
      this.cocktailsRandom.push(this.cocktailsList[randomNumber + 1]);
      this.cocktailsRandom.push(this.cocktailsList[randomNumber + 2]);
    },
    //* show single cocktail infos
    showCocktailDetails(cocktailId) {
      console.log(
        this.cocktailsList.filter(
          (singleCocktail) => singleCocktail.idDrink === cocktailId
        )
      );
    },
  },
};
</script>
