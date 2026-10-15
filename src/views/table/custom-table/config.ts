interface List {
  key: string;
  serial: string;
  name: string;
  content: string;
  searchType: string;
  contentSize: number;
  status: number;
  createTime: string;
}

interface FormData {
  form: {
    serial: string;
    name: string;
    content: string;
    contentSize: string;
    status: number | null;
    /** 创建时间范围，两项分别为起止日期，未选择时为空数组 */
    createTime: string[];
  };
  search: boolean;
}

interface Columns {
  title: string;
  dataIndex?: string;
  checked: boolean;
  slotName?: string;
  align?: string;
}

interface DensityType {
  value: string;
  label: string;
}

export type { List, FormData, Columns, DensityType };
