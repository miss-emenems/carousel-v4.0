## Carousel - Documentation

### About feature

JavaScript feature to showcase different type of data for items provided in attached APIs. User can flick through slides as well as read detailed description and view enlarged picture of an item.


### Contents
- [Installation](#markdown-header-installation)
- [Architecture](#markdown-header-architecture)
- [Launch](#markdown-header-launch-application)


### Installation

To run application please [run gulp](#markdown-header-launch-application), but first install npm and all gulp dependencies in following steps:

* navigate to app directory:
```bash
cd path/to/your/directory/carousel-v3.0
```
* install npm
```bash
npm install
```

* install gulp package globally
```bash
npm install gulp -g
```

* install gulp in app directory
```bash
npm install gulp --dev-save
```

* install gulp-sass
```bash
npm install gulp-sass --dev-save
```

* install gulp-browser-sync
```bash
npm install gulp-browser-sync --dev-save
```

### Launch application
To launch application run command:
```bash
gulp watch
```

### Architecture

#### Languages
Application is build with:

- HTML5
- CSS3
- JavaScript (with features from ES6)

#### BEM
BEM is used as naming convention for classes.

#### Layout
Combination of Css Grid and Flexbox was used to create layout for this application.
