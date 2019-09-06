# BSapp

This application was developped by Andrew Malcolm as a deliverable for the master's dissertation "Building specification management through Linked data".
The main functionalities include the connectivity between an angular interface and a GraphDB database, in order to edit and review linked building data.This application connects to a non-existent server, but the adress can be altered in order to connect to an existing server in order for the application to work.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

# TODO
-Better loading/mounting of the landing page

-Making a local list from a single query instead of querying every single entry once

-Better UI obviously

-Build on Heroku (best to clear asset files first)

-Bugfix the submit/edit buttons so that the full SPARQL query is sent before refreshing the web-app's contents


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
