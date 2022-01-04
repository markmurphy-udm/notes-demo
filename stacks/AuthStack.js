import * as iam from "@aws-cdk/aws-iam";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
    
    // Public refs
    auth;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, bucket } = props;

    // Auth construct creates a Cognito User Pool and Identity Pool
    this.auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          signInAliases: { email: true },
        },
      },
    });

    /*
    * Config
    */

    // Permissions
    this.auth.attachPermissionsForAuthUsers([
      api,
      // S3 directory is specific to each user
      new iam.PolicyStatement({
        actions: ["s3:*"],
        effect: iam.Effect.ALLOW,
        resources: [
          bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        ],
      }),
    ]);

    // Show output
    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool.userPoolId,
      IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
    });
  }
}