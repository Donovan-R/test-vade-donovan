<template>
  <section class="singleCocktailSection">
    <h2>{{ cocktailInfos.name }}</h2>
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
      },
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
        };
        console.log(response.data.drinks[0]);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  //* add getRandom method
  methods: {
    //* show single cocktail infos
  },
};
</script>
