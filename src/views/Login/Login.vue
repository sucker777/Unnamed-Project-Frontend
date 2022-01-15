<template>
<div class="fit row flex-center column absolute-full">
  <div style="width: 300px" class="q-gutter-sm">
    <div class="text-opacity text-center">
      <q-icon size="60px" name="account_circle"></q-icon>
      <div class="text-opacity text-h5">登入至集思廣益</div>
    </div>
    <div>
      <q-form @submit="login">
        <q-input
          no-error-icon
          :rules="[(val) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(val) || '必須是正確的電子郵件地址']"
          v-model="email"
          label="電子郵件"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          no-error-icon
          :rules="[(val) => val.length >= 8 || '密碼長度必須大於8位']"
          :type="pwdIsVisible ? 'text': 'password'"
          v-model="password"
          label="密碼"
        >
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
          <template v-slot:append>
            <q-icon :name="pwdIsVisible ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="pwdIsVisible = !pwdIsVisible" />
          </template>
        </q-input>
        <div class="row" style="margin-top: .5rem;">
          <q-btn rounded flat :to="{ name: 'Home' }">註冊</q-btn>
          <q-space />
          <q-btn rounded flat disable :to="{ name: 'Reset' }">忘記密碼</q-btn>
        </div>
        <q-btn :loading="loading" color="primary" style="height: 50px; margin-top: .5rem;" class="full-width" type="submit">
          登入
          <q-icon right size="24px" name="login" />
        </q-btn>
      </q-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      pwdIsVisible: false,
      loading: false
    }
  },

  methods: {
    login() {

    }
  }
}
</script>