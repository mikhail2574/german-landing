# Feature Flags

Настройки находятся в `app/config/growth.ts` и управляются через `NEXT_PUBLIC_*` переменные.

## Переменные

- `NEXT_PUBLIC_ENABLE_HERO_AB_TEST`
  - `1`: включить A/B hero (варианты `a` и `b`)
  - `0`: выключить тест и всегда использовать вариант `a`

- `NEXT_PUBLIC_DEFAULT_HERO_VARIANT`
  - `a` или `b`
  - используется, если в URL нет `?hero=a|b`

- `NEXT_PUBLIC_ENABLE_BLOG_TEASER`
  - `1`: показывать блог-блок на главной
  - `0`: скрыть блог-блок на главной (сам блог `/blog` остается)

- `NEXT_PUBLIC_ENABLE_TESTIMONIALS`
  - `1`: разрешить вывод блока отзывов (только при наличии подтвержденных данных)
  - `0`: скрыть отзывы на главной

- `NEXT_PUBLIC_ENABLE_WAITLIST`
  - legacy-флаг для сценариев расширения линейки

- `NEXT_PUBLIC_ENABLE_REVIEW_INTAKE`
  - legacy-флаг для ручного intake отзывов

## Быстрое переключение A/B

- Вариант A: `/?hero=a`
- Вариант B: `/?hero=b`

При включенном A/B `hero` также подставляется в URL автоматически и логируется в событиях аналитики.
