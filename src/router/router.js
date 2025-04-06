import { createRouter, createWebHistory } from 'vue-router'
import allTasks from "@/views/AllTasks.vue";
import CreateNewTask from "@/views/CreateNewTask.vue";
import TaskDetails from "@/views/TaskDetails.vue";
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/tasks', component: allTasks, alias: '/'},
        {path: '/tasks/:taskId', component: TaskDetails},
        {path: '/create-task', component: CreateNewTask },
        {path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: "active",
    linkExactActiveClass: "active",
})

export default router