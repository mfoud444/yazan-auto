<script setup lang="ts">
import { ref, computed } from 'vue';
import { NForm, NInput, NButton, FormInst, FormRules, NGrid, NFormItemGi, useMessage } from 'naive-ui'; // DownloadOutline for the icon
import { t } from '@/locales';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { baseURL } from '@/utils/request/axios';

const { isMobile } = useBasicLayout();
const span = computed(() => (isMobile ? 24 : 12));

interface Downloads {
  url: string
}

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const loading = ref(false);
const model = ref<Downloads>({ url: 'https://www.instagram.com/reel/DA1XYcIo-VM/?igsh=bThvbDhmanpremsw' });
const responseData = ref<Blob | null>(null);
const responseType = ref<string | null>(null);
const downloadUrl = ref<string | null>(null);

// Validation rules
const rules: FormRules = {
  url: [{ required: true, message: t('common.urlRequired'), trigger: ['input', 'blur'] }],
};

function validateInstagramUrl(url: string): boolean {
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%-]+\/?/;
  return instagramRegex.test(url);
}

async function handleDownloads() {
  try {
    loading.value = true;
    responseData.value = null;
    const sesssionId = "69643838740%3AayeYG0trP78jwc%3A15%3AAYc3ZiMZTaSFr7KrC-3H7oLyVlq5NmAREjwAjOrZ_w";
    const payload = {
      sessionid: sesssionId,
      url: model.value.url,
    };
    
    const response = await fetch(`${baseURL}/download/by_url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      body: new URLSearchParams(payload).toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    responseData.value = blob;
    responseType.value = blob.type;
    downloadUrl.value = URL.createObjectURL(blob);
    
    loading.value = false;
    message.success(t('common.downloadSuccess'));
  } catch (error: any) {
    loading.value = false;
    console.error(t('common.downloadFailed'), error.message);
    message.error(t('common.downloadFailed'));
  }
}

function isButtonDisabled() {
  return !model.value.url || !validateInstagramUrl(model.value.url) || loading.value;
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors && validateInstagramUrl(model.value.url)) {
      handleDownloads();
    } else {
      message.error(t('auth.fillAllField'));
    }
  });
}

function downloadFile() {
  if (downloadUrl.value) {
    const a = document.createElement('a');
    a.href = downloadUrl.value;
    a.download = 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
</script>

<template>
  <div class="border-none mx-12 shadow-none flex flex-col gap-2 p-2 rounded-lg">
    <div class="post-heading mb-1">
      <div class="gtext text-2xl font-bold underlined">{{ t('common.download') }}</div>
    </div>
    <NForm
      ref="formRef"
      :model="model"
      :rules="rules"
      size="large"
    >
      <div>
        <NGrid>
          <NFormItemGi :span="span" path="url" :label="t('common.url')">
            <NInput
              type="textarea"
              size="small"
              :autosize="{
                minRows: 2,
                maxRows: 4,
              }"
              v-model:value="model.url"
              :input-props="{ type: 'url' }"
              @keyup.enter="handleValidateButtonClick"
              :placeholder="t('common.url')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>
        </NGrid>
      </div>
      <div style="display: flex; justify-content: flex-end">
        <NButton
          type="primary"
          style="width:100%;"
          size="large"
          :loading="loading"
          :disabled="isButtonDisabled()"
          @click="handleValidateButtonClick"
        >
          {{ t('common.download') }}
        </NButton>
      </div>
    </NForm>
    
    <div v-if="responseData" class="mt-4 space-y-4">
      <div v-if="responseType?.startsWith('image')">
        <img 
          :src="downloadUrl" 
          alt="Downloaded Image"
          :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"
        />
      </div>
      <div v-else-if="responseType?.startsWith('video')">
        <video 
          controls
          :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }"
        >
          <source :src="downloadUrl" :type="responseType">
          Your browser does not support the video tag.
        </video>
      </div>
      <div v-else-if="responseType === 'application/zip'">
        <p>{{ t('common.zipFileReady') }}</p>
        <NButton type="primary" icon="DownloadOutline" @click="downloadFile">
          {{ t('common.downloadZip') }}
        </NButton>
      </div>
      <div v-else>
        <p>File downloaded successfully. Click the button below to save it.</p>
      </div>
      <NButton @click="downloadFile" class="mt-2">Save File</NButton>
    </div>
  </div>
</template>
