# Design system: implementation guide

How to build and restyle pages of `atende-web`. The source is the owner's
`DESIGN_SYSTEM.md` at the workspace root: Instrument Sans, coral, forest, a gray
canvas, the wordmark "atende." and an Apple-like minimalism. Tokens live in
`src/app/globals.css`. The home (`src/app/page.tsx`, `src/components/landing/*`)
is the reference implementation: when in doubt, copy what it does.

## Principles

1. **One idea per screen.** A section is a headline, one or two lines of body and
   one visual. If it needs a third paragraph, it is two sections or a table.
2. **The headline carries the message.** Lead with a concrete action ("reserva el
   turno"), keep body copy to two lines, and cut every sentence that hedges.
3. **No disclaimers.** No "Ejemplo ilustrativo" captions. Stay true instead: name
   the connection once ("Conectado a tu agenda") and never invent a capability, a
   customer, a number or a price. `npm run check:claims` must pass with no
   `claims-allow`.
4. **Coral is for the action and the finished task.** Everything else is ink, gray,
   white and forest.

## Tokens

| Token (class) | Value | Use |
| --- | --- | --- |
| `bg` (`bg-bg`) | `#f0f0f0` | Page canvas. Sections sit on it. |
| `surface` (`bg-surface`) | `#ffffff` | Cards, sheets, inputs. |
| `ink` (`text-ink`) | `#202020` | Text. Dark buttons. |
| `muted` (`text-muted`) | `#636363` | Body and secondary text. 5.3:1 on the canvas. |
| `faint` (`text-faint`) | `#868686` | The second tone of a heading, 24px or larger only. 3.2:1. |
| `line`, `line-strong` (`border-line`, `ring-line`) | ink at 10% and 16% | Hairlines. A plain `border` already uses `line`. |
| `forest`, `forest-deep`, `forest-tint` | `#0f3d2e`, `#0a2a20`, `#e2ebe7` | Deep panels; the business's chat bubbles; soft green fills. |
| `coral` | `#e6482c` | The dot, the done check, display type, glows. Never under or as small text. |
| `coral-fill` | `#d83d22` | Fill of the primary button. The only coral that carries small white text. |
| `coral-strong` | `#c9361c` | Small coral text and links on light. Button hover. |
| `coral-tint` | `#fdf0ec` | Soft coral fill, with `coral-strong` text on it. |

**Contrast rule.** `coral` on the canvas is 3.5:1 and white on `coral` is 3.9:1, so
both are for 24px text or larger (18.66px if bold) and for graphics. Small coral
text is `text-coral-strong`. Small white text sits on `coral-fill`, `forest` or
`ink`. On forest use `text-white` and `text-white/70`, and coral only at display
size. Never put body text on brand coral.

**Type.** Instrument Sans is the only typeface (`font-sans`, the default). Each
scale class sets size, line height, tracking and weight:

| Class | Size (fluid, 360px and up) | Use |
| --- | --- | --- |
| `text-display` | 38 to 88px, 600 | The home H1 only. |
| `text-headline` | 32 to 64px, 600 | Section H2. H1 of every other page. |
| `text-title` | 22 to 28px, 600 | Card and step titles (H3). |
| `text-lead` | 17 to 21px | The one paragraph under a heading, with `text-muted`. |
| `text-base`, `text-[0.9375rem]`, `text-sm` | 16, 15, 14px | Body, UI, notes. `leading-relaxed` for prose. |

Add `text-balance` to headings and `text-pretty` to leads. A two-tone heading is
two `block` spans, the second with `text-faint` (`text-white/60` on forest). No
uppercase, no tracked labels, no mono.

**Radii** (the scale is redefined): `rounded-md` 12px and `rounded-lg` 16px for
small controls, `rounded-2xl` 24px for bubbles and chips, `rounded-3xl` 32px for
cards, `rounded-4xl` 40px for big panels and tiles, `rounded-full` for buttons,
pills and icon buttons.

**Depth.** `shadow-card` for anything resting on the canvas, `shadow-float` for the
one raised object of a section, `shadow-cta` under the primary button only. A
hairline is `ring-1 ring-line` (or `ring-inset`). No borders thicker than 1px.

## Layout

- Container: `mx-auto max-w-7xl px-5 md:px-8`. Reading width: `max-w-3xl`.
- Sections are separated by space, never by rules or alternating bands:
  `pb-24 md:pb-36` on the home, `py-16 md:py-24` on denser content pages. Inside a
  section: heading, then `mt-8 md:mt-12` to the content.
- Forest panels are inset, not full bleed: `px-3 md:px-6` around
  `mx-auto max-w-[90rem] rounded-4xl bg-forest`. At most two per page.
- Build for 360px first, then 768 and 1440. Touch targets are 44px (`min-h-11`).
  Nothing may scroll sideways except a row that says so (`overflow-x-auto`).

## Patterns

**Page hero (secondary pages).** Breadcrumbs, then one header. No tag, no grid.

```tsx
<Breadcrumbs items={breadcrumbs} />
<section className="pb-16 pt-8 md:pb-24 md:pt-14">
  <div className="mx-auto max-w-7xl px-5 md:px-8">
    <SectionHeader
      level="h1"
      eyebrow="Precios"
      title={<><span className="block">¿Cuánto cuesta?</span> <span className="block text-faint">Mirá los planes.</span></>}
      sub="Una o dos líneas."
    />
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button href="/demo" size="lg">Pedí una demo</Button>
      <Button href="/precios" variant="outline" size="lg">Ver planes</Button>
    </div>
  </div>
</section>
```

**Section header.** `<SectionHeader title sub eyebrow? align? inverse? level? />`.
The eyebrow is one short phrase in `coral-strong`; most sections need none.

**Button.** `<Button href variant size>` renders an `<a>`. Variants: `primary`
(coral, one per view), `outline` (white, the second choice on light), `dark` (ink,
neutral), `glass` (the second choice on forest). Sizes: `md` 44px, `lg` 52px. No
arrows in labels. Text links: `font-semibold text-coral-strong underline-offset-4
hover:underline` with `min-h-11 inline-flex items-center`.

**Card.** `<Card>` or `rounded-3xl bg-surface shadow-card p-7 md:p-9`. Tiles with a
small scene on top: see `landing/Extras.tsx`. No border plus shadow together.

**Tag.** `<Tag>` (neutral), `<Tag filled>` (coral tint), `<Tag inverse>` (on
forest). A pill for a state or a category, never a section label.

**Chat.** `<ChatMockup messages result? caption? />`. The customer is on the left
in white, the business on the right in forest. End on the finished task with
`result={{ label: 'Turno reservado', detail: 'Conectado a tu agenda' }}`, which
renders a `<TaskTicket>`. Do not pass `caption`: remove the old "Ejemplo
ilustrativo" captions from the content files. Assistant lines are one to three
short lines, with no emojis or filler.

**Finished task.** `<TaskTicket label detail size="md|lg" tone="surface|glass" />`:
the coral check and what got done. Use it once per scene.

**CTA band.** `<CtaFinal context="…" demoSource? reassurance? />` closes every
page. It renders exactly one demo link and one WhatsApp link; the site audit counts
them, so do not add a second demo link inside it.

**FAQ.** `<Faq items={…} />`: one native `<details>` per item in a white
`rounded-4xl` card. It must stay the only `<details>` on the page. For a list
outside this component, copy its row: `summary` with `min-h-16`, the question in
`text-lg font-semibold`, a round plus that turns, the answer in `text-muted`.

**Tables.** Wrap in `overflow-x-auto rounded-3xl bg-surface shadow-card ring-1
ring-line`. Header cells: `text-sm font-semibold text-muted` on `bg-bg/60`. Rows:
`border-b border-line`, cells `px-4 py-3.5 sm:px-7`, first column `font-medium`.
Group rows carry a `size-2.5 rounded-full` dot (`bg-forest` included, `bg-coral` a
pedido). `ui/StatusTable.tsx` is the reference.

**Breadcrumbs.** `<Breadcrumbs items />` directly under the header. Keep its
`aria-label="Ruta de navegación"`.

**Forms.** Label: `text-sm font-semibold`. Field: `h-12 w-full rounded-xl
bg-surface px-4 text-base ring-1 ring-inset ring-line-strong
placeholder:text-muted`, and `py-3` instead of `h-12` for a textarea. Help:
`text-sm text-muted`. Error: `text-sm font-medium text-coral-strong`. The form
sits in a `rounded-4xl bg-surface shadow-card p-6 md:p-9` card, and submit is a
`primary` `lg` button, full width on phones.

**Header and footer** are global. The wordmark is `<Wordmark />` ("atende" in the
text color, the dot in coral). There is no "A" badge anywhere.

## Motion

- Motion explains the product: a message arrives, the task lands done. It is never
  decoration. Animate `transform` and `opacity` only.
- Hovers and presses: 200 to 300ms, `ease-smooth`. Buttons press with
  `active:scale-[0.97]`; cards lift with `hover:-translate-y-1 hover:shadow-float`.
- Sequences use the classes in `globals.css`: `.seq` (a step), `.seq-pop` (the done
  moment), `.seq-typing` (typing dots), `.seq-travel` (a dot along a line), each
  with an inline `--at` in milliseconds. The default state is the finished scene,
  so it is correct without JS and with reduced motion. A sequence plays once and
  ends in under five seconds.
- `.drift` slides a row with the scroll. Nothing loops forever. Anything that
  advances on its own needs a visible pause button (`landing/RubroShowcase.tsx`).
- The H1 never animates: it is the LCP. `prefers-reduced-motion` turns every
  animation off through the global rule; do not add `opacity-0` that only an
  animation undoes.
- Server components by default. A client component only for real interaction.

## Remove on sight

Every page moved to this system on 2026-11-23 and the legacy aliases were deleted
from `globals.css`, so these classes no longer render as intended. Never bring them
back; the table says what replaced each one:

| Legacy | Replace with |
| --- | --- |
| `shadow-[var(--shadow-brut*)]`, `shadow-[…ink…]`, any offset shadow | `shadow-card` or `shadow-float` |
| `border-2 border-ink`, `border-b-2 border-ink` between sections | no border, or `border-line`; separate sections with space |
| `font-mono … uppercase tracking-*` labels | an eyebrow (`text-sm font-semibold text-coral-strong`) or nothing |
| `font-display`, `font-body` | nothing: there is one typeface |
| `text-mute` | `text-muted` |
| `bg-mint*`, `bg-sky`, `bg-sun` | `bg-surface`, `bg-forest-tint` or `bg-coral-tint` |
| `bg-coral-soft` | `bg-coral-tint` |
| `bg-coral` behind text, `text-coral` under 24px | `bg-coral-fill` with white text, `text-coral-strong` |
| `text-coral` accent spans inside every heading | the two-tone heading with `text-faint` |
| `jitter`, `hero-grid`, `chat-step`, `ticket-land` | delete |
| hand-written sizes like `text-4xl md:text-6xl leading-[0.94] tracking-[-0.04em]` | `text-headline` / `text-title` |
| `rounded-md` or `rounded-lg` on cards | `rounded-3xl` |
| the "A" badge, "→" inside buttons | `<Wordmark />`, plain labels |
| "Ejemplo ilustrativo" captions and similar notes | delete, and keep the scene true |

## Checks before you finish

`npx tsc --noEmit`, `npm test`, `npm run check:claims`. One `<h1>` per page, a
`/demo` or WhatsApp link on every non-legal page, `data-cta` names unchanged,
WhatsApp links only through `buildWaLink`. Then look at the page at 360, 768 and
1440px, with and without reduced motion.
