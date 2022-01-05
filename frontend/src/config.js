const config = {
    STRIPE_KEY: 'pk_test_51KEIQWAORWxyZCa8BZHX3op0mnoLscfTdyxc6A0nzbm2vxWFiSwyqwrJXOIJUoa3g4rQwThUVqUNY6JAYqzN97Hf00fNH4DulN',
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: process.env.REACT_APP_REGION,
      BUCKET: process.env.REACT_APP_BUCKET,
    },
    apiGateway: {
      REGION: process.env.REACT_APP_REGION,
      URL: process.env.REACT_APP_API_URL,
    },
    cognito: {
      REGION: process.env.REACT_APP_REGION,
      USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
    },
  };
  
  export default config;