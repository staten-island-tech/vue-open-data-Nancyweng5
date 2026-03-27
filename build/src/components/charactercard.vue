<template>
    <router-link :to="'/character/' + name   ">
        <div class = "card">
          <div class="cardimg">
            <img :src = "imageURL"/>
          </div>
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
.card-link {
  text-decoration: none;
}
 
.card {
  width: 110px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  padding: 12px 8px 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
 
.card:hover {
  transform: translateY(-4px);
  background: rgba(201, 169, 110, 0.1);
  border-color: rgba(201, 169, 110, 0.4);
}
 
.cardimg {
  width: 72px;
  height: 72px;
  margin: 0 auto 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
 
img {
  width: 68px;
  height: 68px;
  object-fit: cover;
}

</style>
