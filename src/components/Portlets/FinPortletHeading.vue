<template>
  <div class="col">
    <p :class="headingType" class="page-heading text-weight-bolder" style="white-space: no-wrap !important;">
      <q-icon name="arrow_back" style="font-weight: bold; color: #5479F7;" class="cursor-pointer" @click="$router.go(-1)"
        v-if="backArrow" />
      <slot></slot>
      <q-spinner-ios v-if="loading" color="black" size="0.6em" class="q-ml-sm"/>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    backArrow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headingType() {
      return this.small ? 'text-h5' : 'text-h4';
    }
  },
}
</script>

<style scoped>
.page-heading {
  margin-bottom: 0;
}

h1.page-heading {
  font-size: 1.375rem;
  line-height: 2.25rem;
  color: #3b444d;
  font-weight: bold;
}

h2.page-heading {
  font-size: 1.125rem;
  line-height: 2rem;
  color: #3b444d;
}
</style>
