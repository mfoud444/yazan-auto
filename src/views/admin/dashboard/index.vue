<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NCard, NGrid, NGridItem, NNumberAnimation, NSkeleton } from 'naive-ui'
import { useDashboardStore } from '@/store'
import { SvgIcon } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { t } from '@/locales';
import { post, get } from '@/utils/request'
const dashboardStore = useDashboardStore()
const isLoading = ref(true)
const { isMobile } = useBasicLayout()
import {  fetchDataFromTable } from '@/utils/supabasehelper';
const sessionId = ref("")
onMounted(async () => {
  const filters = { user_id: '1f8191ba-64ce-4617-b40a-f11dc1f231d8' };
  const { data, totalCount } = await fetchDataFromTable("instagram_account", 1000, 0, filters);
  console.log("data", data)
  sessionId.value = data[0].sessionKey
  console.log("sessionId.value", sessionId.value)
  const payload = {
        sessionid: sessionId.value,
        username: "mfoud555"
      };
      
      // Make a POST request
      // const response = await post<any>({
      //   url: '/user/info_by_username',
      //   data: payload,
      //   headers: {
      //     'accept': 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // });
      // console.log("response", response);
// } catch (error: any) {
//     console.error('Error fetching data from ', error.message);
//     throw error;
//   }

  // await dashboardStore.fetchDashboardData()
  isLoading.value = false
})

const cardItems = [
  { title: t('common.Clients'), count: () => dashboardStore.clientCount, icon: 'mdi:account-group' },
  { title: t('common.AgriExperts'), count: () => dashboardStore.expertCount, icon: 'mdi:account-tie' },
  { title: t('common.Admins'), count: () => dashboardStore.adminCount, icon: 'mdi:account-cog' },
  { title: t('common.AICompanies'), count: () => dashboardStore.aiCompanyCount, icon: 'mdi:domain' },
  { title: t('common.AIModels'), count: () => dashboardStore.aiModelCount, icon: 'mdi:robot' },
  { title: t('common.Questions'), count: () => dashboardStore.questionCount, icon: 'mdi:help-circle' },
  { title: t('common.convAI'), count: () => dashboardStore.convAICount, icon: 'hugeicons:ai-chat-02' }, 
  { title: t('common.convExperts'), count: () => dashboardStore.convExpertCount, icon: 'mdi:chat-processing' }, 
];
</script>

<template>
  <div class="p-4 mx-4 ">
    <h1 class="text-2xl font-bold mb-4 gtext">{{ t('common.Dashboard') }}</h1>
    <NGrid :x-gap="12" :y-gap="12" :cols="isMobile ? 1 : 2">
      <NGridItem v-for="item in cardItems" :key="item.title">
        <NCard>
          <div class="flex  items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold mb-2 gtext">{{ item.title }}</h3>
              <NSkeleton v-if="isLoading" text :repeat="1" :width="60" />
              <div v-else class=" font-bold text-4xl gtext">{{ item.count() }}</div>
              <!-- <NNumberAnimation
           style="font-weight: bold; font-size: 2rem;"
                v-else
                :from="0"
                :to="item.count()"
                :duration="3000"
              /> -->
            </div>
            <NSkeleton v-if="isLoading" circle :width="48" :height="48" />
            <SvgIcon :icon="item.icon" :width="38" :height="38" style=" color: blue;"/>
        
          </div>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>