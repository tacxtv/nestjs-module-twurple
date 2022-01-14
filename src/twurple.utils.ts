'use strict'

import {
  TWURPLE_MODULE_CONNECTION,
  TWURPLE_MODULE_CONNECTION_TOKEN,
  TWURPLE_MODULE_OPTIONS_TOKEN,
} from './twurple.constants'
import { TwurpleModuleOptions } from './twurple.interfaces'
import { ApiClient } from '@twurple/api'

export function getTwurpleOptionsToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_OPTIONS_TOKEN}`
}

export function getTwurpleConnectionToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_CONNECTION_TOKEN}`
}

export function createTwurpleConnection(options: TwurpleModuleOptions) {
  const { config } = options
  return new ApiClient({ authProvider: config.authProvider })
}
