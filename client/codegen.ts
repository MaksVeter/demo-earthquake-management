require('dotenv').config();

module.exports = {
    schema: process.env.GRAPHQL_SERVER_URL,
    documents: 'src/graphql/**/*.ts',
    generates: {
        'src/types/graphql.d.ts': {
            plugins: ['typescript', 'typescript-operations'],
            config: {
                scalars: {
                    Date: 'string',
                    Location: 'string'
                }
            }
        },
    },
};
