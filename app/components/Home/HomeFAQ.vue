<script lang="ts" setup>
const items = [{
  label: 'What is Orion?',
  content: 'Orion is a community-driven collection of templates for your next project, from landing pages to complete web applications. It means that it is a website where you can find starter or themes built by Nuxt users for other Nuxt users.',
}, {
  label: 'How does it work?',
  content: 'As a user, you can browse the templates, filter them by categories, modules, and pricing, and then you can see the details of the template. Once you find a template that you like, you can easily access to it using the access link.',
}, {
  label: 'How can I submit a template?',
  content: 'To submit a template, you need to have a GitHub account. Once you have it, you can click on the "Submit a template" button to create an account. You\'ll be able to create a new template using a form and then submit it to review. Your template will be examined by the Orion team and then published if it meets the requirements.',
}, {
  label: 'Is Orion free?',
  content: 'Yes, Orion is free to use, for both the users and the creators. It\'s a project by the community for the community. You can support the project by sharing it with your friends, by submitting a template or by <a href="https://github.com/sponsors/Barbapapazes" target="_blank">sponsoring the project on GitHub.</a>',
}, {
  label: 'How can I contact the team?',
  content: 'You can contact the team by sending an email to orion@barbapapazes.dev or using the social media links in the footer.',
}]
</script>

<template>
  <ULandingSection>
    <ULandingFAQ
      :ui="{ wrapper: 'max-w-screen-lg mx-auto' }"
      :items="items"
      multiple
    >
      <template #item="{ item }">
        <div
          class="prose dark:prose-invert max-w-none"
          v-html="item.content"
        />
      </template>
    </ULandingFAQ>
  </ULandingSection>
</template>
