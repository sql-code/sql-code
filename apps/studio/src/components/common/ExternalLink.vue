<template>
  <a @click.prevent.stop="click"><slot></slot></a>
</template>
<script>
import * as remote from '@electron/remote'

export default {
  props: ['href'],
  methods: {
    click() {
      remote.shell.openExternal(this.href)
    }
  }
}
</script>
