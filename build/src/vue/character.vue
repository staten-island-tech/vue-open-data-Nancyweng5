<template>
    <div class = "characters "v-if = "character">
        <h2>{{ character.name }}</h2>
        <img :src = "imageURL">
        <material :character = "character"/>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import material from '@/components/material.vue'
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
watch(
    ()=> routes.params.id,
)
onMounted(()=>{
    getCharacter(router.params.id)
})
</script>

<style scoped>
.characters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}
img {
width: 300px;
}

</style>