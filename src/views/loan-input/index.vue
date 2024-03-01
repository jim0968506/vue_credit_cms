<template>
    <div class="form-box"> <!-- model接收表單資料物件 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-card class="box-card">
                <div slot="header">
                    <span>個人基本資訊</span>
                </div>

                <el-row>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <!-- prop的值是下面form後面的屬性名也就是name -->
                        <el-form-item label="姓名" prop="name">
                            <!-- 等所有表單寫完統一設定屬性接收-->
                            <el-input type='input' v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="出生日期" prop="birthday">
                            <!-- 寬度會有點小，後面複製樣式後會改變 -->
                            <el-date-picker v-model="form.birthday" type="date" placeholder="選擇日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="性別" prop="sex">
                            <el-select v-model="form.sex">
                                <el-option key="man" label="男" value="man">
                                </el-option>
                                <el-option key="woman" label="女" value="woman">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="身份證" prop="identity_card">
                            <el-input type='input' v-model="form.identity_card"></el-input>
                        </el-form-item>
                    </el-col>


                </el-row>
                <el-row>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="婚姻狀態" prop="marriage">
                            <el-select v-model="form.marriage">
                                <el-option key="married" label="已婚" value="married">
                                </el-option>
                                <el-option key="unmarried" label="未婚" value="unmarried">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="教育程度" prop="education">
                            <el-select v-model="form.education">
                                <el-option key="college" label="大學" value="college">
                                </el-option>
                                <el-option key="highschool" label="高中" value="highschool">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="居住地址" prop="address1">
                            <el-input type='input' v-model="form.address1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="戶籍地址" prop="address2">
                            <el-input type='input' v-model="form.address2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="居住電話" prop="phone">
                            <el-input type='input' v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="手機號" prop="mobile_phone">
                            <el-input type='input' v-model="form.mobile_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <span>職業資訊</span>
                </div>
                <el-row>
                    <el-col :xl='8' :lg='6' :md="12" :sm="24" :xs="24">
                        <el-form-item label="現職公司" prop="company">
                            <el-input type='input' v-model="form.company"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xl='8' :lg='6' :md="12" :sm="24" :xs="24">
                        <el-form-item label="所屬行業" prop="trade">
                            <el-select v-model="form.trade">
                                <el-option key="education" label="教育" value="education">
                                </el-option>
                                <el-option key="finance" label="金融" value="finance">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='6' :md="12" :sm="24" :xs="24">
                        <el-form-item label="職位" prop="position">
                            <el-input type='input' v-model="form.position"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='6' :md="12" :sm="24" :xs="24">
                        <el-form-item label="公司地址" prop="address3">
                            <el-input type='input' v-model="form.address3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="公司類型" prop="company_type">
                            <el-input type='input' v-model="form.company_type"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="公司郵箱" prop="company_email">
                            <el-input type='input' v-model="form.company_email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='8' :lg='8' :md="12" :sm="24" :xs="24">
                        <el-form-item label="公司電話" prop="company_phone">
                            <el-input type='input' v-model="form.company_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <span>收支情況</span>
                </div>
                <el-row>
                    <el-col :xl='8' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="收支情況" prop="income">
                            <el-input type='input' v-model="form.income"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <span>家庭聯絡人</span>
                </div>
                <el-row>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="關係1" prop="contact">
                            <el-input type='input' v-model="form.contact"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="姓名" prop="contact_name">
                            <el-input type='input' v-model="form.contact_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="手機" prop="contact_phone">
                            <el-input type='input' v-model="form.contact_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <span>工作證明人</span>
                </div>
                <el-row>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="關係2" prop="contact2">
                            <el-input type='input' v-model="form.contact2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="姓名" prop="contact2_name">
                            <el-input type='input' v-model="form.contact2_name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="手機" prop="contact2_phone">
                            <el-input type='input' v-model="form.contact2_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="部門" prop="contact2_dep">
                            <el-input type='input' v-model="form.contact2_dep"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="職位" prop="contact2_pos">
                            <el-input type='input' v-model="form.contact2_pos"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xl='12' :lg='12' :md="12" :sm="24" :xs="24">
                        <el-form-item label="備註" prop="remark">
                            <el-input type='textarea' v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-button @click="createUser" type="primary">立即建立</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form>
    </div>
