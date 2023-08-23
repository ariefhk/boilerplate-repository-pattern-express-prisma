const router = require("express").Router();

router.all("/*", (req, res) => {
    res.status(404).json({
        status: "FAIL",
        message: "Route not found!",
    });
});

module.exports = router;
