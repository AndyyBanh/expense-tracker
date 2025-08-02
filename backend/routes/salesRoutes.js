const express = require("express");

const {
    addSales,
    getSales,
    deleteSales,
    downloadSalesExcel,
    updateSales,
} = require("../controllers/salesController"); //  get route logic
const { protect } = require("../middleware/authMiddleware"); // verifcation

const router = express.Router();

router.post("/add", protect, addSales);
router.get("/get", protect, getSales);
router.get("/download", protect, downloadSalesExcel);
router.delete("/:id", protect, deleteSales);
router.put("/:id", protect, updateSales);

module.exports = router;