</template>

<script>
import { createLoan } from '@/apis/loan'
export default {
    data() {
        return {
            form: {
                name: '',
                birthday: '',
                sex: '',
                identity_card: '',
                marriage: '',
                education: '',
                address1: '',
                address2: '',
                phone: '',
                mobile_phone: '',
                company: '',
                trade: '',
                position: '',
                address3: '',
                company_type: '',
                company_email: '',
                company_phone: '',
                income: '',
                contact: '',
                contact_name: '',
                contact_phone: '',
                contact2: '',
                contact2_name: '',
                contact2_phone: '',
                contact2_dep: '',
                contact2_pos: '',
                remark: ''
            },
            rules: {
                name: [
                    { required: true, message: "請輸入姓名", trigger: "blur" },
                    {
                        min: 2,
                        max: 5,
                        message: "長度在 2 到 5 個字元",
                        trigger: "blur"
                    }
                ],
                identity_card: [
                    { required: true, message: "請輸入身份證", trigger: "change" }
                ],
                birthday: [
                    {
                        type: "date",
                        required: true,
                        message: "請選擇日期",
                        trigger: "change"
                    }
                ],
                sex: [{ required: true, message: "請選擇性別", trigger: "change" }],
                marriage: [
                    { required: true, message: "請選擇婚姻狀態", trigger: "change" }
                ],
                education: [
                    { required: true, message: "請選擇教育程度", trigger: "change" }
                ],
                trade: [
                    { required: true, message: "請選擇所屬行業", trigger: "change" }
                ],

                address1: [
                    { required: true, message: "請輸入居住地址", trigger: "blur" }
                ],
                address2: [
                    { required: true, message: "請輸入戶籍地址", trigger: "blur" }
                ],
                phone: [{ required: true, message: "請輸入居住電話", trigger: "blur" }],
                mobile_phone: [
                    { required: true, message: "請輸入手機號", trigger: "blur" }
                ],
                company: [
                    { required: true, message: "請輸入現職公司全稱", trigger: "blur" }
                ],
                position: [{ required: true, message: "請輸入職位", trigger: "blur" }],
                address3: [
                    { required: true, message: "請輸入公司地址", trigger: "blur" }
                ],
                company_type: [
                    { required: true, message: "請輸入公司類型", trigger: "blur" }
                ],
                company_email: [
                    { required: true, message: "請輸入公司郵箱", trigger: "blur" }
                ],
                company_phone: [
                    { required: true, message: "請輸入公司電話", trigger: "blur" }
                ],
                income: [
                    { required: true, message: "請輸入收支情況", trigger: "blur" }
                ],
                contact: [{ required: true, message: "請輸入關係1", trigger: "blur" }],
                contact_name: [
                    { required: true, message: "請輸入姓名", trigger: "blur" }
                ],
                contact_phone: [
                    { required: true, message: "請輸入手機", trigger: "blur" }
                ],
                contact2: [{ required: true, message: "請輸入關係2", trigger: "blur" }],
                contact2_name: [
                    { required: true, message: "請輸入姓名", trigger: "blur" }
                ],
                contact2_phone: [
                    { required: true, message: "請輸入手機", trigger: "blur" }
                ],
                contact2_dep: [
                    { required: true, message: "請輸入部門", trigger: "blur" }
                ],
                contact2_pos: [
                    { required: true, message: "請輸入職位", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        createUser() {
            this.$refs.form.validate(async (data) => {
                if (!data) return this.$message('表單驗證不通過');
                //下面的是新加的，如果不等於20000代表失敗
                let res = await createLoan(this.form);
                if (res.data.code !== 20000) return this.$message('建立申請失敗');

            })
        },
        reset() {
            this.$refs.form.resetFields()
        }
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
</style>