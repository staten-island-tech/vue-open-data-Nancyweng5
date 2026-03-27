<template>
    <div class = "home">
      <div class = "header">
        <h1 class = "title">Genshin Character Info</h1>
        <p class = "subtitle">Genshin Characters</p>
        </div>
        <characterchart :characters="characters"/>
   <div class="grid">
     <charactercard v-for="char in characters":key="char":name="char"/>
   </div>
 </div>
</template>


<script setup>
import { ref, onMounted } from "vue"
import charactercard from "@/components/charactercard.vue";
import characterchart from "@/components/characterchart.vue";
const characters = ref([])
async function getcharacters(){
  try {
    const response = await fetch('https://genshin.jmp.blue/characters')
    const data = await response.json()
    characters.value = data
  } catch (err){
    console.log("Failed to load characters")
  }
}
onMounted(() => {
  getcharacters()
})


</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito:wght@300;400;500&display=swap');
.home {
  min-height: 100vh;
  background: #646d8c;
  padding: 40px 32px 80px;
  font-family: 'Nunito', sans-serif;
  color: #2c2a4a;
  max-width: 1400px;
  margin: 0 auto;
}
.header {
  text-align: center;
  margin-bottom: 40px;
}
.title {
   font-family: 'Cinzel', serif;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #2c2a4a;
  margin: 0;
  text-shadow: 0 0 40px rgba(201, 169, 110, 0.3);
}
.subtitle {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2c2a4a;
  margin: 32px 0 16px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.2);
  padding-bottom: 8px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
</style>
