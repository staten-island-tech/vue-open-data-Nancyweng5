<template>
    <div v-if = "character">
        <h2>{{ character.name }}</h2>
        <img :src="character.cardImageURL" />
        <material :character = "character"/>
    </div>
</template>


<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import material from '@/components/material.vue'
const route = useRoute()
const character = ref(null)
async function getCharacter(name){
    try {
        const response = await fetch( `https://genshin-app-api.herokuapp.com/api/characters/info/${name}?infoDataSize=all`)
        const data = await response.json()
        character.value = data
    } catch {
        console.log("Failed to load character")
    }
}
watch(()=> route.params.id,(newId) => {getCharacter(newId)}
)
onMounted(()=>{
    getCharacter(route.params.id)
})
</script>


<style scoped>

img {
  width: 300px;
}
</style>
