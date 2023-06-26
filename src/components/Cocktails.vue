<template>
  <section v-if="loading" class="loadingPage">
    <LoadingPage />
  </section>

  <section v-if="!loading && cocktailsRandom" class="cocktailSection">
    <h1>générateur de cocktails</h1>
    <button class="reloadButton" v-on:click="reloadPage()">
      I want others
    </button>
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

    <ul
      v-if="
        (errors && errors.length && !loading) ||
        (errors && errors.length && loading)
      "
    >
      <li v-for="error of errors">
        {{ error.message }}
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';
import LoadingPage from './LoadingPage.vue';

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
      // this.cocktailsRandom = [];
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
  components: { LoadingPage },
};
</script>
