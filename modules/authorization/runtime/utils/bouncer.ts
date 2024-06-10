import type { BouncerAbility } from '../../src/types'
import { allows as _allows } from '../../src/allows'

/**
 * Client side utility to check if a user can perform an action.
 */
export async function allows<T>(bouncerAbility: BouncerAbility<T>, data?: T): Promise<boolean> {
  const user = await useNuxtApp().$authorization.resolveClientUser()

  return _allows(bouncerAbility, user, data)
}

/**
 * Client side utility to check if a user cannot perform an action.
 */
export async function denies<T>(bouncerAbility: BouncerAbility<T>, data?: T): Promise<boolean> {
  return !allows(bouncerAbility, data)
}
