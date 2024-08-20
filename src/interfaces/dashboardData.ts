import { dataItem } from "./riskData";

export interface DashboardData{
    datetime: Date;
    filters: string[];

    data: dataItem[];
}