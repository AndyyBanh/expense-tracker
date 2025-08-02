const xlsx = require("xlsx");
const Inventory = require("../models/Inventory");

// Add Inventory
exports.addInventory = async (req, res) => {
    const userId = req.user.id; 

     try {
        const { productName, costBeforeTax, taxPaid, totalCost, size, condition, paymentMethod, status, notes, date } = req.body;
     
        // Validation
        if (!productName || !costBeforeTax || !totalCost || !size || !condition || !paymentMethod || !date) {
            return res.status(400).json({ message: "Missing fields are required" });
        }

        // Adjust to local midnight 
        const inputDate = new Date(date);
        inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());

        // Create new inventory object
        const newInventory = new Inventory({
            userId,
            productName,
            costBeforeTax,
            taxPaid,
            totalCost,
            size,
            condition,
            paymentMethod,
            status,
            notes,
            date: inputDate,
        });

        // save new inventory obj
        await newInventory.save();
        res.status(200).json(newInventory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Inventory
exports.getInventory = async (req, res) => {
    const userId = req.user.id;

    try {
        const inventory = await Inventory.find({userId}).sort({date: -1});
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: "Sever Error" });
    }
};

// Delete Inventory
exports.deleteInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Sever Error" });
    }
};

// Download Inventory
exports.downloadInventoryExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const inventory = await Inventory.find({userId}).sort({date: -1});

        // prepare data for excel
        const data = inventory.map((item) => ({
            ProductName: item.productName,
            CostBeforeTax: item.costBeforeTax,
            TaxPaid: item.taxPaid,
            TotalCost: item.totalCost,
            Size: item.size,
            Condition: item.condition,
            PaymentMethod: item.paymentMethod,
            Status: item.status,
            Notes: item.notes || "",
            Date: item.date,
        }));
        // Create a new Excel workbook
        const wb = xlsx.utils.book_new();
        // Convert the JSON data array into an Excel worksheet
        const ws = xlsx.utils.json_to_sheet(data);
        // Append the worksheet to the workbook with the sheet name "Inventory"
        xlsx.utils.book_append_sheet(wb, ws, "Inventory");

        // Convert to buffer instead of saving to file
        const buffer = xlsx.write(wb, {type: "buffer", bookType: "xlsx" });

        // Send file directly to client
        res.setHeader("Content-Disposition", 'attachment; filename="inventory_details.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Inventory
exports.updateInventory = async (req, res) => {
    try {
        const updated = await Inventory.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { ...req.body }, // Update all fields passed in request
            { new: true, runValidators: true } // Return updated doc and validate schema
        );

        if (!updated) {
            return res.status(404).json({ message: "Inventory item not found." });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};