<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { NForm, NInput, NButton,NUpload, NDatePicker, FormInst, FormRules, NSwitch, NGrid, NFormItemGi, NSelect, NInputNumber, UploadCustomRequestOptions, useMessage } from 'naive-ui';
import { t } from '@/locales';
import { useTasksStore, useCompanyStore } from '@/store';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { getImageUrl } from '@/utils/supabasehelper';
import { get, post, put } from '@/utils/request'
import { supabase } from '@/utils/supabase';
const { isMobile } = useBasicLayout();
const span = computed(() => (isMobile ? 24 : 24));
const store = useTasksStore();
const companyStore = useCompanyStore();
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const loading = ref(false);
const model = ref<APIAI.Tasks>(store.initState());
const rules: FormRules = {
  // name: [{ required: true, message: t('common.nameRequired'), trigger: ['input', 'blur'] }],
};


const dataOptionsUploaded = [
  { label: t('common.UploadStore'), value: 'UploadStore' },
  { label: t('common.UploadAccount'), value: 'UploadAccount' },
];



const mediaType =[
      { label: t('common.image'), value: 'Image' },
      { label: t('common.video'), value: 'Video' },
      { label: t('common.elmob'), value: 'Elmob' },
    ];

const typeUpload = [
{ label: t('common.URL'), value: 'URL' },
 
  { label: t('common.media'), value: 'Media' },

];
// // Options for select fields
const dataOptions = [
  { label: t('common.text'), value: 'UploadStore' },
  { label: t('common.image'), value: 'Image' },
  { label: t('common.audio'), value: 'Audio' },
  { label: t('common.video'), value: 'Video' },
  { label: t('common.documents'), value: 'Documents' }
];

const accepts = computed(() => (model.value.mediaType.value === 'Image' ? 'image/*' : 'video/*'));


const companies = ref<any[]>([]);

async function fetchData(): Promise<void> {
  try {
    await companyStore.fetchDataAction({ limit: 1000, offset: 0 });

    companyStore.list = await Promise.all(companyStore.listCompanies.map(async (company) => {
      if (company.logoUrl) {
        try {
          company.logoUrl = await getImageUrl(companyStore.bucket, company.logoUrl);
        } catch (error) {
          console.error(`Failed to fetch image for company ${company.name}:`, error);
        }
      }
      return { ...company };
    }));

    companies.value = companyStore.listCompanies.map(company => ({
      label: company.name,
      value: company.id,
      logoUrl: company.logoUrl // Optionally include the logo URL for display
    }));
    model.value.accountId = companies.value[0].value
  } catch (error: any) {
    console.error(t('chat.dataFetchError'), error.message);
  }
}

onMounted(fetchData);

async function handleAddData() {
  try {
    loading.value = true;
    console.log(model.value.url)
    await store.insertDataAction(model.value);
    const sesssionId = companyStore.listCompanies.find(company => company.id === model.value.accountId)?.sessionKey
    console.log("sesssionId", sesssionId)
    const payload = {
      sessionid: sesssionId,
        url:model.value.url,
        // caption:model.value.description
      };
    const response = await post<any>({
        url: '/photo/upload_to_story/by_url',
        data: payload,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log("response", response)
    loading.value = false;
    store.showModelAdd = false;
    message.success(t('common.addSuccess'));
  } catch (error: any) {
    loading.value = false;
    console.error(t('common.addFailed'), error.message);
    message.error(t('common.addFailed'));
  }
}

function isButtonDisabled() {
  return  loading.value;
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      handleAddData();
    } else {
      message.error(t('auth.fillAllField'));
    }
  });
}

const customRequest = async ({ file, data: dataParams, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
    try {
      if (!dataParams) {
        throw new Error('dataParams is undefined');
      }

      const progressEvent = { loaded: 20, total: 100 };
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress({ percent: percentCompleted });

      const { data, error } = await supabase.storage.from(dataParams.bucket).upload(`${file.name}`, file.file!, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        if (error.statusCode === "409" && error.error === "Duplicate") {
          model.value.logoUrl = file.name;
          onFinish()
        } else {
          throw error;
        }
      }

      if (data) {
        model.value.logoUrl = data.path;
        onFinish();
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
      onError();
    }
  };
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
        <NGrid :span="span" :x-gap="24">

          
          <NFormItemGi :span="span" path="accountId" :label="t('common.selectAccount')">
            <NSelect
              v-model:value="model.accountId"
              :options="companies"
              :placeholder="t('common.selectAccount')"
              clearable
            />
          </NFormItemGi>


          <NFormItemGi :span="span" path="name" :label="t('common.name')">
            <NInput
              v-model:value="model.name"
              @keyup.enter="handleValidateButtonClick"
              :placeholder="t('common.name')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>
          

          <NFormItemGi :span="span" path="uploadTo" :label="t('common.uploadTo')">
            <NSelect
              v-model:value="model.uploadTo"
              :options="dataOptionsUploaded"
              multiple
              :placeholder="t('common.uploadTo')"
              clearable
            />
          </NFormItemGi>

               
          <NFormItemGi :span="span" path="mediaType" :label="t('common.mediaType')">
            <NSelect
              v-model:value="model.mediaType"
              :options="mediaType"
              :placeholder="t('common.mediaType')"
              clearable
            />
          </NFormItemGi>


          <NFormItemGi :span="span" path="typeUpload" :label="t('common.typeUpload')">
            <NSelect
              v-model:value="model.typeUpload"
              :options="typeUpload"
              :placeholder="t('common.typeUpload')"
              clearable
            />
          </NFormItemGi>

          <NFormItemGi v-if="model.typeUpload === 'URL'" :span="span" path="url" :label="t('common.URL')">
            <NInput
              v-model:value="model.url[0]"
                :input-props="{ type: 'url' }"
              @keyup.enter="handleValidateButtonClick"
              :placeholder="t('common.URL')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>
   

     

          <NFormItemGi
           v-if="model.typeUpload === 'Media'"
            :span="span"
            path="files"
            :label="t('common.files')"
          >
            <NUpload
              :accept="accepts"
              list-type="image-card"
              :max="1"
              :data="{ 'bucket': 'tasks' }"
              path="files"
              :custom-request="customRequest"
            />
          </NFormItemGi>


          <NFormItemGi :span="span" path="dateTime" :label="t('common.dateTime')">
            <NDatePicker v-model:value="model.dateTimeUpload" type="datetime" clearable />
          </NFormItemGi>


          <NFormItemGi :span="span" path="description" :label="t('common.description')">
            <NInput
            type="textaria"
              v-model:value="model.description"
              @keyup.enter="handleValidateButtonClick"
              :placeholder="t('common.description')"
              clearable
              @keydown.enter.prevent
            />
          </NFormItemGi>
  

   
  
          <NFormItemGi :span="span" path="isActivate" :label="t('common.isActivate')">
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
          @click="handleValidateButtonClick"
        >
          {{ t('common.addNew') }}
        </NButton>
      </div>
    </NForm>
  </div>
</template>
