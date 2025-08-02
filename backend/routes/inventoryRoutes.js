const express = require("express");

const {
    addInventory,
    getInventory,
    deleteInventory,
    downloadInventoryExcel,
    updateInventory,
} = require("../controllers/inventoryController"); // get route logic
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addInventory);
router.get("/get", protect, getInventory);
router.get("/download", protect, downloadInventoryExcel);
router.delete("/:id", protect, deleteInventory);
router.put("/:id", protect, updateInventory);

module.exports = router;