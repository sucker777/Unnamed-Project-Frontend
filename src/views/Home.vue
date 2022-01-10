<template>
  <q-page padding>
    <div class="row justify-center">
      <q-grid x-gap="12" y-gap="8" cols="2" sm="1" xs="1">
        <q-grid-item class="">
          <q-card>
            <q-card-section>
              <div class="row flex-center">
                <div class="text-h6">更新日志</div>
                <q-space />
                <div class="text-subtitle2">更多</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>日志1</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> 日志2 </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> 日志3 </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> 日志4 </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> 日志5 </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-grid-item>
      </q-grid>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Home'
}
</script>
