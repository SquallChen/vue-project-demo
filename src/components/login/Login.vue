<template>
  <div class="loginBg">
    <div class="topTitle" text="长航卫星导航欢迎你">长航卫星导航欢迎你</div>
    <div class="login-container">
      <p>账号登录</p>
      <el-form ref="form" :model="loginForm" id="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.userName" placeholder="用户名">
            <template slot="prepend"><img :src=userimg /></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.pw" placeholder="密码" @keyup.enter.native="login">
            <template slot="prepend"><img :src=pwdimg /></template>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <div class="join_formitem">
          <div class='captcha'>
            <el-row>
              <el-col :span="16">
                <el-form-item>
                  <el-input v-model="picLyanzhengma" placeholder="请输入验证码" class="yanzhengma_input" @keyup.enter.native="login"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <input type="button" @click="createCode" class="verification" v-model="checkCode" />
              </el-col>
            </el-row>
          </div>
        </div>
        <el-button type="primary" :loading="loading" @click="login" class="btn-block">登 录</el-button>
      </el-form>
    </div>
    <div class="copyright">企业名称&emsp;©&emsp;2018&emsp;网址：www.southgnss.com<span style="position:absolute;bottom:0px;right:12px;">0.9.0.20190715</span></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { local } from '@/utils/token';
import { auth_rules_page, random } from '@/api/user';
import userImg from '@/assets/username.png';
import pwdImg from '@/assets/password.png';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        userName: '',
        pw: ''
      },
      loading: false,
      userimg: userImg,
      pwdimg: pwdImg,
      picLyanzhengma: '',
      checkCode: '',
      code: '',
      options: [{
          value: 'CN',
          label: '中文'
        }, {
          value: 'EN',
          label: 'English'
        }],
      value: 'CN'
    };
  },
  props: {},
  components: {},
  computed: {},
  filters: {},
  methods: {
    login() {
      if (this.picLyanzhengma.toUpperCase() === this.code) {//toUpperCase将字符转为大写
        this.loading = true;
        this.$store .dispatch('actionLogin', this.loginForm) .then(res => {
            if (res) {
              this.loading = false;
              this.$router.push({ path: '/' });
            } else {
              this.loading = false;
            }
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.$message.error('请重新输入验证码');
        this.picLyanzhengma = '';
      }
    },
    // 图片验证码
    createCode() {
      //先清空验证码的输入
      this.code = '';
      this.checkCode = '';
      this.picLyanzhengma = '';
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 31);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    }
  },
  mounted() {
    this.createCode();
  },
  created(){
    this.value = localStorage.getItem('language')||'CN';
  },
};
</script>

<style lang="stylus">
.login-container
  position absolute
  left 50%
  top 50%
  margin-left 112px
  margin-top -181px
  width 352px
  height 362px
  padding 0 35px 35px 35px
  text-align center
  border 1px solid #fff
  border-radius 6px
  background #fff
  .btn-block
    width 100%
    margin-bottom 30px
    height 48px
    background #248cf7
    font-size 18px
    margin-top 15px
.login-container p
  padding 0px
  margin 30px 0
  color #333
  font-size 22px
.language
  width 352px
  left 0
  color #fff
  display flex
  justify-content center
  position absolute
  margin-top 20px
  .changeLang
    line-height 33px
    margin-right 10px
    text-align right
  input
    width 140px
.copyright
  width 100%
  height 40px
  line-height 40px
  background rgba(0, 0, 0, 0.7)
  color #fff
  text-align center
  position absolute
  bottom 0px
.loginBg
  width 100%
  height 100%
  background url('~@/assets/loginBg.png') no-repeat center center fixed
  background-size cover
  overflow hidden
.topTitle
  width 352px
  height 35px
  position absolute
  color #48f7e0
  font-size 32px
  text-align center
  left 50%
  top 50%
  margin-left 112px
  margin-top -247px
  &:before
    content attr(text)
    position absolute
    z-index 10
    color #19d4f9
    -webkit-mask linear-gradient(140deg, #48f7e0, transparent )
#loginForm .el-input__inner
  height 48px !important
  line-height 48px !important
#loginForm .el-form-item--mini.el-form-item, #loginForm .el-form-item--small.el-form-item
  margin-bottom 13px
.verification
  width 90px
  letter-spacing 5px
  height 48px
  -webkit-transform translate(-15px, 0)
  transform translate(-15px, 0)
  margin-left 20px
.captcha
  height 50px
  text-align justify
</style>