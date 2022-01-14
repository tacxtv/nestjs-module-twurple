# NestJS module Twurple

```ts
TwurpleModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    config: config.get<TwurpleOptions>('twurple.options'),
  }),
})
```
