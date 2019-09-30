<template>
  <el-scrollbar ref="scrollContainer" :vertical="false"
    class="scroll-container" @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // spacing between tags
export default {
  name: 'ScrollPane',
  data () {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper () {
      //
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  methods: {
    handleScroll (e) {
      // 滚动
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    moveToTarget (currentTag) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$parent.$refs.tag
      let firstTag = null
      let lastTag = null
      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList.slice(-1)
      }
      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]
        // the tag's offsetLeft after of nextTag  下个Tag的尾部偏移
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing
        // the tag's offsetLeft before of prevTag  前一个Tag的首部偏移
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing
        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper - $containerWidth) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>
