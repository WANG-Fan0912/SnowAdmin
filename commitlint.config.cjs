module.exports = {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "style",
        "perf",
        "refactor",
        "test",
        "chore",
        "docs",
        "workflow",
        "build",
        "ci",
        "revert",
        "wip",
        "release",
        "deps"
        // feat：新功能（feature）
        // fix：修补bug
        // style： 格式（不影响代码运行的变动）
        // perf: 性能相关
        // refactor：重构（即不是新增功能，也不是修改bug的代码变动）
        // test：测试
        // chore: 其他修改（不在上述类型中的修改）
        // docs：文档（documentation）
        // workflow: 工作流
        // build: 项目打包构建相关的配置修改
        // ci: 持续集成相关
        // revert: 恢复上一次提交（回滚）
        // wip: work in progress 工作中 还没完成
        // release: 发版
        // deps: 依赖相关的修改
      ]
    ]
  }
};
