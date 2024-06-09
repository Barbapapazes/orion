import type { BouncerAbility } from '../../src/types'
import { allows as _allows } from '../../src/allows'
import { useUserSession } from '#imports'

/**
 * Client side utility to check if a user can perform an action.
 */
export function allows<T>(bouncerAbility: BouncerAbility<T>, data?: T): boolean {
  const { user } = useUserSession()

  return _allows(bouncerAbility, user.value, data)
}

/**
 * Client side utility to check if a user cannot perform an action.
 */
export function denies<T>(bouncerAbility: BouncerAbility<T>, data?: T): boolean {
  return !allows(bouncerAbility, data)
}
