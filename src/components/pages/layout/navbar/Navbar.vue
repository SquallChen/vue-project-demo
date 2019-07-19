<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <div class="avatar-wrapper">
          <el-select v-model="value" placeholder="请选择" @change="selectChange">
           <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" > </el-option>
          </el-select>
            <router-link target="_blank" to='/digital'><span style="color:#e19233">{{$t('universal.digital')}}&emsp;</span></router-link>
            {{$t('universal.welcome')}}！<span class="userIcon"></span> {{ name }} <div class="line"></div><span class="logout" @click="handleLogout">{{$t('universal.exit')}}</span>
        </div>
      </div>
    </el-menu>

    <!-- <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :before-close="handleClose" width="30%" :close-on-click-modal="clickModal">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="old_pw">
          <el-input type="password" v-model="userForm.old_pw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pw">
          <el-input type="password" v-model="userForm.new_pw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="check_pw">
          <el-input type="password" v-model="userForm.check_pw" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitUpdatePw">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="infoFormVisible" width="30%" :close-on-click-modal="clickModal" @open="openInfoDialog()">
      <el-form :model="infoForm" ref="infoForm" label-width="80px">
        <el-form-item label="真实姓名">
          <el-input v-model="infoForm.real_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="infoForm.company_address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model="infoForm.company_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpdateInfo" style="width: 200px">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import Screenfull from './Screenfull';
import { local, cookie } from '@/utils/token';
import { logout } from '@/api/user';

// import { reset_self_password, edit_self_info } from '@/api/user';

export default {
  name: 'navbar',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userForm.check_pw !== '') {
          this.$refs.userForm.validateField('check_pw');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.new_pw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      screenTip: '全屏',
      dialogFormVisible: false,
      infoFormVisible: false,
      clickModal: false,
      companyName: window.g.company,
      userForm: {
        old_pw: '',
        new_pw: '',
        check_pw: ''
      },
      rules: {
        old_pw: [{ required: true, message: '原密码', trigger: 'blur' }],
        new_pw: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        check_pw: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      activeTab: 'first',
      products: [],
      infoForm: {
        real_name: '',
        company_address: '',
        company_phone: ''
      },
      options: [{
          value: 'CN',
          label: '中文'
        }, {
          value: 'EN',
          label: 'English'
        }],
      value: ''
    };
  },
  components: {
    Hamburger,
    Screenfull,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    selectChange(){
      this.$i18n.locale = this.value;
      localStorage.setItem('language',this.value);
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },

    updatePw() {
      this.$message({
        message: '正在编码中...',
        type: 'warning',
        duration: 5 * 1000
      });
      retrun;
      this.dialogFormVisible = true;
    },
    submitUpdatePw() {
      /* this.$refs['userForm'].validate(valid => {
        if (valid) {
          reset_self_password(this.userForm.old_pw, this.userForm.new_pw).then(
            r => {
              if (r) {
                this.$message({
                  type: 'success',
                  message: '修改密码成功!'
                });
                this.dialogFormVisible = false;
                cookie.del('token');
                cookie.del('name');
                this.$router.push({ path: 'login' });
              }
            }
          );
        } else {
          return false;
        }
      });*/
    },
    closeDialog() {
      this.$refs['userForm'].resetFields();
      this.dialogFormVisible = false;
    },
    handleClose(done) {
      this.$refs['userForm'].resetFields();
      done();
    },

    updateInfo() {
      this.$message({
        message: '正在编码中...',
        type: 'warning',
        duration: 5 * 1000
      });
      retrun;

      this.infoFormVisible = true;
    },
    openInfoDialog() {
      let info = local.get('userInfo');
      if (info) {
        this.infoForm.real_name = info.realName;
        this.infoForm.company_address = info.companyAddress;
        this.infoForm.company_phone = info.companyPhone;
      }
    },
    submitUpdateInfo() {
      /* edit_self_info(
        this.infoForm.real_name,
        this.infoForm.company_address,
        this.infoForm.company_phone
      ).then(r => {
        this.infoFormVisible = false;
        this.$message({
          type: 'success',
          message: '修改个人信息成功!'
        });
        local.set('userInfo', {
          realName: this.infoForm.real_name,
          companyAddress: this.infoForm.company_address,
          companyPhone: this.infoForm.company_phone
        });
      }); */
    },

    handleLogout() {
      /* logout().then(res => {
        console.log(res);
        cookie.del('token');
        cookie.del('name');
        location.reload();
      }); */
      cookie.del('token');
      cookie.del('name');
      location.reload();
    },

    changeTip(v) {
      this.screenTip = v ? '还原' : '全屏';
    }
  },
  created(){
    this.value = localStorage.getItem('language')||'CN';
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  justify-content: flex-start;
  position: relative;
  min-width: 800px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    padding: 0 10px;
  }

  .right-menu {
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 0;
    &:focus {
      outline: none;
    }
    .userIcon{
      display:inline-block;
      width:32px;
      height:34px;
      position:relative;
      top:8px;
      background: url('~@/assets/user.png') no-repeat;
      margin-left: 30px;
      margin-right: 5px;
    }
    .line{
      display:inline-block;
      width:1px;
      height:30px;
      background:#999;
      margin-left:30px;
      margin-right: 30px;
      position:relative;
      top:6px;
    }
    .logout{
      display:inline-block;
      width:80px;
      height:30px;
      position:relative;
      background: url('~@/assets/logout.png') no-repeat 6px 6px;
      padding-left:30px;
      line-height:30px;
      cursor:pointer;
      font-size: 14px;
      margin-right: 20px;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      margin-right: 20px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      font-size: 16px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        font-size: 14px;
        display: flex;
        align-items: center;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .inline {
      display: inline;
    }
  }
}
.navbar .el-select{
  position: relative;
  top: -5px;
  width: 100px;
  margin-right: 10px;
}
>>>.navbar .el-select .el-input__inner{
  width: 100px !important;
}
</style>

