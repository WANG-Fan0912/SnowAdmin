export const divisionData = [
  {
    id: "100",
    parentId: "0",
    name: "xxx机构有限公司",
    leader: "兔子先森",
    phone: "15888888888",
    email: "2547096351@qq.com",
    sort: 1,
    status: 1,
    description: "这是总部门",
    createBy: "admin",
    createTime: "2024-03-19 11:21:01",
    updateBy: "admin",
    updateTime: "2024-09-09 10:08:25",
    children: [
      {
        id: "10001",
        parentId: "100",
        name: "研发部门",
        leader: "小唐",
        phone: "",
        email: "",
        sort: 1,
        status: 1,
        description: "这里是研发部门",
        createBy: "admin",
        createTime: "2024-03-19 11:21:01",
        updateBy: "admin",
        updateTime: "2024-09-09 17:30:40",
        children: [
          {
            id: "1000101",
            parentId: "10001",
            name: "SnowAdmin开发组",
            leader: "小汤",
            phone: "",
            email: "",
            sort: 1,
            status: 1,
            description: "这是项目研发部",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: [
              {
                id: "100010101",
                parentId: "1000101",
                name: "UI组",
                leader: "晓棠",
                phone: "",
                email: "",
                sort: 1,
                status: 1,
                description: "这里负责UI设计",
                createBy: "admin",
                createTime: "2024-03-19 11:21:01",
                updateBy: "admin",
                updateTime: "2024-09-09 17:30:40",
                children: null
              },
              {
                id: "100010102",
                parentId: "1000101",
                name: "研发组",
                leader: "小塘",
                phone: "",
                email: "",
                sort: 2,
                status: 1,
                description: "这里负责开发",
                createBy: "admin",
                createTime: "2024-03-19 11:21:01",
                updateBy: "admin",
                updateTime: "2024-09-09 17:30:40",
                children: null
              }
            ]
          },
          {
            id: "1000102",
            parentId: "10001",
            name: "人事部门",
            leader: "兔子",
            phone: "",
            email: "",
            sort: 2,
            status: 1,
            description: "这里是人事部门",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: null
          },
          {
            id: "1000103",
            parentId: "10001",
            name: "财务部门",
            leader: "小鹿",
            phone: "",
            email: "",
            sort: 3,
            status: 1,
            description: "负责收账的",
            createBy: "admin",
            createTime: "2024-03-19 11:21:01",
            updateBy: "admin",
            updateTime: "2024-09-09 17:30:40",
            children: null
          }
        ]
      }
    ]
  }
];

export const roleData = [
  {
    id: 1,
    name: "超级管理员",
    key: "admin",
    sort: 1,
    status: 1,
    admin: true,
    description: "默认角色，超级管理员，上帝角色",
    createBy: null,
    createTime: "2024-03-27 11:21:01",
    updateBy: null,
    updateTime: null
  },
  {
    id: 2,
    name: "系统管理员",
    key: "manager",
    sort: 2,
    status: 1,
    admin: false,
    description: "主要负责管理系统",
    createBy: null,
    createTime: "2024-03-27 11:21:01",
    updateBy: null,
    updateTime: null
  },
  {
    id: 3,
    name: "操作员",
    key: "common",
    sort: 3,
    status: 1,
    admin: false,
    description: "负责一些基础信息的查询",
    createBy: null,
    createTime: "2024-03-27 11:21:01",
    updateBy: null,
    updateTime: null
  }
];
