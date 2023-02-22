const router = require("express").Router();
const verify = require("./verifyToken");
router.get("/", (req, res) => {
  res.send(req.user);
  res.json({
    product: {
      title: "Milk Chocolate Bar",
      description:
        "A creamy chocolate bar made with rich Milk chocolate and essence of love!",
    },
  });
});

module.exports = router;
