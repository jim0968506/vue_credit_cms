<template>
    <div id="application-manage">

        <el-row>
            <el-col :span="22">
                <!--這個屬性接收名稱，下面統一定義 -->
                <el-input placeholder="請輸入名稱" type="text" v-model="query"></el-input>
            </el-col>
            <el-col :span="2">
                <!-- 按鈕事件也是下面統一定義 -->
                <el-button type="primary" @click="setQueryName">搜尋</el-button>
            </el-col>
        </el-row>
        <!--tableData是表格資料-->
        <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true"
            :useMultiSelect="false">
            <!--第一列序號-->
            <el-table-column type="index" label="序號" width="55" align="center">
            </el-table-column>
            <el-table-column v-for="(col, index) in columns" :key="index" :label="col.label" :prop="col.prop"
                :width="col.width">
                <!-- 預設插槽  column是所有列資訊，row是當前行資訊-->
                <template v-slot="{ column, row }">
                    <!-- 如果列的prop的值為status-->
                    <div v-if="column.property === 'status'">
                        <!-- 使用兩個過濾器來格式化方法，因為後端返回的申請狀態是0到7 -->
                        <el-tag :type="row[column.property] | statusColor">{{ row[column.property] | status }}
                        </el-tag>
                    </div>
                    <!--如果是操作列新增三個按鈕-->
                    <div v-else-if="column.property === 'opts'">
                        <el-button :disabled="[0, 2, 3, 6].indexOf(row['status']) === -1" @click="showEdit(row)"
                            type="primary">編輯</el-button>
                        <el-button @click="delLoan(row.id)" type="danger">刪除</el-button>
                        <el-button :disabled="[0, 2, 3, 6].indexOf(row['status']) === -1" @click="submit(row.id)"
                            type="success">提交審核</el-button>
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
        <!--dialogVisible變數控制對話方塊是否顯示-->
        <el-dialog title="申請管理-編輯" :visible="dialogVisible" @close="dialogVisible = false" width="30%">
            <div class="form-box">
                <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px">
                    <el-row>
                        <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
                            <el-form-item label="姓名" prop="name">
                                <el-input type='input' v-model="updateForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
                            <el-form-item label="性別" prop="sex">
                                <el-select v-model="updateForm.sex">
                                    <el-option key="man" label="男" value="man">
                                    </el-option>
                                    <el-option key="woman" label="女" value="woman">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div class="btns clear-fix">
                    <div>
                        <el-button type="primary" @click="submitUpdate">提交</el-button>
                        <el-button @click="cleanFrom">重置</el-button>
                    </div>
                </div>

            </div>
        </el-dialog>

    </div>
</template>

<script>
import { getLoanList, updateLoan, deleteLoan, submitApprove } from '@/apis/loan.js'
export default {
    filters: {
        statusColor(status) {
            switch (status) {
                case 0:
                    return 'success'
                    break
                case 1:
                    return ''
                    break
                case 2:
                    return 'success'
                    break
                case 3:
                    return 'danger'
                    break
                case 4:
                    return 'warning'
                    break
                case 5:
                    return 'success'
                    break
                case 6:
                    return 'danger'
                    break
                case 7:
                    return 'success'
                    break
                default:
                    return 'danger'

            }
        },
        status(status) {
            switch (status) {
                case 0:
                    return '進件'
                    break
                case 1:
                    return '提交初審'
                    break
                case 2:
                    return '初審通過'
                    break
                case 3:
                    return '初審拒絕'
                    break
                case 4:
                    return '提交終審'
                    break
                case 5:
                    return '終審通過'
                    break
                case 6:
                    return '終審拒絕'
                    break
                case 7:
                    return '生成合同'
                    break
                default:
                    return '出錯了'
            }
        }

    },
    data() {
        return {
            updateForm: {
                name: '',
                sex: '',
                id: 0
            },
            rules: {
                name: [{ required: true, message: '必須填寫使用者名稱' }],
                sex: [{ required: true, message: '必須填寫性別' }],
            },
            dialogVisible: false,
            query: '',
            tableData: [],
            pageOptions: {
                pageNo: 1,
                pageSize: 10
            },
            rows: 0,
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "80",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "140",
                },
                {
                    label: "性別",
                    prop: "sex",
                    width: "50",
                },
                {
                    label: "教育程度",
                    prop: "education",
                    width: "80",
                },
                {
                    label: "居住地址",
                    prop: "address1",
                },
                {
                    label: "手機號",
                    prop: "mobile_phone",
                },
                {
                    label: "申請狀態",
                    prop: "status",
                    width: "90",
                },
                {
                    label: "操作",
                    width: "280",
                    prop: "opts",
                },
            ],

        }
    },
    methods: {
        async setQueryName() {

        },
        async getLoanList() {
            let res = await getLoanList(this.pageOptions)
            if (res.data.code === 20000) {
                //對資料格式化
                this.tableData = res.data.data.data.data.map(item => {
                    item.birthday = this.getBirthday(item.birthday);
                    item.sex = this.getSex(item.sex);
                    item.education = this.getEducation(item.education);
                    return item;
                })

                this.rows = res.data.data.rows
            }
        },
        getBirthday(date) {
            let dateNow = new Date(date);
            function convert(data) {
                return data < 10 ? "0" + data : data;
            }
            let year = dateNow.getFullYear();
            let month = convert(dateNow.getMonth());
            let day = convert(dateNow.getDate());

            let hours = convert(dateNow.getHours());
            let minutes = convert(dateNow.getMinutes());
            let seconds = convert(dateNow.getSeconds());
            let dateStr =
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;
            return dateStr;
        },
        getSex(str) {
            return str === "man" ? "男" : "女";
        },
        getEducation(str) {
            return str === "college" ? "大學" : "高中";
        },
        showEdit(row) {
            this.updateForm.id = row.id
            this.updateForm.name = row.name
            this.updateForm.sex = row.sex
            this.dialogVisible = true
        },
        async delLoan(id) {
            let res = await deleteLoan(id)
            //20000代表成功，成功後重新獲取資料 
            if (res.data.code === 20000) {
                this.getLoanList()
            }
        },
        async submit(id) {
            let res = await submitApprove(id)
            //20000代表成功，成功後重新獲取資料 
            if (res.data.code === 20000) {
                this.getLoanList()
            }
        },
        async submitUpdate() {
            let res = await updateLoan(this.updateForm)
            if (res.data.code === 20000) {
                this.cleanFrom()
                this.dialogVisible = false
                this.getLoanList()
            }
        },
        cleanFrom() {
            this.$refs["updateForm"].resetFields()
        },
        handleCurrentChange(pageNo) {
            this.pageOptions.pageNo = pageNo
            this.getLoanList()
        },
        updateSize(pageSize) {
            this.pageOptions.pageSize = pageSize
            this.getLoanList()
        },
        async setQueryName() {
            this.pageOptions.name = this.query
            await this.getLoanList()
            this.pageOptions.name = null
        }
    },
    mounted() {
        this.getLoanList()
    }
}
</script>

<style lang="scss" scoped>
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

::v-deep .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
}

.el-pagination {
    padding-top: 10px;
}
</style>