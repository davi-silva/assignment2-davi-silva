const { z } = require("zod");

const itemSchema = z.object({
  name: z.string(),
  category: z.string(),
  price: z.number().positive(),
});

const validateItem = (req, res, next) => {
  try {
    itemSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

module.exports = { validateItem };
