<!--suppress HtmlUnknownTag, HtmlDeprecatedTag -->
<template>
  <main class="page">
    <div class="narrator-container">
      <Content class="theme-default-content" />
      <div class="narrator-scene-box">
        <div class="narrator-scene">
          <Content slot-key="narrator-scene" />
        </div>
      </div>
    </div>

    <footer class="page-edit">
      <div
        v-if="editLink"
        class="edit-link"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink />
      </div>

      <div
        v-if="lastUpdated"
        class="last-updated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div
      v-if="prev || next"
      class="page-nav"
    >
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
// noinspection NpmUsedModulesInstalled
import DefaultPage from '@parent-theme/components/Page'

export const narratorPage = Symbol('narratorPage')

export default {
  name: 'Page',
  extends: DefaultPage,
  provide () {
    return {
      [narratorPage]: this
    }
  }
}

</script>

<style scoped>
  .theme-default-content {
    margin: 0;
  }
  .page-edit, .page-nav {
    margin: 0;
  }

  .narrator-container {
    display: flex;
  }

  .narrator-scene-box {
    flex-grow: 1;
    position: relative;
    max-width: 740px;
  }

  .narrator-scene {
    top: 3.5em;
    position: sticky;
    padding: 2em;
  }
</style>
