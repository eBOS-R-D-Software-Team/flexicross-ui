import React, { useRef } from 'react';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, ConfigProvider, Form, Tag } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined, DownCircleOutlined, CloseCircleOutlined, MinusCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { dummyData } from './dummyData';
import enUSIntl from 'antd/lib/locale/en_US';
import { setDashboardData } from '../../../redux/slices/riskDataSlice';
import { dataItem } from '../../../interfaces/riskData';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardData } from '../../../interfaces/dashboardData';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const formatDateToISO = (dateString: Date) => {
  // Parse the original date string
  const date = new Date(dateString);
  date.setMilliseconds(0);

  // Convert the date to ISO 8601 format
  const isoString = date.toISOString();

  return isoString;
};
// Define columns for ProTable
const columns: ProColumns<dataItem>[] = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   render: (dom: React.ReactNode) => {
  //     const text = dom as string;
  //     return text ? text.split('|').join(', ') : '';
  //   },

  // },
  {
    title: 'Date & Time',
    dataIndex: 'datetime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: false,
  },

  {
    disable: true,
    title: 'Type',
    dataIndex: 'riskType',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: 'All' },
      HumanTrafficking: {
        text: 'Human Trafficking',
        status: 'HumanTrafficking',
      },
      Contraband: {
        text: 'Contraband',
        status: 'Contraband',
        // disabled: true,
      },
      UTurnVehicle: {
        text: 'U Turn Vehicle',
        status: 'UTurnVehicle',
      },
      SuspiciousDrivingPattern: {
        text: 'Suspicious Driving Pattern',
        status: 'SuspiciousDrivingPattern',
      },
    },
  },

  {
    title: 'Severity',
    dataIndex: 'severity',
    filters: true,
    onFilter: true,
    ellipsis: true,    
    valueType: 'select',

    valueEnum: {
      all: { text: 'All' },
      NoSeverity: {
        text: 'NoSeverity',
        status: 'NoSeverity',
      },
      LowSeverity: {
        text: 'LowSeverity',
        status: 'LowSeverity',
      }, 
    },
    render: (dom:any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag icon={text === 'NoSeverity' ? <CloseCircleOutlined /> : text === 'LowSeverity' ? <DownCircleOutlined /> : text === 'MediumSeverity' ? <MinusCircleOutlined /> : text === 'HighSeverity' ? <UpCircleOutlined /> : <ExclamationCircleOutlined />} color={text === 'NoSeverity' ? 'green' : text === 'LowSeverity' ? 'blue' : text === 'MediumSeverity' ? 'yellow' : text === 'HighSeverity' ? 'red' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },
  {
    title: 'Probability',
    dataIndex: 'probability',
    filters: true,
    onFilter: true,
    ellipsis: true,    
    valueType: 'select',

    valueEnum: {
      all: { text: 'All' },
      Occasional: {
        text: 'Occasional',
        status: 'Occasional',
      },
      HighlyProbable: {
        text: 'HighlyProbable',
        status: 'HighlyProbable',
      }, 
    },
    render: (dom:any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag icon={text === 'NoSeverity' ? <CloseCircleOutlined /> : text === 'LowSeverity' ? <DownCircleOutlined /> : text === 'Occasional' ? <MinusCircleOutlined /> : text === 'HighlyProbable' ? <UpCircleOutlined /> : <ExclamationCircleOutlined />} color={text === 'NoSeverity' ? 'green' : text === 'LowSeverity' ? 'blue' : text === 'Occasional' ? 'yellow' : text === 'HighlyProbable' ? 'red' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },
];

const DataTableComponent: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<dataItem[]>(dummyData);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date>(new Date());
  const [filters, setFilters] = React.useState<string[]>([]);
  const [dashboard, setDashboard] = React.useState<DashboardData>({datetime:new Date(),data: [],filters: []});

  const onSearch = async (values: any) => {
    if (Object.keys(values).length != 2) {
      const filteredData = dataSource.filter(item => {
        if (values.type && item.type !== values.type) return false;
        if (values.id && !item.id.includes(values.id)) return false;
        if (values.datetime && formatDateToISO(new Date(item.datetime))!=formatDateToISO(values.datetime)) return false;

        if (values.riskType && !item.riskType.includes(values.riskType)) return false;
        if (values.severity && !item.severity.includes(values.severity)) return false;
        if (values.probability && !item.probability.includes(values.probability)) return false;
        return true;
      }); setDataSource(filteredData);
    } else {
      setDataSource(dummyData);
    }
  };

  const handleGenerateGraphs = () => {
    // Dispatch the query data to the store
    var dashboardtemp = dashboard;
    setDashboard({datetime:new Date(),data: dataSource,filters: []});
    dispatch(setDashboardData(dashboard));
    console.log('Query data dispatched:', dataSource);
    // navigate('/dashboard');  // Navigate to the dashboard

    // Navigate to the graphs page if needed
    // e.g., using react-router-dom to navigate
  };

  const actionRef = useRef<ActionType>();

  return (
    
        <ProTable
          columns={columns}
          dataSource={dataSource}
          headerTitle={true}
          // search={{}}
          // actionRef={actionRef}
          cardBordered
          rowKey="id"
          // editable={{
          //   type: 'multiple',
          // }}
          request={async (params, sort, filter) => {
            console.log(sort, filter, params, 'takis');
            await waitTime(2000);
            // if(params['datetime']){
            //   params['datetime'] = formatDateToISO(params['datetime']).toString()
            // }
            console.log(sort, filter, params, 'takis2');

            await onSearch(params)

            return dataSource;
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            defaultValue: {
              option: { fixed: 'right', disable: true },
            },
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          search={{
            labelWidth: 'auto',
          }}
          // options={false}
          options={{
            setting: {
              listsHeight: 400,
            },
          }} 
          pagination={{
            pageSize: 15,
          }}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={handleGenerateGraphs}
            >
              Generate Dashboard
            </Button>,
          ]}
        />

  );
};

export default DataTableComponent;
