<template>
  <!-- TODO: apply these class to every card using the app config. -->
  <UCard
    class="bg-gray-200 bg-opacity-20 dark:bg-opacity-20 dark:bg-gray-800"
    :ui="{ divide: 'divide-y-0', body: { base: 'prose prose-sm dark:prose-invert max-w-none' } }"
  >
    <h3>
      Guidelines
    </h3>
    <p>
      Before submitting your template, please make sure to take note:
    </p>
    <ul>
      <li>
        Your template must be original and not infringe on any copyright.
      </li>
      <li>
        All npm dependencies must be up-to-date and publicly available.
      </li>
      <li>
        Free and freemium templates must have code source available on a public repository.
      </li>
    </ul>
    <p>
      We carefully review each submission to ensure the quality of the templates available on our platform. You'll be notified by email once your template is approved or if changes are required.
    </p>
    <p>
      Looking for inspiration for the featured image?
    </p>
    <p>
      <UButton
        class="w-full justify-center"
        to=""
        variant="outline"
        target="_blank"
      >
        Discover Image Templates
      </UButton>
    </p>
  </UCard>
</template>
