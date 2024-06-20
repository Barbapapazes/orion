export default defineAppConfig({
  ui: {
    button: {
      default: {
        loadingIcon: 'i-ph-arrows-clockwise-duotone',
      },
    },
    input: {
      default: {
        loadingIcon: 'i-ph-arrows-clockwise-duotone',
      },
    },
    select: {
      default: {
        loadingIcon: 'i-ph-arrows-clockwise-duotone',
        trailingIcon: 'i-ph-caret-down',
      },
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-ph-check',
      },
    },
    notification: {
      default: {
        closeButton: {
          icon: 'i-ph-x',
        },
      },
    },
    commandPalette: {
      default: {
        icon: 'i-ph-magnifying-glass-duotone',
        loadingIcon: 'i-ph-arrows-clockwise-duotone',
        selectedIcon: 'i-ph-check',
        emptyState: {
          icon: 'i-ph-magnifying-glass-duotone',
        },
      },
    },
    table: {
      default: {
        sortAscIcon: 'i-ph-sort-descending',
        sortDescIcon: 'i-ph-sort-ascending',
        sortButton: {
          icon: 'i-ph-arrows-down-up',
        },
        loadingState: {
          icon: 'i-ph-arrows-clockwise-duotone',
        },
        emptyState: {
          icon: 'i-ph-database-duotone',
        },
      },
    },
    pagination: {
      default: {
        firstButton: {
          icon: 'i-ph-caret-left',
        },
        prevButton: {
          icon: 'i-ph-arrow-left',
        },
        nextButton: {
          icon: 'i-ph-arrow-right',
        },
        lastButton: {
          icon: 'i-ph-caret-right',
        },
      },
    },
    accordion: {
      default: {
        openIcon: 'i-ph-caret-down',
      },
    },
    breadcrumb: {
      default: {
        divider: 'i-ph-caret-right',
      },
    },
  },
  socials: [{
    title: 'X',
    icon: 'i-simple-icons-x',
    to: 'https://x.soubiran.dev',
    target: '_blank',
  }, {
    title: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://gh.soubiran.dev',
    target: '_blank',
  }],
})
