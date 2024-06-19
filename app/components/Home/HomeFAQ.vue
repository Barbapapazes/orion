<script lang="ts" setup>
const items = [{
  label: 'What is Orion?',
  content: 'Orion is a community-driven collection of templates for your next project, ranging from landing pages to complete web applications. It is a platform where you can find starter templates or themes created by Nuxt users for other Nuxt users.',
}, {
  label: 'How does it work?',
  content: 'As a user, you can browse the templates, filter them by categories, modules, and pricing, and view the template details. Once you find a template you like, you can easily access it using the provided access link.',
}, {
  label: 'What types of templates are available on Orion?',
  content: 'Orion offers a wide range of templates, including landing pages, dashboards, e-commerce sites, blogs, and more.',
}, {
  label: 'Can I customize the templates I find on Orion?',
  content: 'Yes, all templates available on Orion can be customized to fit your specific needs. You can modify the code and design elements to match your project\'s requirements.',
}, {
  label: 'How do I report an issue with a template?',
  content: 'If you encounter any issues with a template, you can report it by contacting the template author.',
}, {
  label: 'How can I submit a template?',
  content: 'To submit a template, you need a GitHub account. Once you have an account, click on the \'Submit a template\' button to create an account on Orion. You will be able to create a new template using a form and then submit it for review. Your template will be examined by the Orion team and published if it meets the requirements.',
}, {
  label: 'Are there any guidelines for submitting a template?',
  content: 'Yes, there are guidelines for submitting a template to ensure quality and consistency. These guidelines cover aspects such as code quality, documentation, and design standards. Detailed submission guidelines can be found on the \'Submit a template\' page.',
}, {
  label: 'Is Orion free?',
  content: 'Yes, Orion is free to use for both users and creators. It is a project by the community for the community. You can support the project by sharing it with your friends, submitting a template, or <a href="https://github.com/sponsors/Barbapapazes" target="_blank">sponsoring the project on GitHub</a>.',
}, {
  label: 'How can I contact the team?',
  content: 'You can contact the team by sending an email to orion@barbapapazes.dev or by using the social media links in the footer.',
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
