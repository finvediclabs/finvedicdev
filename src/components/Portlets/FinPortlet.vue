<template>
  <div class="portlet">
    <slot></slot>
  </div>
</template>

<style scoped>
.portlet {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
}

[class*=col] .portlet {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
[class*=col]:first-child .portlet {
  margin-left: 0.5rem;
}
[class*=col]:last-child .portlet {
  margin-right: 0.5rem;
}
</style>
