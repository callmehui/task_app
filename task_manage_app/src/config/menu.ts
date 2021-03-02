interface MenuItem {
  id?: string; /** 菜单项id，id是菜单的唯一标识，不可重复 */
  text: string; /** 菜单项的显示名称 */
  icon?: string; /** 菜单项图标的class名 */
  url?: string; /** 点击菜单项后跳转的路由地址 */
  isGroup?: boolean; /** true: 当前菜单属于分组菜单，false: 不属于分组菜单 */
  children?: MenuItem[]; /** 子级菜单 */
}

const menus: MenuItem[] = [
  {
    text: "首页",
    icon: "icon-home",
    children: [
      {
        text: "首页",
        icon: "icon-home",
        url: "/home",
      },
      {
        text: "工作台",
        icon: "icon-dashboard",
        url: "/home/dashboard",
      },
    ],
  },
  {
    text: "目标管理",
    icon: "icon-target",
    children: [
      {
        text: "新建目标",
        icon: "icon-new-target",
        url: "/target/newtarget",
      },
      {
        text: "当前目标",
        icon: "icon-target-focus",
        url: "/target/targetfocus",
      },
      {
        text: "全部目标",
        icon: "icon-target-list",
        url: "/target/targetlist",
      },
    ]
  },
  {
    text: "计划管理",
    icon: "icon-plan",
    children: [
      {
        text: "新建计划",
        icon: "icon-new-plan",
        url: "/plan/newplan",
      },
      {
        text: "当前计划",
        icon: "icon-plan-focus",
        url: "/plan/planfocus",
      },
      {
        text: "全部计划",
        icon: "icon-plan-list",
        url: "/plan/planlist",
      },
    ]
  },
  {
    text: "任务管理",
    icon: "icon-task",
    children: [
      {
        text: "新建任务",
        icon: "icon-new-task",
        url: "/task/newtask",
      },
      {
        text: "当前任务",
        icon: "icon-task-focus",
        url: "/task/taskfocus",
      },
      {
        text: "全部任务",
        icon: "icon-task-list",
        url: "/task/tasklist",
      },
    ]
  },
];


export {
  MenuItem,
  menus
}