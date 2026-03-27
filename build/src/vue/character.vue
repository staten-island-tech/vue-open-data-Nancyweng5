<template>
    <div class = "characterpage" v-if = "character">
        <div class = "splashart ">
        <img class = "img":src="imageUrl" />
        <div class = "overview"> 
            <h2 class = "name">{{ character.name }}</h2>
        </div>
        </div>
        <info :character = "character"/>
    </div>
</template>


<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import info from '@/components/info.vue'
const route = useRoute()
const character = ref(null)
const imageUrl = computed(() => {
    return `https://genshin.jmp.blue/characters/${route.params.id}/gacha-splash`
})
async function getCharacter(name){
    try {
        const response = await fetch(`https://genshin.jmp.blue/characters/${name}`)
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
.characterpage {
    background: #646d8c;
  min-height: 100vh;
  font-family: 'Nunito', sans-serif;
  color: #2c2a4a;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}
.splashart {
    position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  background: #111827;
}
.img {
    width: 100%;
  max-height: 420px;
  object-fit: cover;
  object-position: top;
  display: block;
}
.overview{
    position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 28px;
  background: linear-gradient(transparent, rgba(0,0,0,0.75));
}
.name {
    font-family: 'Cinzel', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #f0e6d0;
  margin: 0 0 6px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8);
}
</style>
