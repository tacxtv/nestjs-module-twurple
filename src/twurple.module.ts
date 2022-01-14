'use strict'

import { DynamicModule, Module } from '@nestjs/common'
import { TwurpleModuleAsyncOptions, TwurpleModuleOptions } from './twurple.interfaces'
import { TwurpleCoreModule } from './twurple.core-module'

// noinspection JSUnusedGlobalSymbols
@Module({})
export class TwurpleModule {
  public static forRoot(options: TwurpleModuleOptions, connection?: string): DynamicModule {
    return {
      module: TwurpleModule,
      imports: [TwurpleCoreModule.forRoot(options, connection)],
      exports: [TwurpleCoreModule],
    }
  }

  public static forRootAsync(options: TwurpleModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: TwurpleModule,
      imports: [TwurpleCoreModule.forRootAsync(options, connection)],
      exports: [TwurpleCoreModule],
    }
  }
}
