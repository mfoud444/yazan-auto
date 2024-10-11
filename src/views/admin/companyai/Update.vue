<!-- src/views/Update.vue -->
<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { NForm, NInput, NButton, NUpload, NSwitch, NGrid, NFormItemGi, UploadFileInfo, useMessage } from 'naive-ui';
import { t } from '@/locales';
import { useCompanyStore } from '@/store';
import { useCompanyForm } from './useCompanyForm';

const props = defineProps<{ item: APIAI.AccountsInstagram }>();
const companyStore = useCompanyStore();
const model = ref<APIAI.AccountsInstagram>({ ...props.item });
const originalModel = ref<APIAI.AccountsInstagram>({ ...props.item });
const message = useMessage();
const { span, formRef, loading, rules, customRequest, isButtonDisabled, handleValidateButtonClick } = useCompanyForm(model);

const previewFileList = ref<UploadFileInfo[]>([
  {
    id: '',
    name: model.value.logoUrl ?? '',
    status: 'finished',
    url: model.value.logoUrl
  },
]);

const isButtonDisabledComputed = computed(() => {
  return loading.value || !model.value.name || !model.value.username || JSON.stringify(model.value) === JSON.stringify(originalModel.value);
});

async function handleUpdateData() {
  try {
    loading.value = true;
    if (model.value.logoUrl === originalModel.value.logoUrl) {
      delete model.value.logoUrl;
    }
    await companyStore.updateDataAction(model.value);
    loading.value = false;
    companyStore.showModelUpdate = false;
    message.success(t('common.updateSuccess'));
  } catch (error: any) {
    loading.value = false;
    console.error(t('common.updateFailed'), error.message);
    message.error(t('common.updateFailed'), error.message);
  }
}
</script>
<template>
  <div class="border-none shadow-none flex flex-col gap-2 p-2 rounded-lg">
    <div class="post-heading mb-1">
      <div class="gtext text-2xl font-bold underlined">{{ t('common.update') }}</div>
    </div>
    <NForm
      ref="formRef"
      :model="model"
      :rules="rules"
      size="large"
    >
      <div>
        <NGrid
    
        >
          <NFormItemGi
            :span="span"
            path="logoUrl"
            :label="t('common.logoUrl')"
          >
            <NUpload
              accept="image/*"
              list-type="image-card"
              :max="1"
              path="logoUrl"
              :data="{ 'bucket': 'accounts_instagram' }"
              :default-file-list="model.logoUrl ? previewFileList : []"
              :custom-request="customRequest"
            />
          </NFormItemGi>
          <NFormItemGi
            :span="span"
            path="name"
            :label="t('common.name')"
          >
            <NInput
              v-model:value="model.name"
              @keyup.enter="handleValidateButtonClick($event, handleUpdateData)"
              :placeholder="t('common.name')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>

          <!-- Username -->
          <NFormItemGi
            :span="span"
            path="username"
            :label="t('common.username')"
          >
            <NInput
              v-model:value="model.username"
              @keyup.enter="handleValidateButtonClick($event, handleUpdateData)"
              :placeholder="t('common.username')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>

          <!-- Session ID -->
          <NFormItemGi
            :span="span"
            path="sessionId"
            :label="t('common.sessionId')"
          >
            <NInput
              v-model:value="model.sessionId"
              @keyup.enter="handleValidateButtonClick($event, handleUpdateData)"
              :placeholder="t('common.sessionId')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>

        

          <NFormItemGi
            :span="span"
            path="isActivate"
            :label="t('common.isActivate')"
          >
            <NSwitch
              v-model:value="model.isActivate"
              size="large"
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
          :disabled="isButtonDisabledComputed"
          @click="handleValidateButtonClick($event, handleUpdateData)"
        >
          {{ t('common.update') }}
        </NButton>
      </div>
    </NForm>
  </div>
</template>