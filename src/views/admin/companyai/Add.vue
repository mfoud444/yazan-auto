<!-- src/views/Add.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NInput, NButton, NUpload, NSwitch, NGrid, NFormItemGi, useMessage } from 'naive-ui';
import { t } from '@/locales';
import { useCompanyStore } from '@/store';
import { useCompanyForm } from './useCompanyForm';

const companyStore = useCompanyStore();
const model = ref<APIAI.AccountsInstagram>(companyStore.initState());
const { span, formRef, loading, rules, customRequest, isButtonDisabled, handleValidateButtonClick } = useCompanyForm(model);
const message = useMessage();
async function handleAddData() {
  try {
    loading.value = true;
    await companyStore.insertDataAction(model.value);
    loading.value = false;
    companyStore.showModelAdd = false;
    message.success(t('common.addSuccess'));
  } catch (error: any) {
    loading.value = false;
    console.error(t('common.addFailed'), error.message);
    message.error(t('common.addFailed'), error.message);
  }
}

</script>

<template>
  <div class="border-none shadow-none flex flex-col gap-2 p-2 rounded-lg">
    <div class="post-heading mb-1">
      <div class="gtext text-2xl font-bold underlined">{{ t('common.addNew') }}</div>
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
              :data="{ 'bucket': 'accounts_instagram' }"
              path="logoUrl"
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
              @keyup.enter="handleValidateButtonClick($event, handleAddData)"
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
              @keyup.enter="handleValidateButtonClick($event, handleAddData)"
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
              @keyup.enter="handleValidateButtonClick($event, handleAddData)"
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
          :disabled="isButtonDisabled()"
          @click="handleValidateButtonClick($event, handleAddData)"
        >
          {{ t('common.addNew') }}
        </NButton>
      </div>
    </NForm>
  </div>
</template>
