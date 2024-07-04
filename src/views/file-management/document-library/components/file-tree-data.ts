class fileTreeData {
  static tree: any = [
    {
      title: "总公司",
      key: "0-0",
      children: [
        {
          title: "行政部门",
          key: "0-0-0",
          children: [
            {
              title: "人力资源部",
              key: "0-0-0-0",
              children: [{ title: "员工出差申请表", key: "0-0-0-0-0" }]
            },
            {
              title: "财务部",
              key: "0-0-0-1",
              children: [{ title: "行政费用预算分析-第一季度", key: "0-0-0-0-1" }]
            },
            {
              title: "法务部",
              key: "0-0-0-2",
              children: [{ title: "公司章程", key: "0-0-0-0-2" }]
            },
            { title: "行政工作计划", key: "0-0-0-3" },

            { title: "会议室预订统计", key: "0-0-0-4" },
            { title: "月度工作总结", key: "0-0-0-5" }
          ]
        },
        {
          title: "业务部门",
          key: "0-0-1",
          children: [
            { title: "客户反馈集锦", key: "0-0-1-0" },
            { title: "市场分析报告-季度", key: "0-0-1-1" }
          ]
        },
        {
          title: "技术部门",
          key: "0-0-2",
          children: [
            { title: "代码审查记录", key: "0-0-2-0" },
            { title: "数据库优化方案", key: "0-0-2-1" },
            { title: "技术支持工单", key: "0-0-2-2" },
            { title: "安全漏洞扫描报告", key: "0-0-2-3" },
            { title: "系统性能调优总结", key: "0-0-2-4" },
            { title: "软件版本发布计划", key: "0-0-2-5" },
            { title: "技术培训材料", key: "0-0-2-6" },
            { title: "技术文档更新计划", key: "0-0-2-7" }
          ]
        },
        {
          title: "后勤部门",
          key: "0-0-3",
          children: [
            { title: "设施维护报告", key: "0-0-3-0" },
            { title: "物流运输安排", key: "0-0-3-1" },
            { title: "仓库库存清单", key: "0-0-3-2" },
            { title: "办公室布局设计", key: "0-0-3-3" },
            { title: "设备采购申请表", key: "0-0-3-4" },
            { title: "食品安全检查记录", key: "0-0-3-5" }
          ]
        }
      ]
    }
  ];
}

export { fileTreeData };
