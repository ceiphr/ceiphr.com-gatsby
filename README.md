# Gatsby Theme - Ceiphr

# ARCHIVED
This project is archived. [gatsby-ceiphr](https://github.com/ceiphr/gatsby-ceiphr) will be officially replacing this project. Running a headless Ghost CMS makes this site unprofitable. Operating a serverless version of this website hosted on Vercel will reduce costs. Feel free to clone this repo and use the site for your own projects.

A gatsby theme using a headless Ghost CMS hosted by DigitalOcean as the backend. This project is deployed on Netlify.

&nbsp;

![gatsby-theme-ceiphr](https://i.imgur.com/JYjfuUt.png)

&nbsp;

## Installing

```bash
# With Gatsby CLI
gatsby new gatsby-theme-ceiphr https://github.com/ceiphr/gatsby-theme-ceiphr.git
```

```bash
# From Source
git clone https://github.com/ceiphr/gatsby-theme-ceiphr.git
cd gatsby-theme-ceiphr
```

Then install dependencies

```bash
yarn
```

&nbsp;

## Running

Start the development server. You now have a Gatsby site pulling content from https://ghost.ceiphr.io.

```bash
gatsby develop
```

To change Ghost sources, change the `apiUrl` and `contentApiKey` in `.ghost.json` to target your server:

### Ghost >=2.10.0 <3.0.0

```json
{
  "development": {
    "apiUrl": "https://ghost.ceiphr.io",
    "contentApiKey": "d1210c1b85ba7b255530751d99"
  },
  "production": {
    "apiUrl": "https://ghost.ceiphr.io",
    "contentApiKey": "d1210c1b85ba7b255530751d99"
  }
}
```

&nbsp;

## Extra options

```bash
# Run a production build, locally
gatsby build

# Serve a production build, locally
gatsby serve
```

Gatsby `develop` uses the `development` config in `.ghost.json` - while Gatsby `build` uses the `production` config.

&nbsp;

## Credit

This repository is based off of the Ghost Foundation's [gatsby-starter-ghost](https://github.com/TryGhost/gatsby-starter-ghost)
template project; licensed under [MIT](https://github.com/TryGhost/gatsby-starter-ghost/blob/master/LICENSE).

&nbsp;

## Copyright & License

Copyright (c) 2016 - 2019 Ari Birnbaum (Ceiphr) - Released under the [GNU GENERAL PUBLIC LICENSE](LICENSE).
