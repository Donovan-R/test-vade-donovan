<template>
  <section v-if="loading" class="loadingPage">
    <h2>chargement en cours</h2>
  </section>
  <section v-if="!loading && cocktailsRandom" class="cocktailSection">
    <h1>générateur de cocktails</h1>
    <button class="reloadButton" v-on:click="reloadPage()">
      I want others
    </button>
    {{ console.log(cocktailsRandom) }}
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
            <button>Shake me</button>
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
// import { fa } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Refresh } from '@iconsans/vue';

export default {
  data() {
    return {
      cocktailsRandom: [],
      loading: true,
      errors: [],
    };
  },

  // Pulls cocktails when the component is created.
  created() {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.getRandom(response.data.drinks);
        this.loading = false;
      })
      .catch((e) => {
        this.errors.push(e);
        // this.getRandom();
      });
  },

  //* add getRandom method
  methods: {
    getRandom(cocktailsList) {
      const randomNumber = Math.floor(
        Math.random() * (cocktailsList.length - 2)
      );
      this.cocktailsRandom.push(cocktailsList[randomNumber]);
      this.cocktailsRandom.push(cocktailsList[randomNumber + 1]);
      this.cocktailsRandom.push(cocktailsList[randomNumber + 2]);
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
