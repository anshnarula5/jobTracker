export interface Application {
    id?: number;
    jobId : string;
    companyName : string;
    jobLink : string;
    referralRequested?: boolean;
    referred?: boolean;
    applied?: boolean;
    referralRequestDate?: Date;
    referredDate?: Date;
    appliedDate?: Date;
  }