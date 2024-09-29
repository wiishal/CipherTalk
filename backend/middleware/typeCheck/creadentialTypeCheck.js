const z = require("zod");

const userSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Username is required." })
    .max(15, { message: "Username must be 15 characters or less." }),
  userEmail: z.string().email({ message: "Invalid email address." }),
  userPassword: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long." }),
});

function creadentialTypeCheck(req, res, next) {
  const userCreadentials = req.body;
  const result = userSchema.safeParse(userCreadentials);

  if (!result.success) {
    res.status(400).json({
      success:false,
      error:result.error.format()
    });
    return
  }
  next()
}

module.exports = creadentialTypeCheck;
