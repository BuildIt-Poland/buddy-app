# To run the seed:

- populate all `seed-data.{country}.ts` files with `TaskInput` related data;
- open `prisma.yml` and chnage `seed` script to:
  ```
  run: ts-node prisma/seed-tpl/seed.ts
  ```
- go to `services` folder and run:
  ```
  yarn run prisma:seed
  ```

# To add new template:

- go to `schema` folder, open `schema.graphql` and add new option to `enum TaskTemplates`:
  ```
  enum TaskTemplates = {
    ...,
    TPL_{country}
  }
  ```
- create `seed-data.{country}.ts` file, with names and structure according to the existing files,
  just use new option from `TaskTemplates` as `newbie.email`:
  ```
  export const newbie = {
    email: TaskTemplates.Tpl{country},
    name: TaskTemplates.Tpl{country},
    password: ""
  };
  ```
- open `seed-data.ts` and add next changes:
  ```
  import * as data{country} from "./seed-data.{country}";
  export const newbiesData = [..., data{country}];
  ```
