<template>
    <el-breadcrumb separator="/">
        <!--第一個麵包屑預設首頁-->
        <el-breadcrumb-item>
            <router-link to="/home">首頁</router-link>
        </el-breadcrumb-item>
        <!--第二個取路由route的頁面棧matched的最後一個-->
        <el-breadcrumb-item v-if="route">
            {{ route }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    computed: {
        route() {
            let matched = this.$route.matched
            //如果頁面棧最後一個路由的meta的title不是首頁，則返回本身的title，如果是首頁則返回空
            return matched[matched.length - 1].meta.title != "首頁" ? matched[matched.length - 1].meta.title : ""
        }
    }
}
</script>