<template>
  <div :style="styleObj">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'QGrid',
  props: {
    // 橫向間隔
    xGap: {
      type: [Number, String],
      default: 0
    },
    // 縱向間隔
    yGap: {
      type: [Number, String],
      default: 0
    },
    // 默認一行的列數
    cols: {
      type: [Number, String],
      default: 24
    },
    // 很小
    xs: {
      type: [Number, String]
    },
    // 小的
    sm: {
      type: [Number, String]
    },
    // 中等
    md: {
      type: [Number, String]
    },
    // 大的
    lg: {
      type: [Number, String]
    },
    // 很大
    xl: {
      type: [Number, String]
    }
  },
  setup(props) {
    const $q = useQuasar()
    const cols = computed(() => {
      let col = undefined
      if ($q.screen.xs) col = props.xs
      else if ($q.screen.sm) col = props.sm
      else if ($q.screen.md) col = props.md
      else if ($q.screen.lg) col = props.lg
      else if ($q.screen.xl) col = props.xl
      return col ?? props.cols
    })
    const styleObj = computed(() => ({
      width: '100%',
      display: 'grid',
      'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`,
      gap: `${props.yGap}px ${props.xGap}px`
    }))
    return {
      styleObj
    }
  }
})
</script>