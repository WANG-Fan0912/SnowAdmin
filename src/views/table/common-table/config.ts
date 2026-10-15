interface List {
  key: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  status: number;
  createTime: string;
}

interface FormData {
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    status: number | null;
  };
  search: boolean;
}

export type { List, FormData };
