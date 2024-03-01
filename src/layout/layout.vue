<template>
    <div>
        <el-container>
            <el-aside width="240px">
                <!-- 新增router，開啟路由模式-->
                <el-menu router class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <!-- for迴圈選單元件，傳入每一個選單項-->
                    <asideMenu v-for="(menu, index) in menuList" :menu="menu" :key="index" />
                </el-menu>

            </el-aside>
            <el-container>
                <el-header>
                    <!--//左側面包屑-->
                    <div class="left">
                        <Breadcrumb />
                    </div>
                    <!--//右側使用者名稱-->
                    <div class="right">
                        <el-dropdown @command="doCommand">
                            <!-- 把這裡寫死的admin改成{{userName}}-->
                            <span class="el-dropdown-link">{{ userName }}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出登入</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <!-- //放置一個路由出口 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template> 

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import { logout } from "@/apis/user"
import asideMenu from "@/components/asideMenu.vue"
export default {
    components: {
        Breadcrumb,
        asideMenu
    },
    methods: {
        async doCommand(e) {
            if (e === "logout") {
                let res = await logout()
                if (res.data.code === 20000) {
                    //這裡需要await阻塞一下，避免下面重新整理先執行
                    await this.$router.replace("/login")

                    //退出成功時清掉所有的儲存資訊
                    localStorage.clear()
                    //跳轉後重新整理下頁面，清除掉路由資訊
                    window.location.reload()
                }

            }
        }
    },
    computed: {
        userName() {
            return this.$store.state.userName
        },
        menuList() {
            return this.$store.state.menuList
        }
    },
}
</script>

<style scoped>
a:link {
    text-decoration: none;
    color: #fff;

}

/* 狀態二: 已經訪問過的連結 */
a:visited {
    text-decoration: none;
    color: #fff;
}

/* 狀態三: 滑鼠劃過(停留)的連結(預設紅色) */
a:hover {
    text-decoration: none;
    color: #fff;
}

/* 狀態四: 被點選的連結 */
a:active {
    text-decoration: none;
    color: #fff;
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100%;
}

.el-menu-vertical-demo {
    border: none;
}
</style>