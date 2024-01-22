export const admin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      res.status(403).json({
        message: "You are not allowed to access!",
      });
      return;
    }
    next();
  } catch (e) {
    console.log(e,"error");
    res.status(403).send({ error: "Forbidden" });
  }
};
