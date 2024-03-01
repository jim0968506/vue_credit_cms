<template>
    <div id="input-manager">
        <el-row>
            <el-col :span="22">
                <el-input placeholder="請輸入名稱" type="text" v-model="query"></el-input>
            </el-col>
            <el-col :span="2">
                <!-- 按鈕 -->
                <el-button type="primary" @click="setQueryName">搜尋</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true" empty-text="暫無數據"
            :useMultiSelect="false">
            <el-table-column type="index" label="序號" width="55" align="center">
            </el-table-column>
            <el-table-column v-for="(col, index) in columns" :key="index" :label="col.label" :prop="col.prop"
                :width="col.width">
                <!--插槽，如果當前列是操作，新增三個按鈕-->
                <template v-slot="{ column, row }">
                    <div v-if="column.property === 'opts'">
                        <el-button @click="showInfo(row)" type="primary">檢視</el-button>
                        <!-- 傳入pass和reject代表呼叫通過或者拒絕介面-->
                        <el-button @click="submit(row.id, 'pass')" type="success">通過</el-button>
                        <el-button @click="submit(row.id, 'reject')" type="danger">拒絕</el-button>
                    </div>
                    <div v-else>
                        {{ row[column.property] }}
                    </div>
                </template>

            </el-table-column>


        </el-table>
        <el-pagination @current-change="handleCurrentChange" @size-change="updateSize" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageOptions.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="rows">
        </el-pagination>
        <el-dialog title="貸款審批-檢視詳情" :visible="dialogVisible" @close="dialogVisible = false" width="30%">
            <div class="form-box" v-if="dialogVisible">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-row>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="id" prop="id">
                                <el-input type='input' v-model="form.id" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="姓名" prop="name">
                                <el-input type='input' v-model="form.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="出生日期" prop="birthday">
                                <el-input type='input' v-model="form.birthday" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="性別" prop="sex">
                                <el-input type='input' v-model="form.sex" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="教育程度" prop="education">
                                <el-input type='input' v-model="form.education" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="地址" prop="address1">
                                <el-input type='input' v-model="form.address1" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="手機號" prop="phone">
                                <el-input type='input' v-model="form.phone" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="身份證" prop="identity_card">
                                <el-input type='input' v-model="form.identity_card" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div class="btns clear-fix">
                    <div>
                        <el-button type="primary" @click="dialogVisible = !dialogVisible">取消</el-button>

                    </div>
                </div>

            </div>
        </el-dialog>
    </div>
</template>

<script>
import { queryList, approveFirst } from "@/apis/loan.js";

export default {
    data() {
        return {
            pageOptions: {
                pageNo: 1,
                pageSize: 10
            },
            form: {

            },
            dialogVisible: false,
            rows: 0,
            query: '',
            tableData: [],
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "80",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "160",
                },
                {
                    label: "身份證",
                    prop: "identity_card",
                    width: "260",
                },
                {
                    label: "操作",
                    // width: "280",
                    prop: "opts",
                },
            ],
        }
    },
    methods: {
        async setQueryName() {
            this.pageOptions.name = this.query
            await this.getFirstList()
            this.pageOptions.name = null
        },
        convertBirthday(date) {
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
        async getFirstList() {
            let res = await queryList(this.pageOptions);
            if (res.data.code === 20000) {
                this.tableData = res.data.data.data.data.map((item) => {
                    item.birthday = this.convertBirthday(item.birthday);
                    return item;
                });
                this.rows = res.data.data.rows;
            }
        },
        showInfo(row) {
            this.form = row
            this.dialogVisible = true
        },
        // 審批
        async submit(id, flag) {
            let res = await approveFirst(id, flag);
            if (res.data.code === 20000) {
                this.getFirstList();
            }
        },
        handleCurrentChange(pageNo) {
            this.pageOptions.pageNo = pageNo
            this.getFirstList()
        },
        updateSize(pageSize) {
            this.pageOptions.pageSize = pageSize
            this.getFirstList()
        }
    },
    mounted() {
        this.getFirstList();
    },
}
</script>
<style lang="scss" scoped>
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
}

.el-select,
.el-input {
    width: 100%;
}

.btns {
    text-align: center;
}

.box-card {
    margin-bottom: 10px;

    >div {
        >div {
            text-align: left;
        }
    }
}

.el-row {
    margin-bottom: 10px;
}
</style>