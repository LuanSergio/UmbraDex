# UmbraDex

<h1 align="center">
  <a href="https://umbradex.vercel.app/">
    <img alt="UmbraDex" title="UmbraDex" src="/docs/logo.png" />
  </a>
</h1>

<p align="center">
  <strong>A Fan-made Pokédex using Next.js and [PokeAPI](https://pokeapi.co/). [Click here](https://umbradex.vercel.app/) for a live version preview.</strong>
</p>
<br>

<p align="center">
  <a href="#star2-features"><strong>Features</strong></a> |  
  <a href="#speech_balloon-about"><strong>About</strong></a> |  
  <a href="#art-layout"><strong>Layout</strong></a> |  
  <a href="#robot-technologies-and-tools"><strong>Technologies</strong></a> |  
  <a href="#man_technologist-running-locally"><strong>Running Locally</strong></a> |  
  <a href="#memo-license"><strong>License</strong></a>
</p>

<a href="https://umbradex.vercel.app/">
  <img src="/docs/icon.png" align="right" />
</a>

## :star2: Features:

- **Explore a complete list of Pokémon from the Pokémon franchise.**
- **Dedicated Page for Each Pokémon:** Access individual pages for every Pokémon to view detailed information about their stats, moves, and trivia.
- **Filters:** Easily filter Pokémon by type, generation, and name. You can combine filters to find specific Pokémon easily.
- **Sort:** Arrange Pokémon alphabetically or numerically, with the option to choose between descending or ascending order.
- **Random Pokémon:** Explore a randomly selected Pokémon with a single click.
- **Shiny Pokémon and Alternate Forms:** Check out the shiny versions and various forms of each Pokémon.
- **Animated Random Webdoor:** Experience a dynamic entry into the Pokédex with 10 animated heroes that change every time you load the page. Rumor says there are hidden secrets waiting to be unlocked by entering a famous code.

<div align="center">
  <img  src="/docs/division.png" />
</div>

## :speech_balloon: About:

<a href="https://umbradex.vercel.app/">
  <img src="/docs/layout-preview.png" />
</a>

### What is this project?

I'm a huge Pokémon fan, just like most of us '90s and early '20s kids. Upon discovering [PokeAPI](https://pokeapi.co/), an open-source Pokémon project containing a lot of Pokémon data in form of an API, I felt inspired to embark on this project. Originally, my goal was to amp up my skills in handling HTTP requests and simultaneously delve deeper into React and TypeScript. During the project development I decided to to revamp it, opting for GraphQL and Next.js to elevate it into a more robust and refined application.

<div align="center">
  <img  src="/docs/division.png" />
</div>

## :art: Layout:

I created the base layout and did all the SVG drawings for the project on Figma.
  
<img src="/docs/layout-figma.png" />
<img src="/docs/illustrations-figma.png" />

<div align="center">
  <img  src="/docs/division.png" />
</div>

## :robot: Technologies and Tools:

<p>Technologies:</p>

- [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [SWR](https://swr.vercel.app/)
- [Sass](https://sass-lang.com/)
- [nanoid](https://github.com/ai/nanoid)
- [Radix](https://radix-ui.com/) (used specifically for modals and tabs)
- [Recharts](https://recharts.org/)

<p>Developer utilities:</p>

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/) with conventional commits and [lint-staged](https://github.com/okonet/lint-staged)

<p>Tools:</p>

- [IconMoon](https://icomoon.io/) (utilized for Pokémon types icons, as SVGs were too large for repetitive use)
- [Figma](https://www.figma.com/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

<div align="center">
  <img  src="/docs/division.png" />
</div>

## :man_technologist: Running Locally

You must have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Node](https://nodejs.org/en/), and [Yarn](https://yarnpkg.com/) installed.

On your favorite terminal, run the following commands:

```bash
# Clone the repository
$ git clone git@github.com:LuanSergio/UmbraDex.git

# Navigate to the repository
$ cd UmbraDex

# Install dependencies
$ npm install

# Run the application locally
$ npm run dev

# Build the application for production
$ npm build
```

<div align="center">
<img  src="/docs/division.png" />
</div>

## :memo: License

This project is under the MIT license.
**[Click here for more information](/docs/LICENSE)**.