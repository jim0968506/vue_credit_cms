<template>
    <div v-if="menu">
        <!-- 如果選單沒有children--> <!-- index需要接收跳轉路由的地址-->
        <el-menu-item v-if="!menu.children" :index="menu.path">
            <template slot="title">
                <span>{{ menu.title }}</span>
            </template>
        </el-menu-item>

        <!-- 如果選單有children-->
        <el-submenu v-else :index="menu.path">
            <template slot="title">
                <span>{{ menu.title }}</span>
            </template>
            <!-- 遞迴呼叫本元件-->
            <asideMenu v-for="(item, index) in menu.children" :key="index" :menu="item" />
        </el-submenu>
    </div>
</template>

<script>
export default {
    //需要聲明name，等會遞迴
    name: 'asideMenu',
    props: {
        //接收一個menu，屬性為object
        menu: {
            type: Object
        }
    }
}
</script>