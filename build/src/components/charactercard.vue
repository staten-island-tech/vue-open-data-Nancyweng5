<template>
    <router-link :to="'/character/' +  character.name   ">
        <div class = "card">
            <img :src="character.cardImageURL"/>
            <p>{{character.name }}</p>
        </div>
    </router-link>
</template>

<script setup>
defineProps({
  character: Object
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