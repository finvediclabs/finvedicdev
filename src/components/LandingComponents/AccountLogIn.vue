<template>
  <div class="row q-py-md q-gutter-x-md ">
    <div class="col">
      <q-btn outline class="full-width fin-br-8">
        <q-space />
        <q-img :src="googleIcon" :ratio="1" style="width: 20px" />
        <q-space />
        Google
        <q-space />
      </q-btn>
    </div>
    <div class="col">
      <q-btn outline class="full-width fin-br-8">
        <q-space />
        <q-img :src="gitIcon" :ratio="1" style="width: 20px" />
        <q-space />
        Git Hub
        <q-space />
      </q-btn>
    </div>
  </div>
</template>
<script>
import googleIcon from "src/assets/google 1.png";
import gitIcon from "src/assets/Vector.svg";
export default {
  data() {
    return {
      googleIcon: googleIcon,
      gitIcon: gitIcon
    }
  }
}
</script>
