<template>
    <div v-if = "character">
        <h2>{{ character.name }}</h2>
        <img :src = "imageURL">
        <MaterialList :character = "character"/>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import MaterialList from '../components/MaterialList.vue'
const route = useRoute()
const character = ref(null)
async function getCharacter(id){
    try {
        const response = await fetch(`https://genshin.jmp.blue/characters/${id}`)
        const data = await response.json()
        character.value = data
    } catch {
        console.log("Failed to load character")
    }
}
const imageUrl = computed(() => {
    return `https://genshin.jmp.blue/characters/${route.params.id}/gacha-splash`
})
</script>

<style scoped>

</style>