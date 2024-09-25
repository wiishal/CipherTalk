const z = require('zod')

const userScheama = z.object ({
      username: z.string(),
      email: z.string().email()
})