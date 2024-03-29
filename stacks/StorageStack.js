import * as sst from '@serverless-stack/resources';

export default class StorageStack extends sst.Stack {

	// Public refs
	bucket;
	table;

	constructor(scope, id, props){
		super(scope, id, props);

		this.bucket = new sst.Bucket(this, "Uploads", {
			s3Bucket: {
			  cors: [
				{
				  maxAge: 3000,
				  allowedOrigins: ["*"],
				  allowedHeaders: ["*"],
				  allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
				},
			  ],
			},
		  });

		this.table = new sst.Table(this, "Notes", {
			fields: {
				userId: sst.TableFieldType.STRING,
				noteId: sst.TableFieldType.STRING,
			},
			primaryIndex: { partitionKey: "userId", sortKey: "noteId"}
		});
	}
};
