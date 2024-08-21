import { dataItem } from "./riskData";

export interface DashboardData{
    datetime: any;
    filters: any;
    id:any;
    data: dataItem[];
}
export interface BarGraph {
    labelName: string;
    value: number;
  }