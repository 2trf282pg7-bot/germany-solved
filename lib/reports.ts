export interface Report {
  id: string;
  caseId: string;
  office: string;
  city: string;
  date: string;
  visaType: string;
  outcome: 'approved' | 'rejected' | 'pending' | 'rescheduled';
  waitDays: number;
  month: string;
}
