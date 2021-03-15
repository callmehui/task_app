import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { lazyLoad } from "./tool";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: lazyLoad("login"),
  },
  {
    path: "/register",
    name: "Register",
    component: lazyLoad("register"),
  },
  {
    path: "/",
    name: "Main",
    component: lazyLoad("main"),
    redirect: "/home",
    children: [
      /** 首页 */
      {
        path: "/home",
        name: "Home",
        component: lazyLoad("main/home/home"),
      },
      {
        path: "/home/dashboard",
        name: "Dashboard",
        component: lazyLoad("main/home/dashboard"),
      },
      /** 目标管理 */
      {
        path: "/target/newtarget",
        name: "NewTarget",
        component: lazyLoad("main/target/newtarget"),
      },
      {
        path: "/target/targetfocus",
        name: "TargetFocus",
        component: lazyLoad("main/target/targetfocus"),
      },
      {
        path: "/target/targetlist",
        name: "TargetList",
        component: lazyLoad("main/target/targetlist"),
      },
      /** 计划管理 */
      {
        path: "/plan/newplan",
        name: "NewPlan",
        component: lazyLoad("main/plan/newplan"),
      },
      {
        path: "/plan/planfocus",
        name: "PlanFocus",
        component: lazyLoad("main/plan/planfocus"),
      },
      {
        path: "/plan/planlist",
        name: "PlanList",
        component: lazyLoad("main/plan/planlist"),
      },
      /** 任务管理 */
      {
        path: "/task/newtask",
        name: "NewTask",
        component: lazyLoad("main/task/newtask"),
      },
      {
        path: "/task/taskfocus",
        name: "TaskFocus",
        component: lazyLoad("main/task/taskfocus"),
      },
      {
        path: "/task/tasklist",
        name: "TaskList",
        component: lazyLoad("main/task/tasklist"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * 定义路由守卫，用于在通过编程式导航修改路由的时候，让左侧导航栏同步
 */

export default router;
