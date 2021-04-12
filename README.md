# Restable (WIP)

Restable is a specification for communicating with databases via REST calls. It uses the [JSONAPI](https://jsonapi.org/) specification to define how to manage resources in the databases.

## Description

RESTABLE is a specification of a REST interface for communication with data stores using HTTP REST calls in a way that is datastore agnostic.
A basic implementation of the RESTABLE spec using the [Nest](https://github.com/nestjs/nest) framework. The implementation in this repo stores data in memory. To store data in other datastores and databases, you have to build plugins
## Building plugins
While you don't need to use NEST.js to build plugins, This Repo makes it easy to use it to build plugins. An example of a plugin built with nestjst is here https://github.com/nyabongo/restable-couchbase

1. To build a plugin, you can start by using the boostrapped NESTjs application created by running
```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```
2. Install this npm package using 
```bash
$ npm i @nyabongo/restable
```
3. Replace the controller import in `app.module.ts` with the controller from `@nyabongo/restable` as done [here for couchbase](https://github.com/nyabongo/restable-couchbase/blob/main/src/app.service.ts) see example implementations 
```typescript
//app.controller.ts

//import { AppController } from './app.controller';
import { AppController } from '@obel/restable';
```
4. implement `IRestableService` in `app.service.ts` 
```typescript
//...
import { IRestableService} from '@obel/restable';
//...

@Injectable
export class AppService implements IRestableService{
    //...
}
```
## Installation

```bash
$ npm install
```

## Running locally
The app runs on port 3000
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## View the Spec and documentation
If you are running the app navigate to the path `/api_doc/` to view the swagger documentation and test the spec

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Restable is [MIT licensed](LICENSE).
