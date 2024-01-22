const formatErrors = (errors) => {
  if (!errors) return {};
  if (errors.details) {
    let errorBag = {};
    errors.details.map((err) => {
      let msg = err.message;

      if (err.hasOwnProperty("context")) {
        if (err.context.hasOwnProperty("limit")) {
          msg = err.message;
        } else if (err.context.hasOwnProperty("present")) {
          err.context.present.map((key) => {
            errorBag[key] = msg;
          });
        }
      }
      if (err.path.length) {
        errorBag[err.path.join(".")] = msg;
      } else {
        return errorBag;
      }
    });
    return errorBag;
  }
  return {};
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const data = req.body;
    const result = schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
      errors: {
        label: "key",
        wrap: { label: false },
      },
    });

    if (result.error) {
      const errors = formatErrors(result.error);
      console.log(errors,"validation error: ");
      res.status(422).json({
        message: "Validation failed",
        errors,
      });
      return;
    }
    next();
  };
};

export { validateRequest };
