<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

// 屏幕高度
const screenHeight = ref(document.body.clientHeight)
// 屏幕宽度
const screenWidth = ref(document.body.clientWidth)

const loginFormRef = ref<FormInstance>()
const bingPicCopyright = ref('')
const userLoginForm = ref<{
  username: string,
  password: string
}>({
  username : '' ,
  password : ''
})
const userLoginFormRules = ref({
  username: [
    { required: true, trigger: 'blur', message: '用户名不能为空' }
  ],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
})



function resetForm() {
  userLoginForm.value = {
    username : '',
    password : ''
  }
}
</script>

<template>
  <div id="appContainer" :style="{width: screenWidth + 'px', height: screenHeight + 'px'}" >
    <!--图片版权信息-->
    <div id="imgCopyright">
      <span>{{bingPicCopyright}}</span>
    </div>
    <!--登陆框-->
    <div id="loginBox">
      <!--头像框-->
      <div id="avaterBox">
        <img src="/logo.png" />
      </div>
      <h3 align="center">告诉我你是谁好吗</h3>
      <!--表单-->
      <div id="loginForm">
        <el-form ref="loginFormRef" status-icon :model="userLoginForm" :rules="userLoginFormRules">
          <el-form-item label="用户名" label-width="70px" prop="username">
            <el-input v-model="userLoginForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="70px" prop="password">
            <el-input v-model="userLoginForm.password" type="password" clearable></el-input>
          </el-form-item>
          <el-form-item class="form_btns">
            <div :style="{margin: '0px 0px 0px auto'}">
              <el-button type="primary">起飞</el-button>
              <el-button type="info" @click="resetForm()">诶，还没飞呢</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>



<style scoped>
#appContainer {
  background-size: cover;
  background-image: url("@/assets/background_img.jpg") ;
  background-attachment: scroll;
  background-repeat: no-repeat;
  height: 500px;
  justify-content: center;
  align-items: center;
}
#imgCopyright {
  position: absolute;
  left: 50%;
  top: 95%;
  transform: translate(-50%, 0%);
  background-color: white;
  opacity: 70%;
  border-radius: 3px;
}
#loginBox {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  /* opacity: 93%; */
}
#loginBox h3{
  position: absolute;
  color: black;
  left: 50%;
  top: 23%;
  transform: translate(-50%, -50%);
}
#avaterBox {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
#avaterBox img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#loginForm {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.form_btns {
  justify-content: flex-end;
}
.form_btns .el-form-item__content{
  justify-content: flex-end;
}

</style>