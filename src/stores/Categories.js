import { defineStore } from 'pinia';
import axios from 'axios'

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
      axios.get(baseUrl + 'api/chapterCategoriess').then(response => {
        const categories = response.data.map(category => {
          if (category.categoryCode === "INTR_TO_BANK") {
            category.categoryName = "Fintech And Financial Services Landscape";
          }
          return category;
        });
        this.categories = categories;
        this.fetchSubCategories();
      })
    },
    fetchSubCategories() {
      axios.get(baseUrl + 'api/chapterSubCategoriess').then(response => {
        this.subCategories = Object.groupBy(response.data, product => {
          return product.categoryCode;
        });

        if (this.categories.length > 0 && this.subCategories[this.categories[0].id]) {
          this.selectedCategory = this.categories[0];
          this.selectedSubCategory = this.subCategories[this.categories[0].id][0];
        } else {
          this.selectedCategory = this.categories[0];
        }
      })
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
