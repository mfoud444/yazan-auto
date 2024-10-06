<script lang="ts" setup>
import { t } from '@/locales'
import { useRouter } from 'vue-router'
import { useLoadingBar, NButton } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import hero from '@/assets/hero.svg'
import { ref, onMounted, onBeforeUnmount, Ref, UnwrapRef } from 'vue';
import P5 from 'p5';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import CELLS from 'vanta/dist/vanta.cells.min';
const router = useRouter()
async function goService() {
  handleStart()
  await router.push('/admin')
  handleFinish()
}

const { isMobile } = useBasicLayout()
const loadingBar = useLoadingBar()
const disabledRef = ref(true)
function handleStart() {
  loadingBar.start()
  disabledRef.value = false
}
function handleFinish() {
  loadingBar.finish()
  disabledRef.value = true
}

const vantaContainer = ref<HTMLElement | null>(null); // Define vantaContainer as ref

const vantaEffect = ref<null | { destroy: () => void }>(null);

onMounted(() => {
//   vantaEffect.value = CELLS({
//     el: vantaContainer.value,
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   Color: 0x257a0c,
//   minHeight: 200.00,
//   minWidth: 200.00,
//   scale: 1.00,
//   THREE: THREE
// })
  vantaEffect.value =  HALO({
    el: vantaContainer.value,
    mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  // backgroundColor: 0x1020f,
  // baseColor: 0x1020f,
  backgroundAlpha: 0.97,
  color: 0x257a0c,
  xOffset: 0.10,
  yOffset: 0.21,
  THREE: THREE
})
  // vantaEffect.value = NET({
  //   el: vantaContainer.value,



  //   scale: 1.00,
  //   scaleMobile: 1.00,
  //   color: 0x257a0c,
  //   // backgroundColor: 0x23153c,
  //   points: 16.00,
  //   THREE: THREE
  // });
});

onBeforeUnmount(() => {
  // Cleanup when the component is destroyed
  if (vantaEffect.value) {
    vantaEffect.value.destroy();
  }
});
</script>

<template>
  <div class="dark:bg-gray-950 dark:text-white flex py-24  w-full overflow-hidden h-[550px] rounded-lg gap-22 relative">
    <!-- Vanta Container for visual effects -->
    <div ref="vantaContainer" class="min-h-[85vh] top-0 absolute w-full h-full z-0"></div>
    
    <!-- Content overlaid on the Vanta container -->
    <div class="flex flex-col justify-between z-20 relative">
      <!-- App Name with dynamic classes -->
      <div
        class="first-letter:font-bold first-letter:text-blue-700 first-letter:font-serif font-bold gtext"
        :class="[isMobile ? 'first-letter:text-7xl text-5xl' : 'first-letter:text-9xl text-7xl']"
      >
        {{ t('common.nameApp') }}
      </div>
      
      <!-- Description -->
      <div class="font-bold g-text-hero text-white text-2xl md:text-5xl leading-relaxed text-justify">
        {{ t('app.descApp') }}
      </div>
      
      <!-- Button -->
      <button
        class="btn btn-primary font-bold text-2xl w-56"
        @click="goService"
      >
        {{ t('app.start') }}
      </button>
    </div>
  </div>
</template>

