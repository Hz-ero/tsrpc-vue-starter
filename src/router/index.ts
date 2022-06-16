import { createRouter, createWebHashHistory } from 'vue-router'

// 生成虚拟路由
import routes from "virtual:generated-pages"

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;