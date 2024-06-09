import { type H3Event } from 'h3'
import type { BouncerAbility } from '../../../src/types'
import { allows as _allows } from '../../../src/allows'
import { getUserSession } from '#imports'

/**
 * Allows a user to perform an action based on their role and the data.
 */
export async function allows<T>(event: H3Event, bouncerAbility: BouncerAbility<T>, data?: T): Promise<boolean> {
  const { user } = await getUserSession(event)

  return _allows(bouncerAbility, user ?? null, data)
}

/**
 * Denies a user to perform an action based on their role and the data.
 */
export async function denies<T = undefined>(event: H3Event, ability: BouncerAbility<T>, data?: T): Promise<boolean> {
  return !(await allows(event, ability, data))
}

/**
 * Throws an error if the user is not allowed to perform an action.
 */
export async function authorize<T>(event: H3Event, ability: BouncerAbility<T>, data?: T): Promise<void> {
  if (await denies(event, ability, data)) {
    throw createError({
      statusCode: 403,
      message: 'You are not allowed to perform this action',
    })
  }
}
