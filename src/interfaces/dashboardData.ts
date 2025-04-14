import { dataItem } from "./riskData";

export interface DashboardData{
    datetime: any;
    filters: any;
    id:any;
    data: any[];
}
export interface BarGraph {
    labelName: string;
    value: number;
  }