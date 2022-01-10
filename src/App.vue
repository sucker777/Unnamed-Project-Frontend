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
      
          <q-toolbar-title>集思廣益</q-toolbar-title>
        </div>
        
        <q-input placeholder="搜尋" dark dense standout v-model="searchKey" class="q-ml-md" @keyup.enter="search">
          <template v-slot:prepend>
            <q-icon v-if="searchKey === ''" name="search" />
            <q-icon v-else name="close" class="cursor-pointer" @click="searchKey = ''" />
          </template>
        </q-input>
        
        <q-space />

        <q-avatar size="36px" ref="avatar" clickable>
          <q-icon size="36px" name="account_circle"></q-icon>

          <q-menu :offset="[-30, 5]" anchor="bottom left" self="top right">
            <q-list v-if="user">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="user.Avatar" alt="avatar" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div>{{ user.UserName }}</div>
                  <div class="text-caption text-opacity">{{ user['Role'].Name }}</div>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-ripple>
                <q-item-section>帳號設定</q-item-section>
              </q-item>
              <q-item clickable v-ripple :to="{ name: 'Setting' }">
                <q-item-section>网站设置</q-item-section>
              </q-item>
              <q-item>
                <q-btn @click="logout" color="red" class="full-width flex-center row">
                  <q-icon size="18px" left :name="icon.mdiLogoutVariant" />
                  <span>退出登录</span>
                </q-btn>
              </q-item>
            </q-list>

            <div v-else class="q-pa-sm">
              <div class="row q-col-gutter-sm">
                <div>
                  <q-btn color="primary">登入</q-btn>
                </div>
                <div><q-btn color="primary">註冊</q-btn></div>
              </div>
            </div>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      class="bg-grey-9"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable v-ripple>
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
import { useQuasar } from 'quasar'

const menuList = [
  {
    icon: 'home',
    label: '首頁',
    separator: true
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
  
  data() {
    return {
      $q: useQuasar(),
      searchKey: ''
    }
  },
  
  methods: {
    search() {
      this.$q.dialog({
        title: '提示',
        message: '目前搜尋功能暫不開放'
      })
      this.searchKey = ''
    }
  },

  setup () {
    return {
      leftDrawerOpen: ref(false),
      menuList,
    }
  }
}
</script>
