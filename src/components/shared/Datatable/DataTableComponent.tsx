import React, { useEffect, useRef } from 'react';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Form, Tag } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined, DownCircleOutlined, CloseCircleOutlined, MinusCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { fetchRisksFromAPI, setDashboardData } from '../../../redux/slices/riskDataSlice';
import { dataItem } from '../../../interfaces/riskData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardData } from '../../../interfaces/dashboardData';
import { v4 as uuid } from 'uuid';
import { setAnomalyData, setFilteredAnomalyData } from '../../../redux/slices/anomalySlice';
import { setDetectionData, setFilteredDetectionData } from '../../../redux/slices/detectionSlice';
import { AppDispatch, RootState } from '../../../redux/store';


  
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

export interface TableProps{
  data: any[],
  flag: string,
  fullscreen: boolean,
  onRowClick?: (record: any) => void; // Add this prop for row click handling
  onActionClick?: (record: any) => void; // Add this prop for action button handling

}
const DataTableComponent: React.FC<TableProps> = ({ data, flag, fullscreen, onRowClick, onActionClick }) => {
  const [dataSource, setDataSource] = React.useState<any[]>(data);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({});
  const [dashboard, setDashboard] = React.useState<DashboardData>({ id: '', datetime: new Date(), data: [], filters: [] });
  const navigate = useNavigate();
  const [selectedAnomalyData, setSelectedAnomalyData] = React.useState<any[]>();
  const [selectedDetectionData, setSelectedDetectionData] = React.useState<any[]>();

  const initialData = data;
  console.log("reset data mel loul ", data ," w initial data ", initialData);
// const dispatch:AppDispatch = useDispatch();
// useEffect(() => {
//     dispatch(fetchRisksFromAPI());

//   }, [dispatch]);
//   const dashboardData = useSelector((state: RootState) => state.dashboardData.dashboardData);

// if (flag==='risk') {
//   data = dashboardData;
// }

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
    title: 'Risk Type',
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
    render: (dom: any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag color={text === 'HumanTrafficking' ? '#000000' : text === 'Contraband' ? '#8c8c8c' : text === 'UTurnVehicle' ? '#262626' : text === 'SuspiciousDrivingPattern' ? '#a8071a' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },

  {
    title: 'Severity',
    dataIndex: 'severity',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    hideInSearch: false,

    valueEnum: {
      all: { text: 'All' },
      NoSeverity: {
        text: 'No Severity',
        status: 'NoSeverity',
      },
      LowSeverity: {
        text: 'Low Severity',
        status: 'LowSeverity',
      }, 
      MediumSeverity: {
        text: 'Medium Severity',
        status: 'MediumSeverity',
      },
      HighSeverity: {
        text: 'High Severity',
        status: 'HighSeverity',
      }, 
      PotentialOBUMisoperation: {
        text: 'Potential OBU Misoperation',
        status: 'PotentialOBUMisoperation',
      },
    },
    render: (dom: any) => {
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
      AlmostImprobable: {
        text: 'Almost Improbable',
        status: 'AlmostImprobable',
      },
      Rare: {
        text: 'Rare',
        status: 'Rare',
      },

      Frequent: {
        text: 'Frequent',
        status: 'Frequent',
      },      Occasional: {
        text: 'Occasional',
        status: 'Occasional',
      },
      HighlyProbable: {
        text: 'Highly Probable',
        status: 'HighlyProbable',
      },     
    },
    render: (dom: any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag icon={text === 'AlmostImprobable' ? <CloseCircleOutlined /> : text === 'Rare' ? <DownCircleOutlined /> : text === 'Occasional' ? <MinusCircleOutlined /> : text === 'HighlyProbable' ? <UpCircleOutlined /> : <ExclamationCircleOutlined />} color={text === 'AlmostImprobable' ? 'green' : text === 'Rare' ? 'blue' : text === 'Occasional' ? 'yellow' : text === 'HighlyProbable' ? 'red' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },{
    title: 'Involved Objects',
    key: 'action',
    render: (text: any, record: any) => (
              <Button onClick={() => navigate(`/involved-objects/${flag}/${record.id}`)}>View Details</Button>

    ),
  },
];
const columnsAnomaly: ProColumns<any>[] = [
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
    title: 'Anomaly Type',
    dataIndex: 'anomalyType',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
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
      UnusualBehaviourOutOfBounds: {
        text: 'Unusual Behaviour Out Of Bounds',
        status: 'UnusualBehaviourOutOfBounds',
      },
      UnusualBehaviourRunning: {
        text: 'Unusual Behaviour Running',
        status: 'UnusualBehaviourRunning',
      },
      PersonMisVerified: {
        text: 'Person Mis Verified',
        status: 'PersonMisVerified',
      },
      PersonOutOfBounds: {
        text: 'Person Out Of Bounds',
        status: 'PersonOutOfBounds',
      },
      PersonRunning: {
        text: 'PersonRunning',
        status: 'PersonRunning',
      },
      Smuggling: {
        text: 'Smuggling',
        status: 'Smuggling',
      },
      FalsifiedDocuments: {
        text: 'Falsified Documents',
        status: 'FalsifiedDocuments',
      },
      UnlawfulParkingVehicle: {
        text: 'Unlawful Parking Vehicle',
        status: 'UnlawfulParkingVehicle',
      },
    },
    render: (dom: any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag color={text === 'HumanTrafficking' ? '#000000' : text === 'Contraband' ? '#8c8c8c' : text === 'UTurnVehicle' ? '#262626' : text === 'SuspiciousDrivingPattern' ? '#a8071a' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },   
  {
    disable: true,
    title: 'Involved Objects',
    dataIndex: ['involvedObjects', 0, 'type'], // Correctly access nested data
    filters: true,
    onFilter: (value: any, record: any) => {
      console.log("inside involved objects on filter, value : ", value, " record: ", record);
      const involvedObject = record.involvedObjects?.[0];
      return involvedObject?.type === value || involvedObject?.visualId === value;
    },
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      Vessel: {
        text: 'Vessel',
        status: 'Vessel',
      },
      Vehicle: {
        text: 'Vehicle',
        status: 'Vehicle',
      },
      Person: {
        text: 'Person',
        status: 'Person',
      },
    },
    render: (text: any, record: any) => (
      <Button onClick={() => navigate(`/involved-objects/${flag}/${record.id}`)}>
        View Details
      </Button>
    ),
  },
];
const columnsDetection: ProColumns<any>[] = [
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
    title: 'Detection Type',
    dataIndex: 'detectionType',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      UnusualPatternDetection: {
        text: 'Unusual Pattern Detection',
        status: 'UnusualPatternDetection',
      },
      FaceVerificationIdentification: {
        text: 'Face Verification Identification',
        status: 'FaceVerificationIdentification',
        // disabled: true,
      },
      PersonPattern: {
        text: 'Person Pattern',
        status: 'PersonPattern',
      },
      PersonIdentification: {
        text: 'Person Identification',
        status: 'PersonIdentification',
      },
      BlockchainVerification: {
        text: 'Blockchain Verification',
        status: 'BlockchainVerification',
      },
      Vesselrecognition: {
        text: 'Vessel recognition',
        status: 'Vesselrecognition',
      },
      Smuggling: {
        text: 'Smuggling',
        status: 'Smuggling',
      },
      Contraband: {
        text: 'Contraband',
        status: 'Contraband',
      },
      Dangeroussubstance: {
        text: 'Dangerous substance',
        status: 'Dangeroussubstance',
      },
      HumanTrafficking: {
        text: 'Human Trafficking',
        status: 'HumanTrafficking',
      },
      ConfirmedDocuments: {
        text: 'Confirmed Documents',
        status: 'ConfirmedDocuments',
      },
      Trainrecognition: {
        text: 'Train recognition',
        status: 'Trainrecognition',
      },
      NormalDrivingPattern: {
        text: 'Normal Driving Pattern',
        status: 'NormalDrivingPattern',
      },
    },
    render: (dom: any) => {
      const dm = dom;
      const textTemp = dm?.props.children;
      const text = textTemp?.props.text;
      return (<Tag color={text === 'HumanTrafficking' ? '#000000' : text === 'Contraband' ? '#8c8c8c' : text === 'UTurnVehicle' ? '#262626' : text === 'SuspiciousDrivingPattern' ? '#a8071a' : 'warning'}> {text ? text.toString().split('|').join(', ') : ''}</Tag>);
    },
  },   
  {
    disable: true,
    title: 'Involved Objects',
    dataIndex: ['involvedObjects', 0, 'type'], // Correctly access nested data
    filters: true,
    onFilter: (value: any, record: any) => {
      console.log("inside involved objects on filter, value : ", value, " record: ", record);
      const involvedObject = record.involvedObjects?.[0];
      return involvedObject?.type === value || involvedObject?.visualId === value;
    },
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      Vessel: {
        text: 'Vessel',
        status: 'Vessel',
      },
      Vehicle: {
        text: 'Vehicle',
        status: 'Vehicle',
      },
      Person: {
        text: 'Person',
        status: 'Person',
      },
    },
    render: (text: any, record: any) => (
      <Button onClick={() => navigate(`/involved-objects/${flag}/${record.id}`)}>
        View Details
      </Button>
    ),
  },
];
  const onSearch = async (values: any) => {
    console.log("values on search: ", values);
    console.log("Object.keys(values) on search: ", Object.keys(values));
    
    if (Object.keys(values).length !== 2 && (values.anomalyType || values.detectionType || (values.involvedObjects && values.involvedObjects[0].type))) {
      // kenet datasource.filter
      const filteredData = initialData.filter(item => {
       // console.log("values.involvedObjects[0].type: ", values.involvedObjects[0].type, "item.involvedObjects[0].type: ", item.involvedObjects[0].type );
        if (values.type && item.type !== values.type) return false;
        if (values.id && !item.id.includes(values.id)) return false;
        if (values.datetime && formatDateToISO(new Date(item.datetime)) != formatDateToISO(values.datetime)) return false;
        if (values.anomalyType && !item.anomalyType.includes(values.anomalyType)) return false;
        if (values.detectionType && !item.detectionType.includes(values.detectionType)) return false;
        if (values && values.involvedObjects[0].type && item.involvedObjects[0].type !== values.involvedObjects[0].type ) return false;

        if (values.riskType && !item.riskType.includes(values.riskType)) return false;
        if (values.severity && !item.severity.includes(values.severity)) return false;
        if (values.probability && !item.probability.includes(values.probability)) return false;
        return true;
      });
      setFilters(values);


      setDataSource(filteredData);
      return filteredData;
    } else {
      console.log("condition reset wel data ", initialData);
      setFilters([]);
      setDataSource(initialData);
      if (flag==='anomaly'){
        dispatch(setAnomalyData(initialData));}
        
        else if (flag==='detection'){
          dispatch(setDetectionData(initialData));}
      return initialData;

    }
  };
    // Function to handle reset
    const handleReset = () => {
      setFilters([]);
      setDataSource(initialData);
      
      if (flag==='anomaly'){
      dispatch(setAnomalyData(initialData));
      dispatch(setFilteredAnomalyData(initialData));
    }
      else if (flag==='detection'){
        dispatch(setDetectionData(initialData));
        dispatch(setFilteredDetectionData(initialData));
      }
        

    };

  const handleGenerateGraphs = () => {
    // Dispatch the query data to the store
    var time = new Date().toString();
    setDashboard({ id: uuid().slice(0,8), datetime: time, data: dataSource, filters: filters });
    // navigate('/dashboard');  // Navigate to the dashboard
    dispatch(setDashboardData({ id: uuid().slice(0,8), datetime: time.toString(), data: dataSource, filters: filters }));

    // Navigate to the graphs page if needed
    // e.g., using react-router-dom to navigate
  };

  const actionRef = useRef<ActionType>();

  return (

    <ProTable
      columns={(flag==='risk')?columns:(flag==='anomaly')?columnsAnomaly: columnsDetection}
      dataSource={dataSource}
      headerTitle={true}
      // search={{}}
      actionRef={actionRef}
      cardBordered
      rowKey="id"
      // editable={{
      //   type: 'multiple',
      // }}
      request={async (params, sort, filter) => {
        console.log("params: ", params);
        setFilters(params);
        await waitTime(2000);
        // if(params['datetime']){
        //   params['datetime'] = formatDateToISO(params['datetime']).toString()
        // }
        setFilters(params);

        const tempdata = await onSearch(params)
       // setFilters([]);
        if(flag === 'anomaly'){
        //  dispatch(setAnomalyData(tempdata));
        dispatch(setFilteredAnomalyData(tempdata));

          return tempdata;
        } else if(flag === 'detection'){
          dispatch(setFilteredDetectionData(tempdata));
          return tempdata;
        }
        return tempdata;
      }}
      onChange={
        (pagination, filters, sorter, extra) => {
             console.log(extra.currentDataSource,pagination, filters, sorter, extra);
        } 
   } 
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
      onRow={(record) => ({
        onClick: () => {
          if (onRowClick) {
            onRowClick(record);
          } else {
            navigate(`/involved-objects/${flag}/${record.id}`);
          }
        },
      })}
    onReset ={() =>{
      console.log("reset tnezlet");
      handleReset();
    }}
      pagination={{
        pageSize: (flag!='risk' && fullscreen) ?15:(flag ==='risk' )? 15:5 ,
      }}
      toolBarRender={flag === 'risk' ? () => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleGenerateGraphs}
        >
          Generate Dashboard
        </Button>,
      ] : 
      () => [   <Button type="default" onClick={handleReset}>
      Reset Filters</Button>] 
} 
    />

  );
};

export default DataTableComponent;

