'use strict'

import { Inject } from '@nestjs/common'
import { getTwurpleConnectionToken } from './twurple.utils'

// noinspection JSUnusedGlobalSymbols
export const InjectTwurple = (connection?: string) => {
  return Inject(getTwurpleConnectionToken(connection))
}
