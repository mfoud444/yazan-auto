import { deleteDataFromTable, fetchDataFromTable, getImageUrl, insertDataIntoTable, updateDataInTable } from '@/utils/supabasehelper';
import { defineStore } from 'pinia';

import { useUserStore} from '@/store'

export function initState(): APIAI.AccountsInstagram {
  const userStore = useUserStore()
  const user_id = userStore.userInfo.user?.id
  return {
    name: '',
    sessionId: '',
    logoUrl: '',
    username: '',
    isLogin:false,
    user_id:user_id!,
    isActivate: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
const tableName = 'instagram_account';

export const useCompanyStore = defineStore('company-store', {
  state: () => ({
    listCompanies: [] as APIAI.AccountsInstagram[],
    companyInfo: initState(),
    loadingInit: false,
    showModelAdd: false,
    showModelUpdate: false,
    countTotalData: 0,
    bucket: 'company'
  }),
  actions: {
    initState(): APIAI.AccountsInstagram {
      return initState()
    },
    async fetchDataAction({ limit, offset }: { limit: number; offset: number }): Promise<void> {
      try {
        const userStore = useUserStore()
        const user_id = userStore.userInfo.user?.id
        console.log(user_id)
       const filters = {user_id:user_id}
        const { data, totalCount } = await fetchDataFromTable<APIAI.AccountsInstagram>(tableName, limit, offset, filters);
        this.listCompanies = data;
        this.countTotalData = totalCount; 
      } catch (error: any) {
        console.error('Error fetching companies:', error.message);
        throw error;
      }
    },

    async insertDataAction(newCompany: APIAI.AccountsInstagram): Promise<void> {
      try {
        let insertedData = await insertDataIntoTable<APIAI.AccountsInstagram>(tableName, newCompany);
        if (insertedData.logoUrl) {
          insertedData.logoUrl = await getImageUrl(this.bucket, insertedData.logoUrl);
        }
        this.listCompanies = [insertedData, ...this.listCompanies];
        this.countTotalData += 1;
      } catch (error: any) {
        throw error;
      }
    },

    async deleteDataAction(id: string): Promise<void> {
      try {
        await deleteDataFromTable(tableName, id);
        this.listCompanies = this.listCompanies.filter(company => company.id !== id);
        this.countTotalData -= 1;
      } catch (error: any) {
        throw error;
      }
    },

    async updateDataAction(data: APIAI.AccountsInstagram): Promise<void> {
      try {
        await updateDataInTable<APIAI.AccountsInstagram>(tableName, data);
        if (data.logoUrl) {
          data.logoUrl = await getImageUrl(this.bucket, data.logoUrl);
        }
        this.listCompanies = this.listCompanies.map(company =>
          company.id === data.id ? { ...company, ...data } : company
        );
      } catch (error: any) {
        throw error;
      }
    }
  }
});
