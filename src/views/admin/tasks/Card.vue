<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue'
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { NTooltip, NAvatar, NBadge, NEllipsis, NSpin, NCard, NTag, NButton } from 'naive-ui'
import { t } from '@/locales';
import { SvgIcon } from '@/components/common';
import { useTasksStore } from '@/store';
import { getImageUrl } from '@/utils/supabasehelper';

interface Props {
    id: string
}

const props = defineProps<Props>()
const store = useTasksStore();
const row = ref<APIAI.CompanyAI | null>(null);
const loading = ref<boolean>(false);

async function fetchData(): Promise<void> {
  loading.value = true;
  try {
    await store.fetchDataAction({ limit: 1000, offset: 0 });
    store.list = await Promise.all(store.list.map(async (item) => {
      if (item.logoUrl) {
        try {
          item.logoUrl = await getImageUrl(store.bucket, item.logoUrl);
        } catch (error) {
          console.error(`Failed to fetch image for company ${item.name}:`, error);
        }
      }
      return { ...item };
    }));
  } catch (error: any) {
    console.error(t('chat.dataFetchError'), error.message);
  } finally {
    loading.value = false;
  }
}

async function initializeData() {
  // Check if the company already exists in the list
  let foundItem = store.list.find(item => item.id === props.id);

  // If not found, fetch the data
  if (!foundItem) {
    await fetchData();
    foundItem = store.list.find(item => item.id === props.id);
  }

  // Set the row data
  if (foundItem) {
    row.value = foundItem;
  } else {
    console.error(`Company with ID ${props.companyId} not found`);
  }
}

onMounted(initializeData);

const badgeType = computed(() => row.value?.isActivate ? 'success' : 'error');
const { isMobile } = useBasicLayout();





const openLink = () => {
  window.open(props.link, '_blank', 'noopener,noreferrer')
}
</script>

<template>
 







    <NSpin v-if="loading" size="small" />


  <div v-else-if="row" class="flex gap-4 item-center">
    <div class="w-96 bg-gradient-to-b from-blue-100 via-orange-100 to-orange-200 mx-auto overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
  <!-- Cover Section -->
  <div class="h-48 overflow-hidden">
    <!-- Video -->
    <video v-if="video" controls class="w-full h-full object-cover">
      <source src="" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <!-- Image as fallback -->
    <img v-else src="" alt="Item Name" class="w-full h-full object-cover">
  </div>

  <!-- Header Section -->
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{{ row.name }}</h2>

    <!-- Date and Time Section -->
    <div class="flex items-center text-sm text-gray-500 space-x-3 mb-2">
      <span>January 1, 2024</span>
      <span>12:00 PM</span>
    </div>

    <!-- Tag Section -->
    <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c.667 0 1 .333 1 1v2c0 .667-.333 1-1 1s-1-.333-1-1V9c0-.667.333-1 1-1zM12 16v.01"></path>
      </svg>
      Tag Name
    </span>
  </div>

  <!-- Footer Section -->
  <div class="p-4">
    <button type="button" class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
      Visit Link
    </button>
  </div>
</div>

    <!-- <NBadge
      dot
      :processing=false
      :type='badgeType'
    >
      <NAvatar
        round
        size="medium"
        :src="row.logoUrl"
      />
    </NBadge>

    <div class="flex flex-col">
      <div class="font-bold text-base">
        <NEllipsis :line-clamp="1">
          {{ row.name }} 
          <template #tooltip>
            <div class="w-36">
              {{ row.name }} 
            </div>
          </template>
        </NEllipsis>
      </div>
    </div> -->
  </div>

  <div v-else>
    <p>{{ t('common.companyNotFound') }}</p>
  </div>
</template>

