declare namespace APIAI {
 type stateDashboard = 'Add' | 'Edit' | 'List'
    type UploadedTo = 'UploadStory' | 'UploadAccount' 
    type MediaType = 'Image' | 'Video' | 'Elbom'
    type TypeUpload = 'URL' | 'Media'
    interface AccountsInstagram {
      id?: string; 
      name: string;
      user_id:string
      username: string;
      sessionId: string; 
      logoUrl?: string; 
      isLogin:boolean
      isActivate: boolean;
      createdAt: string; 
      updatedAt: string; 
    }

    interface Tasks {
      id?: string; 
      accountId: string; 
      name: string;
      typeUpload:TypeUpload
      mediaType: MediaType;
      description?: string; 
      isActivate: boolean;
      dateTimeUpload:DateTime;
      createdAt: string; 
      updatedAt: string; 
      uploadTo: UploadedTo[];
      url?:string[]
      files:strings[]
    }
  
    interface ModelAI {
      id?: string; // UUID
      companyId: string; // UUID referencing CompanyAI
      name: string;
      modelCode: string;
      description?: string; // Optional
      isActivate: boolean;
      version?: string; // Optional
      createdAt: string; // Timestamp
      updatedAt: string; // Timestamp

          // New fields
          inputData?: UploadedTo[];
          outputData?: UploadedTo[];
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
    repetitionPenalty?: number;
    stop?: string[];
    stream?: boolean;
    }
  
 
    interface Dashboard {
      clientCount: number;
      expertCount: number;
      adminCount: number;
      aiCompanyCount: number;
      aiModelCount: number;
      questionCount: number;
    }
  }
  