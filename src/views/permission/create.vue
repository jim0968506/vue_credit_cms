<template>
    <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
                <el-col :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="使用者名稱" prop="username">
                        <el-input type='input' v-model="form.username"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="密碼" prop="password">
                        <el-input type='password' v-model="form.password"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="確認密碼" prop="confirmPwd">
                        <el-input type='password' v-model="form.confirmPwd"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl=8 :lg=8 :md=12 :sm=24 :xs=24>
                    <el-form-item label="許可權分配" prop="permission">
                        <el-radio v-model="form.permission" label='2'>銷售人員</el-radio>
                        <el-radio v-model="form.permission" label='1'>初審人員</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div class="left">
            <el-button @click="doCreate" type="primary">建立管理員</el-button>
            <el-button @click="doReset">重置</el-button>
        </div>


    </div>
</template>

<script>
import { createUser } from '@/apis/user'
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPwd: '',
                permission: '2'
            },
            rules: {
                username: [{ required: true, message: '必須輸入使用者名稱' }],
                password: [{ required: true, message: '必須輸入密碼' }],
                //validatePass2方法檢測兩次密碼是否一致
                confirmPwd: [{ required: true, validator: this.validatePass2, trigger: 'blur' }],
                permission: [{ required: true }]
            }
        }
    },
    methods: {
        validatePass2(rule, value, callback) {
            if (value === '') {
                callback(new Error('請再次輸入密碼'));
            } else if (value !== this.form.password) {
                callback(new Error('兩次輸入密碼不一致!'));
            } else {
                callback();
            }
        },
        async doCreate() {
            this.$refs['form'].validate(async (data) => {
                if (!data) return this.$message('表單驗證不通過')

                let res = await createUser(this.form)
                if (res.data.code === 20000) {
                    this.doReset()
                }
            })

        },
        doReset() {
            this.$refs['form'].resetFields()
        }
    }
}
</script>
<style scoped>
.form-box {
    margin-top: 20px;
}
</style>