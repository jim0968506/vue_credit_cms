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
        <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true"
            :useMultiSelect="false">
            <el-table-column type="index" label="序號" width="55" align="center">
            </el-table-column>
            <el-table-column v-for="(col, index) in columns" :key="index" :label="col.label" :prop="col.prop"
                :width="col.width">
                <!--插槽，如果當前列是操作，新增三個按鈕-->
                <template v-slot="{ column, row }">
                    <div v-if="column.property === 'opts'">
                        <!--5代表終審通過,大於5就代表已經生成合同了，需要禁用-->
                        <el-button :disabled="row['status'] > 5" @click="createContract(row.id)"
                            type="primary">生成合同</el-button>
                        <!--7代表生成合同,不等於7需要禁用-->
                        <el-button :disabled="row['status'] !== 7" @click="downContract(row.id)"
                            type="success">下載合同</el-button>
                    </div>
                    <div v-else-if="column.property === 'status'">
                        <el-tag :type="row[column.property] === 7 ? 'success' : ''">{{ row[column.property] === 7 ? '生成合同' :
                            '未生成合同'
                        }}</el-tag>

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
    </div>
</template>

<script>
import { contractList, generateContract, downloadContract } from '@/apis/loan.js'
import request from '@/utils/request'

export default {
    data() {
        return {
            pageOptions: {
                pageNo: 1,
                pageSize: 10
            },
            rows: 0,
            query: '',
            tableData: [],
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "100",
                },
                {
                    label: "身份證",
                    prop: "identity_card",
                    width: "260",
                },
                {
                    label: "合同狀態",
                    prop: "status",
                    width: "160",
                },
                {
                    label: "操作",
                    prop: "opts",
                },
            ],
        }
    },
    methods: {
        async createContract(id) {
            let res = await generateContract(id)
            if (res.data.code === 20000) {
                this.getContractList()
            }
        },
        async downContract(id) {
            let res = await downloadContract(id)
            if (res.data.code === 20000) {
                //對請求回來的地址去除/api
                let url = res.data.data.url.replace('/api', '')
                let fileName = '貸款合同-' + id + '.docx'
                //使用拆分的url再次請求，並指定請求返回的資料類型為'blob
                let res2 = await request({
                    url,
                    responseType: 'blob'
                })
                // 記憶體中的臨時指向
                let link = window.URL.createObjectURL(res2.data)
                // 建立a標籤
                let tagA = document.createElement('a')
                // tag
                tagA.href = link
                tagA.download = fileName
                // 隱藏a標籤
                tagA.style.display = 'none'
                // 插入到body中
                document.body.appendChild(tagA)
                // 點選a標籤
                tagA.click()
                // 釋放資源 
                document.body.removeChild(tagA)
                // 釋放臨時url
                window.URL.revokeObjectURL(url)
            }
        },
        async setQueryName() {
            this.pageOptions.name = this.query
            await this.getContractList()
            this.pageOptions.name = null
        },

        async getContractList() {
            let res = await contractList(this.pageOptions);
            if (res.data.code === 20000) {
                this.tableData = res.data.data.data.data
                this.rows = res.data.data.rows;
            }
        },
        handleCurrentChange(pageNo) {
            this.pageOptions.pageNo = pageNo
            this.getContractList()
        },
        updateSize(pageSize) {
            this.pageOptions.pageSize = pageSize
            this.getContractList()
        }
    },
    mounted() {
        this.getContractList();
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