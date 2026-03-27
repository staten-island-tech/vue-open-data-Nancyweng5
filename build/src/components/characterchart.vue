<template>
  <div class="charts-wrapper">
    <div class="chart-card">
      <h3 class="chart-title">Elements</h3>
      <div class="chart-area">
        <canvas ref="pieCanvas" width="220" height="220"></canvas>
        <div class="legend">
          <div
            v-for="(entry, i) in elementData"
            :key="entry.label"
            class="legend-item"
          >
            <span class="legend-dot" :style="{ background: elementColors[i % elementColors.length] }"></span>
            <span class="legend-label">{{ capitalize(entry.label) }}</span>
            <span class="legend-count">{{ entry.count }}</span>
          </div>
        </div>
      </div>
    </div>
 
    <div class="chart-card">
      <h3 class="chart-title">Weapons</h3>
      <div class="bar-area">
        <div
          v-for="(entry, i) in weaponData"
          :key="entry.label"
          class="bar-row"
        >
          <span class="bar-label">{{ capitalize(entry.label) }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: barWidth(entry.count) + '%',
                background: weaponColors[i % weaponColors.length]
              }"
            ></div>
          </div>
          <span class="bar-count">{{ entry.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
 
const props = defineProps({
  characters: Array
})
 
const pieCanvas = ref(null)
 
const elementColors = [
  '#5ec6f2', // hydro
  '#f51b1b', // pyro
  '#28a14a', // dendro
  '#c683e6', // electro
  '#ffa726', // geo
  '#26c6da', // cryo
  '#ec407a', // anemo
]
 
const weaponColors = [
  '#f9a825',
  '#8d6e63',
  '#78909c',
  '#ef5350',
  '#66bb6a',
]
 
const elementData = ref([])
const weaponData = ref([])
 
function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
 
function barWidth(count) {
  const max = Math.max(...weaponData.value.map(e => e.count), 1)
  return Math.round((count / max) * 100)
}
 
async function loadChartData() {
  const names = props.characters
  if (!names || names.length === 0) return
 
  const elementCount = {}
  const weaponCount = {}
 
  await Promise.all(names.map(async (name) => {
    try {
      const res = await fetch(`https://genshin.jmp.blue/characters/${name}`)
      const data = await res.json()
      const el = (data.vision || data.element || 'unknown').toLowerCase()
      const wp = (data.weapon || 'unknown').toLowerCase()
      elementCount[el] = (elementCount[el] || 0) + 1
      weaponCount[wp] = (weaponCount[wp] || 0) + 1
    } catch {
      // skip failed
    }
  }))
 
  elementData.value = Object.entries(elementCount)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
 
  weaponData.value = Object.entries(weaponCount)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
 
  await nextTick()
  drawPie()
}
 
function drawPie() {
  const canvas = pieCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const total = elementData.value.reduce((s, e) => s + e.count, 0)
  if (total === 0) return
 
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const r = 90
 
  ctx.clearRect(0, 0, canvas.width, canvas.height)
 
  let startAngle = -Math.PI / 2
 
  elementData.value.forEach((entry, i) => {
    const slice = (entry.count / total) * 2 * Math.PI
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, startAngle, startAngle + slice)
    ctx.closePath()
    ctx.fillStyle = elementColors[i % elementColors.length]
    ctx.fill()
    ctx.strokeStyle = '#1a1a2e'
    ctx.lineWidth = 2
    ctx.stroke()
    startAngle += slice
  })
 
  // donut hole
  ctx.beginPath()
  ctx.arc(cx, cy, 42, 0, 2 * Math.PI)
  ctx.fillStyle = '#16213e'
  ctx.fill()
}
 
onMounted(() => {
  if (props.characters && props.characters.length > 0) loadChartData()
})
 
watch(() => props.characters, (val) => {
  if (val && val.length > 0) loadChartData()
})
</script>
 
<style scoped>
.charts-wrapper {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin: 24px 0;
}
 
.chart-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px 24px;
  flex: 1;
  min-width: 280px;
  backdrop-filter: blur(8px);
}
 
.chart-title {
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c9a96e;
  margin: 0 0 16px 0;
}
 
.chart-area {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
 
canvas {
  flex-shrink: 0;
}
 
.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
 
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}
 
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
 
.legend-label {
  color: #c8c8e0;
  flex: 1;
}
 
.legend-count {
  color: #8888aa;
  font-size: 0.75rem;
  min-width: 20px;
  text-align: right;
}
 
/* Bar chart */
.bar-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
}
 
.bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
 
.bar-label {
  width: 70px;
  font-size: 0.78rem;
  color: #c8c8e0;
  text-align: right;
  flex-shrink: 0;
}
 
.bar-track {
  flex: 1;
  height: 18px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
}
 
.bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
 
.bar-count {
  width: 24px;
  font-size: 0.75rem;
  color: #8888aa;
  text-align: left;
  flex-shrink: 0;
}
</style>