<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NCard v-for="company in companies" :key="company.id" class="flex flex-col bg-gradient-to-b from-blue-100 via-orange-100 to-orange-100">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <NAvatar :src="company.logoUrl" :fallback-src="getDefaultAvatarSrc()" round size="large" />
              <div class="flex flex-col">
                <NText strong>{{ company.name }}</NText>
                <NText depth="3">@{{ company.username }}</NText>
              </div>
            </div>
   
          </div>
        </template>
        <NSpace vertical>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex items-center gap-2">
              <NTag :type="company.isActivate ? 'success' : 'warning'">
                {{ company.isActivate ? 'Active' : 'Inactive' }}
              </NTag>
            </div>
            <div class="flex items-center gap-2">
              <SvgIcon :icon="company.isLogin ? 'mdi:check-circle' : 'mdi:close-circle'" :class="company.isLogin ? 'text-success' : 'text-error'" />
              <span>{{ company.isLogin ? 'Logged In' : 'Not Logged In' }}</span>
            </div>
          </div>
          <div>
            <NText strong>Session ID:</NText> {{ truncateSessionId(company.sessionId) }}
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <NText strong>Created:</NText>
              <div>{{ formatDate(company.createdAt) }}</div>
            </div>
            <div>
              <NText strong>Updated:</NText>
              <div>{{ formatDate(company.updatedAt) }}</div>
            </div>
          </div>

          <div class="flex gap-2">
              <NButton tertiary circle @click="handleEdit(company)" >
                <SvgIcon icon="fluent:edit-32-regular" class="text-lg text-blue-500 hover:text-blue-700" />
              </NButton>
              <NButton tertiary circle @click="handleDelete(company)" >
                <SvgIcon icon="fluent:delete-32-regular" class="text-lg text-red-500 hover:text-red-700" />
              </NButton>
              <NButton tertiary circle @click="handleRelogin(company)" >
                <SvgIcon icon="mdi:login" class="text-lg text-green-500 hover:text-green-700" />
              </NButton>
            </div>
        </NSpace>
      </NCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import { NCard, NAvatar, NSpace, NText, NTag, NButton } from 'naive-ui'
  import { computed } from 'vue'
  import { getImageUrl } from '@/utils/supabasehelper'
  import { SvgIcon } from '@/components/common';
  
  const props = defineProps<{
    companies: APIAI.AccountsInstagram[]
  }>()
  
  const emit = defineEmits<{
    (e: 'edit', company: APIAI.AccountsInstagram): void
    (e: 'delete', company: APIAI.AccountsInstagram): void
    (e: 'relogin', company: APIAI.AccountsInstagram): void
  }>()
  
  const getDefaultAvatarSrc = () => {
    return 'path/to/default/avatar.png' // Replace with your default avatar path
  }
  
  const truncateSessionId = (sessionId: string) => {
    return sessionId.substring(0, 8) + '...'
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }
  
  const handleEdit = (company: APIAI.AccountsInstagram) => {
    emit('edit', company)
  }
  
  const handleDelete = (company: APIAI.AccountsInstagram) => {
    emit('delete', company)
  }
  
  const handleRelogin = (company: APIAI.AccountsInstagram) => {
    emit('relogin', company)
  }
  </script>
  
  <style scoped>
  .text-success {
    color: #18a058;
  }
  
  .text-error {
    color: #d03050;
  }
  </style>