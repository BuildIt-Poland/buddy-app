# Buddy App GraphQL Service

> Service that exposes GraphQL lambda to be consumed by Buddy App front end app. Connects also to a prisma db.

## Prerequisites

- Please assure that you have `nodejs12.x` installed on your machine.

- And one more `.env` file in the `/services` folder(the values should be changed to your own):

```
PRISMA_STAGE=######
PRISMA_ENDPOINT=######
PRISMA_SECRET=#######
APP_SECRET=#######
API_GATEWAY_DOMAIN=#######
```

## Develop

- `$ yarn start` - Runs lambda functions on local machine on port 4000 as default.

## Deployment

If you wish to deploy to different stages example (dev, staging, prod) you should add in the `serverless.yml` under `domains` the new domains for each new stage and respectively.

Make sure you have a domain name on AWS Route 53 and certificate. For example `yourdomain.com`. If you don’t have a domain name, you can purchase one on Route 53. For more info take a look at [serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager#how-it-works).

The Serverless framework configured with correct AWS credentials.
[Serverless config credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

- To generate .serverless folder that contains artifacts used for manual deployment run `.serverless` `yarn build`

- Create domain before deployment (you should specify your stage). `yarn create_domain -- --stage dev`

- Deploy functions (you should specify your stage). `yarn deploy -- --stage dev`

### Remove deployed functions

- Remove deployed functions (you should specify your stage). `yarn remove -- --stage dev`

- Remove domain deployment (you should specify your stage). `yarn remove_domain -- --stage dev`

## Prisma DB

In case of changes of the prisma data model, it should be generated again running the following command:

`yarn prisma-generate`

DB backup is created and stored to S3 on each deployment to relevant stage.

### Seeding Prisma DB with initial data

To seed DB with initial data (defined inside `/prisma/seed-data.ts` file), run below command:

```
yarn prisma:seed
```

If you want to clear DB from existing data before seeding, run below command:

```
yarn prisma:clean-seed
```

You can read more about `prisma seed` command [here](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-seed-xcv8/).
