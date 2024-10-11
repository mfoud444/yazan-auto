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
  <div class="dark:bg-gray-950 dark:text-white flex pt-24  w-full   rounded-lg gap-22 relative">
    <!-- Vanta Container for visual effects -->
    <div ref="vantaContainer" class=" rounded-lg top-0 min-h-[50vh]  absolute w-full h-full z-0"></div>
    
    <!-- Content overlaid on the Vanta container -->
    <div class="flex flex-col  md:gap-8 z-50 -bottom-0 justify-end items-center relative">
      <!-- App Name with dynamic classes -->
      <div
        class="first-letter:font-bold   first-letter:font-serif font-bold gtexth first-letter:text-blue-700"
        :class="[isMobile ? 'first-letter:text-7xl text-5xl' : 'first-letter:text-9xl text-7xl']"
      >
        {{ t('common.nameApp') }}
      </div>
      
      <!-- Description -->
      <div class="font-bold g-text-hero  text-2xl md:text-5xl leading-relaxed text-justify">
        {{ t('app.descApp') }}
      </div>
      
          <!-- Hero Section -->
    <!-- <section class="bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange text-white py-20">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Automate Your Instagram Growth</h1>
            <p class="text-xl mb-8">Boost your followers, engagement, and sales with our powerful automation tools</p>
            <a href="#" class="bg-white text-instagram-pink font-bold py-2 px-4 rounded-full hover:bg-instagram-yellow hover:text-white transition duration-300">Get Started</a>
        </div>
    </section> -->
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

