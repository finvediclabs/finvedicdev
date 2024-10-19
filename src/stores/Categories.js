import { defineStore } from 'pinia';
import axios from 'axios';
import { useSessionStore } from "src/stores/session"; // Import the session store

const baseUrl = (process.env.VUE_APP_CORE_URL || '').replace(/\/$/g, '') + '/';

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    subCategories: [],
    selectedCategory: {},
    selectedSubCategory: {},
  }),
  actions: {
    fetchCategories() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };

      axios.get(baseUrl + 'api/chapterCategoriess', { headers }).then(response => {
        const categories = response.data.map(category => {
          if (category.categoryCode === "INTR_TO_BANK") {
            category.categoryName = "Fintech And Financial Services Landscape";
          }
          return category;
        });
        this.categories = categories;
        this.fetchSubCategories();
      });
    },
    fetchSubCategories() {
      const sessionStore = useSessionStore(); // Get the session store
      const token = sessionStore.token; // Retrieve the token

      const headers = {
        Authorization: `Bearer ${token}`, // Attach the token in the request headers
      };

      axios.get(baseUrl + 'api/chapterSubCategoriess', { headers }).then(response => {
        this.subCategories = Object.groupBy(response.data, product => {
          return product.categoryCode;
        });

        if (this.categories.length > 0 && this.subCategories[this.categories[0].id]) {
          this.selectedCategory = this.categories[0];
          this.selectedSubCategory = this.subCategories[this.categories[0].id][0];
        } else {
          this.selectedCategory = this.categories[0];
        }
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedSubCategory = {};
    },
    selectSubCategory(category, subCategory) {
      this.selectedCategory = category;
      this.selectedSubCategory = subCategory;
    }
  },
});
