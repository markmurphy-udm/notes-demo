import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  
  // Public refs
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "GET    /notes": "src/list.main",
        "POST   /notes": "src/create.main",
        "GET    /notes/{id}": "src/get.main",
        "PUT    /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
        "POST   /billing": "src/billing.main",
      },
    });


    /*
    * Config options
    */

    // Permissions
    this.api.attachPermissions([table]);

    // Show output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}