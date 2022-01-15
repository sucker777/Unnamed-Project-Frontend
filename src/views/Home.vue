<template>
  <q-page padding>
    <div class="mx-auto">
      <q-grid x-gap="12" y-gap="8" cols="2" sm="1" xs="1">
        <q-grid-item>
          <q-card class="bg-black text-white">
            <q-card-section>
              <div class="row flex-center">
                <div class="text-h6">熱門討論</div>
                <q-space />
                <div class="text-subtitle2 cursor-pointer">更多</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>討論1</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論2</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論3</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論4</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論5</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-grid-item>

        <q-grid-item>
          <q-card class="bg-black text-white">
            <q-card-section>
              <div class="row flex-center">
                <div class="text-h6">熱門討論板</div>
                <q-space />
                <div class="text-subtitle2 cursor-pointer">更多</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-list separator>
              <q-item clickable v-ripple>
                <q-item-section>討論板1</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論板2</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論板3</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論板4</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>討論板5</q-item-section>
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
import { QGrid, QGridItem } from '@/plugins/quasar/components/'

export default {
  name: 'Home',

  components: {
    QGrid,
    QGridItem
  },
}
</script>
