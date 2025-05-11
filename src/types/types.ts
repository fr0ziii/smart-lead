export interface Prospect {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  companySize: string;
  contactName: string;
  contactPosition: string;
}

export interface SearchCriteria {
  industry: string;
  companySize: string;
  contactPosition: string;
}
