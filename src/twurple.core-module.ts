'use strict'

import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TwurpleModuleAsyncOptions, TwurpleModuleOptions, TwurpleModuleOptionsFactory } from './twurple.interfaces'
import { createTwurpleConnection, getTwurpleConnectionToken, getTwurpleOptionsToken } from './twurple.utils'

// noinspection JSUnusedGlobalSymbols
@Global()
@Module({})
export class TwurpleCoreModule {
  public static forRoot(options: TwurpleModuleOptions, connection?: string): DynamicModule {
    const twurpleOptionsProvider: Provider = {
      provide: getTwurpleOptionsToken(connection),
      useValue: options,
    }

    const twurpleConnectionProvider: Provider = {
      provide: getTwurpleConnectionToken(connection),
      useValue: createTwurpleConnection(options),
    }

    return {
      module: TwurpleCoreModule,
      providers: [
        twurpleOptionsProvider,
        twurpleConnectionProvider,
      ],
      exports: [
        twurpleOptionsProvider,
        twurpleConnectionProvider,
      ],
    }
  }

  public static forRootAsync(options: TwurpleModuleAsyncOptions, connection: string): DynamicModule {
    const twurpleConnectionProvider: Provider = {
      provide: getTwurpleConnectionToken(connection),
      useFactory(options: TwurpleModuleOptions) {
        return createTwurpleConnection(options)
      },
      inject: [getTwurpleOptionsToken(connection)],
    }

    return {
      module: TwurpleCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), twurpleConnectionProvider],
      exports: [twurpleConnectionProvider],
    }
  }

  public static createAsyncProviders(options: TwurpleModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection),
      ]
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ]
  }

  public static createAsyncOptionsProvider(options: TwurpleModuleAsyncOptions, connection?: string): Provider {

    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: getTwurpleOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getTwurpleOptionsToken(connection),
      async useFactory(optionsFactory: TwurpleModuleOptionsFactory): Promise<TwurpleModuleOptions> {
        // noinspection ES6RedundantAwait
        return await optionsFactory.createTwurpleModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
