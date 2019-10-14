<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onllyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归组件 侧边栏目录 -->
      <sidebar-item v-for="child in item.children" :key="child.path" class="nest-menu"
        :is-nest="true" :item="child" :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    item: { type: Object, required: true },
    isNest: { type: Boolean, default: false },
    basePath: { type: String, default: '' }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    // this.onlyOneChild = null
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      let tempChild = null
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // this.onlyOneChild = item
          tempChild = item
          return true
        }
      })
      this.onlyOneChild = tempChild

      // When there is only one child route, the child route will display by default.
      if (showingChildren.length === 1) return true

      // If there is no child route to display, then show the parent
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    /**
     * 拼接路径，返回完整的路由路径
     */
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }

      /**
       * path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径
       * 从后向前，若字符以 / 开头，不会拼接到前面的路径；
       * 若以 ../ 开头，拼接前面的路径，但是不含前面一节的最后一层路径；
       * 若以 ./ 开头 或者没有符号 则拼接前面路径；
       */
      return path.resolve(this.basePath, routePath)
    }
  }

}
</script>
