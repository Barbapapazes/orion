<script lang="ts" setup>
const appConfig = useAppConfig()
const socials = appConfig.socials
</script>

<template>
  <UContainer>
    <footer
      class="py-24 grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-24"
    >
      <div class="flex flex-col justify-center items-center text-center lg:text-left lg:justify-start lg:items-start gap-2">
        <p class="font-bold">
          Orion
        </p>
        <p class="italic opacity-60 text-sm max-w-sm">
          <em>
            Discover, search, find and learn from a collection of templates built by the Nuxt community for the Nuxt ecosystem.
          </em>
        </p>
      </div>
      <div class="flex flex-col justify-center items-center lg:items-end lg:justify-start gap-2">
        <div class="flex flex-row gap-.5">
          <UButton
            v-for="social in socials"
            :key="social.title"
            v-bind="social"
            square
            variant="ghost"
            color="gray"
          />
        </div>
        <p class="italic text-sm opacity-60 text-center  lg:text-right">
          Built by <a
            href="https://soubiran.dev"
            target="_blank"
          >Estéban "Barbapapazes"</a>
          <br>
          <a
            href="https://github.com/sponsors/Barbapapazes"
            target="_blank"
          >Support the projet</a>
        </p>
      </div>
      <div class="lg:col-span-2 lg:row-start-2 text-center text-xs opacity-60">
        Orion © 2024 by Estéban Soubiran is licensed under CC BY-NC-SA 4.0. <br> Templates are the property of their respective owners.
      </div>
    </footer>
  </UContainer>
</template>
