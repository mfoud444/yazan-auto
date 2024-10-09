import { deleteDataFromTable, fetchDataFromTable, insertDataIntoTable, updateDataInTable } from '@/utils/supabasehelper';

import { defineStore } from 'pinia';

export function initState(): APIAI.Tasks {
  return {
  
    accountId: "",
    name: "",
    typeUpload:"URL",
    mediaType: "Video",
    description: "",
    isActivate: true,
    dateTimeUpload:new Date(),
    uploadTo: ["UploadAccount"],
    url:[],
    files:[],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

const tableName = 'tasks';

export const useTasksStore = defineStore('tasks-store', {
  state: () => ({
    list: [] as APIAI.Tasks[],
    modelInfo: initState(),
    loadingInit: false,
    showModelAdd: false,
    showModelUpdate: false,
    stateDashboard:'List',
    countTotalData: 0
  }),
  actions: {
    initState(): APIAI.Tasks {
      return initState();
    },

    async fetchDataAction({ limit, offset }: { limit: number; offset: number }): Promise<void> {
      try {
        const { data, totalCount } = await fetchDataFromTable<APIAI.Tasks>(tableName, limit, offset);
        this.list = data;
        this.countTotalData = totalCount;
      } catch (error: any) {
        console.error('Error fetching models:', error.message);
        throw error;
      }
    },

    async insertDataAction(newModel: APIAI.Tasks): Promise<void> {
      try {
        let insertedData = await insertDataIntoTable<APIAI.Tasks>(tableName, newModel);
        this.listModels = [insertedData, ...this.listModels];
        this.countTotalData += 1;
      } catch (error: any) {
        console.error('Error inserting model:', error.message);
        throw error;
      }
    },

    async deleteDataAction(id: string): Promise<void> {
      try {
        await deleteDataFromTable(tableName, id);
        this.listModels = this.listModels.filter(model => model.id !== id);
        this.countTotalData -= 1;
      } catch (error: any) {
        console.error('Error deleting model:', error.message);
        throw error;
      }
    },

    async updateDataAction(data: APIAI.Tasks): Promise<void> {
      try {
        await updateDataInTable<APIAI.Tasks>(tableName, data);
        this.listModels = this.listModels.map(model =>
          model.id === data.id ? { ...model, ...data } : model
        );
      } catch (error: any) {
        console.error('Error updating model:', error.message);
        throw error;
      }
    }
  }
});
