<!--Shamelessly stolen from tiptap.dev/examples-->
<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <ToolbarItem class="toolbar-button" v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script>
import ToolbarItem from "./ToolbarItem.vue"
export default {
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  components: {
        ToolbarItem,
  },
  methods: {
    getScrollTop() {
      if (typeof window.pageYOffset !== "undefined" ) {
        // Most browsers
        return this.scrollDist = window.scrollY;
      }
    
      var d = document.documentElement;
      if (typeof d.clientHeight !== "undefined") {
        // IE in standards mode
        return this.scrollDist = d.scrollTop;
      }
    
      // IE in quirks mode
      return this.scrollDist = document.body.scrollTop;
    }
  },
  mounted() {
    var that = this
    window.onscroll = function() {
      that.getScrollTop();
      var scroll = that.scrollDist;

      if (scroll <= 0) {
        that.$el.style.top = "0px";
      } else {
        that.$el.style.top = (scroll + 2) + "px";
      }
    };
  },

  data() {
    return {
      items: [
        {
          icon: 'Bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'Italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'Strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike'),
        },
        // {
        //   icon: 'Code-block', //<a href="https://www.flaticon.com/free-icons/coding" title="coding icons">Coding icons created by Kiranshastry - Flaticon</a>
        //   title: 'Code',
        //   action: () => this.editor.chain().focus().toggleCode().run(),
        //   isActive: () => this.editor.isActive('code'),
        // },
        {
          type: 'divider',
        },
        // {
        //   icon: 'Header-1', //<a href="https://www.flaticon.com/free-icons/heading" title="heading icons">Heading icons created by Icon Hubs - Flaticon</a>
        //   title: 'Heading 1',
        //   action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        //   isActive: () => this.editor.isActive('heading', { level: 1 }),
        // },
        {
          icon: 'Header-2', //<a href="https://www.flaticon.com/free-icons/heading" title="heading icons">Heading icons created by IconKanan - Flaticon</a>
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 }),
        },
        {
          icon: 'List-unordered', //<a href="https://www.flaticon.com/free-icons/list" title="list icons">List icons created by Chanut - Flaticon</a>
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'List-ordered', //<a href="https://www.flaticon.com/free-icons/number" title="number icons">Number icons created by Freepik - Flaticon</a>
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },
        {
          icon: 'Code-block', //<a href="https://www.flaticon.com/free-icons/coding" title="coding icons">Coding icons created by Kiranshastry - Flaticon</a>
          title: 'Code Block',
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive('codeBlock'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'Horizontal-rule', //<a href="https://www.flaticon.com/free-icons/minus" title="minus icons">Minus icons created by Becris - Flaticon</a>
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: 'divider',
        },
        {
          type: 'divider',
        },
        {
          icon: 'Arrow-left', //<a href="https://www.flaticon.com/free-icons/undo" title="undo icons">Undo icons created by Freepik - Flaticon</a>
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'Arrow-right', //<a href="https://www.flaticon.com/free-icons/undo" title="undo icons">Undo icons created by Freepik - Flaticon</a>
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run(),
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
  #edit-toolbar {
    width: $edit-area-toolbar-width;
    height: fit-content;
    position: relative;
    .toolbar-button img {
      filter: brightness(0)
    }
  }
</style>