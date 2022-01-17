<template>
<div class="fit row flex-center column absolute-full">
  <div style="width: 300px" class="q-gutter-sm">
    <div class="text-opacity text-center">
      <q-icon size="60px" name="account_circle"></q-icon>
      <div class="text-opacity text-h5">加入集思廣益</div>
    </div>
    <div>
      <q-form @submit="_register"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <q-input
          no-error-icon
          :rules="[(val) => /^[a-zA-Z\d]+$/i.test(val) || '只能使用英文和數字']"
          v-model="username"
          label="使用者名稱"
        >
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
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
        <q-input
          no-error-icon
          :rules="[(val) => val == password || '且兩次輸入的密碼需要一致']"
          :type="pwdIsVisible ? 'text': 'password'"
          v-model="passwordConfirm"
          label="確認密碼"
        >
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
          <template v-slot:append>
            <q-icon :name="pwdIsVisible ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="pwdIsVisible = !pwdIsVisible" />
          </template>
        </q-input>
        <div class="row" style="margin-top: .5rem;">
          <q-checkbox size="xs" v-model="agreement" label="我已同意用戶協議和隱私權政策" />
        </div>
        <q-btn :disable="loading" :loading="loading" color="primary" style="height: 50px; margin-top: .5rem;" class="full-width" type="submit">
          註冊
          <q-icon right size="24px" name="group_add" />
        </q-btn>
      </q-form>
    </div>
  </div>
</div>
</template>

<script>
import { register } from '@/services/user'  
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'

export default {
  name: 'Login',
  
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    return {
      router,
      appStore
    }
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      agreement: false,
      pwdIsVisible: false,
      loading: false
    }
  },

  methods: {
    async _register() {
      if(!this.agreement) {
        Notify.create({
          type: 'negative',
          message: '需要同意用戶協議和隱私權政策'
        })
        return false
      }
      this.loading = true;
      let [code, token] = await register(this.email, this.password, this.username)
      if (code == 200) {
        Notify.create({
          type: 'positive',
          message: '註冊成功'
        })
        localStorage.token = token
        this.appStore.authenticated = true
        this.appStore.needRefresh = true
        this.appStore.name = this.name
        this.router.push({ name: 'Home' })
      }else {
        let errorMessage = {
          '100': '偵測到錯誤的資料',
          '101': '偵測到錯誤的電子郵件格式',
          '102': '偵測到錯誤的密碼格式',
          '103': '偵測到錯誤的使用者名稱格式',
          '104': '此電子郵件已註冊過',
          '500': '內部伺服器錯誤'
        }
        Notify.create({
          type: 'negative',
          message: errorMessage[code]
        })
      }
      this.loading = false
    }
  }
}
</script>