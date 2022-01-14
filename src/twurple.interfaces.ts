'use strict'

import { AuthProvider } from '@twurple/auth'
import { ModuleMetadata, Type } from '@nestjs/common'

export interface TwurpleModuleOptions {
  config: TwurpleOptions
}

export interface TwurpleOptions {
  secretKey: string
  authProvider: AuthProvider
}

export interface TwurpleModuleOptionsFactory {
  createTwurpleModuleOptions(): Promise<TwurpleModuleOptions> | TwurpleModuleOptions
}

export interface TwurpleModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<TwurpleModuleOptionsFactory>
  useExisting?: Type<TwurpleModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<TwurpleModuleOptions> | TwurpleModuleOptions
}
