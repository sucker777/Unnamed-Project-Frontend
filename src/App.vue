<template>
  <q-layout view="hhh lpR lFr">
    <q-header elevated class="bg-teal-10">
      <q-toolbar>
        <div
          class="row q-ml-xs cursor-pointer flex-center non-selectable"
          v-if="$q.screen.gt.xs"
          style="padding: 0 0 0 12px"
        >
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
          />
      
          <q-toolbar-title>
            <router-link :to="{ name: 'Home' }">集思廣益</router-link>
          </q-toolbar-title>
        </div>
        
        <q-input placeholder="搜尋" dark dense standout v-model="searchKey" class="q-ml-md" @keyup.enter="search">
          <template v-slot:prepend>
            <q-icon v-if="searchKey === ''" name="search" />
            <q-icon v-else name="close" class="cursor-pointer" @click="searchKey = ''" />
          </template>
        </q-input>
        
        <q-space />

        <q-avatar size="36px" ref="avatar" class="cursor-pointer"
          @mouseover="avatarMenuOver = true"
          @mouseout="avatarMenuOver = false"
          @click="!avatarMenuOver"
        >
          <q-icon size="36px" name="account_circle"></q-icon>

          <q-menu :offset="[-30, 5]" anchor="bottom left" self="top right" v-model="avatarMenu" :no-parent-event="true"
            @mouseover="avatarListOver = true"
            @mouseout="avatarListOver = false"
          >
            <q-list v-if="authenticated">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <!-- <img :src="user.Avatar" alt="avatar" /> -->
                    <q-icon size="36px" name="account_circle"></q-icon>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div>{{ name }}</div>
                  <!-- <div class="text-caption text-opacity">{{ user['Role'].Name }}</div> -->
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-ripple>
                <q-item-section>收藏的文章</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'Setting' }">
                <q-item-section>帳號設定</q-item-section>
              </q-item>
              <q-item>
                <q-btn @click="logout" color="red" class="full-width flex-center row">
                  <q-icon size="18px" left name="logout" />
                  <span>登出</span>
                </q-btn>
              </q-item>
            </q-list>

            <div v-else class="q-pa-sm">
              <div class="row q-col-gutter-sm">
                <div>
                  <router-link :to="{ name: 'Login' }">
                    <q-btn color="primary">登入</q-btn>
                  </router-link>
                </div>
                <div>
                  <router-link :to="{ name: 'Register' }">
                    <q-btn color="accent">註冊</q-btn>
                  </router-link>
                </div>
              </div>
            </div>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      show-if-above
      elevated
      class="bg-grey-9"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              v-ripple
              :to="(menuItem.disabled ?? true) && menuItem.route ? { name: menuItem.route, params: menuItem.params } : null"
            >
              <q-item-section avatar class="text-white">
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section class="text-white">
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-10">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useQuasar, debounce, Notify } from 'quasar'
import { retriveUserInfo } from '@/services/user'
import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const menuList = [
  {
    icon: 'home',
    label: '首頁',
    separator: true,
    route: 'Home'
  },
  {
    icon: 'list',
    label: '我的討論板',
    separator: true
  },
  {
    icon: 'info',
    label: '關於此網站',
    separator: false
  }
]

export default {
  name: 'Layout',
  
  setup () {
    const $q = useQuasar()
    $q.dark.set(true)
    const appStore = useAppStore()
    const router = useRouter()
    return {
      miniState: ref(true),
      leftDrawerOpen: ref(false),
      menuList,
      appStore,
      router
    }
  },
  
  data() {
    return {
      searchKey: '',
      avatarMenu: false,
      avatarMenuOver: false,
      avatarListOver: false,
      authenticated: storeToRefs(this.appStore).authenticated,
      name: storeToRefs(this.appStore).name
    }
  },
  
  methods: {
    search() {
      this.$q.dialog({
        title: '提示',
        message: '目前搜尋功能暫不開放'
      })
      this.searchKey = ''
    },
    debounceFunc: debounce(function() { this.checkMenu() }, 150),
    checkMenu() {
      if (this.avatarMenuOver || this.avatarListOver) {
        this.avatarMenu = true
      }
      else {
        this.avatarMenu = false
      }
    },
    async checkToken() {
      const tokenreg = /^[\da-z]{128}$/ //eslint-disable-line
      const token = localStorage.token
      if(!tokenreg.test(token)) {
        localStorage.removeItem('token')
        return false
      }
      let [code, name] = await retriveUserInfo(token)
      if(code == 200) {
        this.appStore.authenticated = true
        this.appStore.name = name
        if(this.router.currentRoute.value.name == 'Login' || this.router.currentRoute.value.name == 'Register') {
          this.router.push({ name: 'Home' })
        }
      }else {
        let errorMessage = {
          '100': '偵測到錯誤的登入憑證，已自動登出',
          '400': '登入憑證有誤或已失效，已自動登出',
          '500': '內部伺服器錯誤'
        }
        Notify.create({
          type: 'negative',
          message: errorMessage[code]
        })
      }
    },
    logout() {
      this.$q.dialog({
        title: '確認登出',
        message: '你真的要登出嗎?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.appStore.authenticated = false
        this.appStore.name = ''
        localStorage.removeItem('token')
        Notify.create({
          type: 'positive',
          message: '登出成功'
        })
      })
    }
  },
  
  async created() {
    await this.checkToken()
  },

  watch: {
    async $route(to, from) {
      if((from.name == 'Login' || from.name == 'Register') && this.appStore.needRefresh) await this.checkToken()
    },
    avatarMenuOver() {
      this.debounceFunc()
    },
    avatarListOver() {
      this.debounceFunc()
    }
  }
}
</script>

<style lang="sass">
body 
  user-select: none
a
  text-decoration: none
  color: inherit
a:-webkit-any-link
  color: inherit
</style>
