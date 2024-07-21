<template>
  <div class="portlet-header row q-pb-sm q-mb-lg q-gutter-md" :class="{'bordered': bordered}" style=" --bs-gutter-x: 0.5rem;!important; ">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bordered: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>
.portlet-header.bordered {
  border-bottom: 1px solid rgb(219, 219, 219);
  margin-left: calc(-0.7 * var(--bs-gutter-x));
  margin-right: calc(-0.7 * var(--bs-gutter-x));
  padding-left: calc(0.2 * var(--bs-gutter-x));
  padding-right: calc(0.2 * var(--bs-gutter-x));
}
</style>
