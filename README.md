# League of Bingo

## Contributing
**Requirements**
- Node.js (at least version 20)
- [pnpm](https://pnpm.io/installation)

**Install & Dev server**
- Clone project
- `pnpm i`
- `pnpm dev`

**Additional reading**
- [tailwind-css](https://tailwindcss.com/docs/installation)
- [svelte-kit](https://kit.svelte.dev/)

---

## Todos & Bugs

**Not started / Inprogress**
- [ ] A bunch of `any` types scattered around
- [ ] Replace favicon with something better
- [ ] Change page title
- [ ] Layout / styling issues
  - [ ] `WinningScreen` animation is off center
  - [ ] Entire board is not centered on the screen (avoid 100vh pls)
  - [ ]  `New board` button is completly unstyled. Add hover / focus state (also make sure its disabled while loading if your here)
- [ ] Add UI to control current game / additional flags
  - Currently the thought is to have the controls to the left of the board taking up 1/3 of the page while the board takes up the other 2/3's. Move the "New board" button to these controls as well.
  - This should probably include a refactor that breaks the board and controls into their own components to avoid bloat in the `+page.svelte` file.
 - [ ] (?) Investigate moveing the fetch logic to the server

**Done**
...
