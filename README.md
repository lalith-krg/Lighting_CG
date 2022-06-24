# ThreeJS & Webpack Starter ![Node v12.10.0](https://img.shields.io/badge/node-v12.10.0-brightgreen.svg?logo=node.js)

I got tired of the amount of overhead involved in getting a modular THREE.js project up-and-running. This repo is intended to solve some of those problems. I'll keep iterating -- I'd like to include the minimal amount of boilerplate required to stop repeating myself for EVERY project but also be completely unopinionated.

## 🎉 Getting Started

### Prerequisites

Make sure you have Node and NPM installed.

- Node `v12.10.0` (_You can quickly switch to the correct version with `nvm use` if you have it installed._)
- NPM `>6.10.3`

### Development

Out-of-the-box, things are pretty simple:

1. 📦 **Install dependencies.** I use `ci` instead of `i`/`install` to avoid versioning discrepancies but live your life.

   ```bash
   npm ci
   ```

2. 🏗 **Build project.** This will just do all the bundling without starting a dev server.

   ```bash
   npm run build
   ```

3. 🛠 **Build and run development server.** This command will start a development server which watches for changes and auto-reloads at `localhost:9000`.

   ```bash
   npm start
   ```
#

## Key Bindings

### Object Transformation

`m` : Enter/Exit object transform mode.

`2` : Deselect object. &nbsp;&nbsp;&nbsp;&nbsp; `3` : Select Teapot. &nbsp;&nbsp;&nbsp;&nbsp; `4` : Select Sphere.

*Move Selected Object in:-*

`t` : +ve x direction. &nbsp;&nbsp;&nbsp;&nbsp; `y` : -ve x direction.

`u` : +ve y direction. &nbsp;&nbsp;&nbsp;&nbsp; `i` : -ve y direction.

`o` : +ve z direction. &nbsp;&nbsp;&nbsp;&nbsp; `p` : -ve z direction.

`+` : Scale up selected object. &nbsp;&nbsp;&nbsp;&nbsp; `-` : Scale down selected object.

Use mouse to rotate selected object.

### Illumination

`l` : Enter/Exit illuminator mode (control lights).

`0` : Turn off light of selected object. &nbsp;&nbsp;&nbsp;&nbsp; `1` : Turn on light of selected object.

*Moving Selected Light in:-*

`z` : +ve x direction. &nbsp;&nbsp;&nbsp;&nbsp; `x` : -ve x direction.

`c` : +ve y direction. &nbsp;&nbsp;&nbsp;&nbsp; `v` : -ve y direction.

`b` : +ve z direction. &nbsp;&nbsp;&nbsp;&nbsp; `n` : -ve z direction.


**Note:** The lights do not move more than 1.25 times the bounding box of the object.

### Shading

`s` : Change shading model of selected object (Phong and Gouraud).

### Camera

`a` : Enable/Disable camera movement

*Moving Camera in:-*

`[` or `{` : +ve x direction. &nbsp;&nbsp;&nbsp;&nbsp; `]` or `}` : -ve x direction.

`;` or `:` : +ve y direction. &nbsp;&nbsp;&nbsp;&nbsp; `'` or `"` : -ve y direction.

`,` or `<` : +ve z direction. &nbsp;&nbsp;&nbsp;&nbsp; `.` or `>` : -ve z direction.
