<template>
    <router-link :to="'/character/' + name ">
        <div class = "card">
            <img :src = "imageURL"/>
            <p>{{ name }}</p>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    name: String
})
const imageURL = computed(() => {
  return `https://genshin.jmp.blue/characters/${props.name}/icon`
})
</script>

<style scoped>
.card {
  width: 120px;
  border: 1px solid gray;
  text-align: center;
  padding: 10px;
}
img {
  width: 80px;
}
</style>