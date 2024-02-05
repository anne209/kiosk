# Selbstbedienungskiosk


Im Rahmen unseres Seminars "Software-Projektseminar" haben wir ein Selbstbedienungskiosk programmiert.
Gestartet wird der Kiosk auf der Webseite /start. Ab da wird man weitergeleitet, bis man auf die Hauptseite des Shops kommt (/home), um dann im Kiosk Produkte kaufen zu können.

Besondere Features, die wir eingebaut haben, ist, dass man beim Einkaufen die Außentemperatur des jeweiligen Ortes sehen kann und so das passende Produkte zur jeweiligen Jahreszeit kaufen kann.

Neben dem besonderen Feature im Frontend gibt es auch ein besonderes Feature im Backend. Dabei kann man sich als Admin eine Excel-Tabelle herunterladen, um so auf Excel die Transaktionen aller Nutzer einsehen zu können.

## Aufbau

Aufgebaut ist das Softwareartefakt aus App.vue, layouts, pages, components und composables.

### Layout

Dabei haben wir vier Layouts: default, die hauptsächlich für das Frontend und den eigentlichen Shop steht. Das Adminlayout ist für das Administrative zuständig. Login und Signuplayout haben sind direkt verbunden mit den Pages /start und /signup.

### Pages

Pages sind die tatsächlichen Seiten, die man im Selbstbedienungskiosk sehen kann. Dafür haben wir insgesamt 12 Seiten erstellt, wovon 9 tatsächlich im Selbstbedienungskiosk zugänglich sind. Den Rest kann man noch ausbauen, ist jedoch nicht für den Benutzer von relevanter Bedeutung.

### Components

### Composables

globalState.js ermöglicht mit  'import { useGlobalState } from '~/composables/useGlobalState'; die Nutzung von 'Personen_ID' zur Identifikation im Kiosk-System. Mit 'setPersonen_ID' zum Festlegen, 'Personen_ID, Name, Vorname' zum Abrufen und 'resetPersonen' zum Zurücksetzen des aktiven Nutzers auf null.



# SWPS Starter

This is an example project that shows how Vue + Nuxt + Vuetify can be used together.

You need to install [NodeJS](https://nodejs.org/en/download) first to use `npm`.

## How to Run the Code

### Setup

Make sure to install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

### Development Server

Start the development server on `http://localhost:3000` run:

```bash
npm run dev
```

or

```bash
yarn dev -o
```

## Documentation

- Webdevelopment
  1. https://developer.mozilla.org/
  1. https://www.w3schools.com/w3css/w3css_web_html.asp
  1. https://www.w3schools.com/w3css/w3css_web_css.asp
  1. https://www.w3schools.com/w3css/w3css_web_javascript.asp
  1. https://css-tricks.com/

- Vue:
  1. https://vuejs.org/
  1. https://vuejs.org/guide/introduction.html
  1. https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/

- Vuetify:
  1. https://vuetifyjs.com/en/
  1. https://vuetifyjs.com/en/components/all/
  1. https://github.com/vuetifyjs/vuetify/tree/master/packages/docs/src/examples

- Nuxt:
  1. https://nuxt.com/
  1. https://nuxt.com/docs/getting-started/introduction
  1. https://nuxt.com/docs/examples/hello-world

- Rest
  1. https://de.wikipedia.org/wiki/Representational_State_Transfer

- Hasura
  1. https://hasura.io/docs/latest/index/
  1. https://hasura.io/learn/graphql/vue/introduction/

- To use Hasura in Nuxt you can use `Apollo` (optional):
  1. https://apollo.nuxtjs.org/getting-started/auth-helpers

- Git:
  1. https://education.github.com/git-cheat-sheet-education.pdf 

- Pages that can help with general questions:
  1. https://stackoverflow.com/
  1. https://google.com/
  1. https://ddg.co/
  1. https://chat.openai.com
