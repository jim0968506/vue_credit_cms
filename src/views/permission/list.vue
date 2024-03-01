<template>
    <div id="input-manager">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序號" width="80" align="center">
            </el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label"
                :width="item.width" align="center">
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" @size-change="updateSize" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageOptions.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="rows">
        </el-pagination>
    </div>
</template>

<script>
import { userList } from '@/apis/user.js'
export default {
    data() {
        return {
            pageOptions: {
                pageNo: 1,
                pageSize: 10
            },
            rows: 0,
            tableData: [],
            columns: [
                {
                    label: "使用者名稱",
                    prop: "account",
                },
                {
                    label: "密碼",
                    prop: "password",
                },
                {
                    label: '建立時間',
                    prop: 'reg_time',
                },
                {
                    label: '建立者',
                    prop: 'creator'
                },
                {
                    label: '許可權分配',
                    prop: 'role_name',
                }

            ]
        }
    },
    methods: {

        getTime(date) {

            function convertTime(n) {
                return n < 10 ? '0' + n : n
            }
            let d2 = new Date(date)
            return d2.getFullYear() + '-'
                + convertTime(d2.getMonth() + 1) + '-'
                + convertTime(d2.getDate()) + ' '
                + convertTime(d2.getHours()) + ':'
                + convertTime(d2.getSeconds()) + ':'
                + convertTime(d2.getMinutes())
        },
        getRole(s) {
            switch (s) {
                case 'input':
                    return '銷售專員'
                case 'approve':
                    return '初審專員'
                case 'administrator':
                    return '超級管理員'
            }
        },
        handleCurrentChange(pageNo) {
            this.pageOptions.pageNo = pageNo
            this.getUserList()
        },
        updateSize(pageSize) {
            this.pageOptions.pageSize = pageSize
            this.getUserList()
        },
        //獲取列表展示
        async getUserList() {
            let res = await userList();
            if (res.data.code === 20000) {
                let { pageNo, pageSize } = this.pageOptions;
                this.rows = res.data.data.length;
                let tableDataNew = res.data.data;
                tableDataNew = tableDataNew.slice(
                    (pageNo - 1) * pageSize,
                    pageNo * pageSize
                );
                tableDataNew = tableDataNew.map((item) => {
                    item.reg_time = this.getTime(item.reg_time);
                    item.role_name = this.getRole(item.role_name);
                    return item;
                });
                this.tableData = tableDataNew;
            }
        },
    },
    mounted() {
        this.getUserList()
    }
}
</script>