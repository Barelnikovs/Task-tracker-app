import { defineStore } from "pinia";
import { computed, ref, reactive } from 'vue'
import axios from 'axios'

export const useAllTasksStore = defineStore('allTasks', () => {
    const databaseURL = 'https://vue-demo-deploy-6ab63-default-rtdb.firebaseio.com/tasks'
    const databaseURLEND = '.json'

    const allTasks = ref([])

    const getUsersData = async () => {
        try {
            const response = await axios.get(databaseURL + databaseURLEND)
            const tasksData = response.data || {}
            allTasks.value = Object.entries(tasksData).map(([key, task]) => ({id: key, ...task}))
            await checkDeadline()
        } catch (error) {
            console.warn('Ошибка запроса', error)
        }
    }

    const newTask = reactive({
        title: '',
        deadline: '',
        description: ''
    })

    const deadlineIsOverdue = (isoDateOfDeadline) => {
        return new Date(isoDateOfDeadline) < new Date()
    }

    const checkDeadline = async () => {
        for (const task of allTasks.value) {
            if (deadlineIsOverdue(task.status) && task.status !== 'cancelled' && task.status !== 'done') {
                await axios.patch(`${databaseURL}/${task.id}${databaseURLEND}`, {status: 'cancelled'})
                task.status = 'cancelled'
            }
        }
    }

    const addTask = async () => {
        try {
            const taskData = {
                title: newTask.title,
                status: 'active',
                deadline: newTask.deadline,
                description: newTask.description,
            }
            const response = await axios.post(databaseURL + databaseURLEND, taskData)
            const firebaseId = response.data.name
            allTasks.value.push({id: firebaseId, ...taskData})
            await checkDeadline()

            newTask.title = '';
            newTask.deadline = '';
            newTask.description = '';
        } catch (error) {
            console.warn('Ошибка при добавлении задачи', error)
        }
    }

    const updateTaskStatus = async (id, newStatus) => {
        const task = allTasks.value.find((task) => task.id === id)
        if (!deadlineIsOverdue(task.deadline)) {
            await axios.patch(`${databaseURL}/${task.id}${databaseURLEND}`, {status: newStatus})
            task.status = newStatus
        } else {
            if (task.status !== 'done') {
                await axios.patch(`${databaseURL}/${task.id}${databaseURLEND}`, {status: 'cancelled'})
            }
        }
        await checkDeadline()
    }

    const activeTasks = computed(() => {
        return allTasks.value.filter(task => task.status === 'active').length
    })

    const formButtonIsOff = computed(() => {
        return Object.values(newTask).some(key => key === '')
    })

    return { allTasks, newTask, getUsersData, addTask, checkDeadline, updateTaskStatus, activeTasks, formButtonIsOff }
})