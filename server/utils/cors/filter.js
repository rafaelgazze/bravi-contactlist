const { api: { cors: { allowed: domains } } } = require('../../../configs')

// CORS does not accept wildcard subdomains: match against allowed domain and echo the origin or disallow (empty)
module.exports = origin => domains.length > 0 && domains.some(domain => origin.endsWith(domain)) ? origin : ''
