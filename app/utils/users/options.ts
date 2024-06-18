import type { SelectMenuOption, UserRoleType } from '~/types'

interface userRoleTypeOption extends SelectMenuOption {
  value: UserRoleType
  label: string
}

/**
 * Options for the role type of a user
 */
export const userRoleTypeOptions: userRoleTypeOption[] = [{
  value: 'admin',
  label: 'Admin',
}, {
  value: 'banned',
  label: 'Banned',
}, {
  value: 'creator',
  label: 'Creator',
}]
