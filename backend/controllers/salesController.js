const xlsx = require("xlsx");
const Sales = require("../models/Sales");

// Add Sales
exports.addSales = async (req, res) => {
    const userId = req.user.id; // get user id through request

    try { 
        // Destructure from req into variables
        const { inventoryId, productName, size, costPrice, salePrice, date } = req.body;

        // Validation
    if (!inventoryId || !productName || !size || !costPrice || !salePrice || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Adjust to local midnight 
        const inputDate = new Date(date);
        inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());

        // Create new sales object using mongoose model
        const newSales = new Sales({
            userId,
            inventoryId,
            productName,
            size,
            costPrice,
            salePrice,
            profit: salePrice - costPrice,
            date: inputDate,
        });

        // Save new sales object to database
        await newSales.save();
        // Send Success response
        res.status(200).json(newSales);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Sales
exports.getSales = async (req, res) => {
    const userId = req.user.id;

    try {
        // Find all sales that belong to user sorted by most recent
        const sales = await Sales.find({ userId }).sort({ date: -1 });
        res.json(sales); // send response 
    } catch (err) {
        res.status(500).json({ message: "Server Error"});
    }
};

// Delete Sales
exports.deleteSales = async (req, res) => {
    try {
        await Sales.findByIdAndDelete(req.params.id);
        res.json({ message: "Sale deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Sever Error"});
    }
};

// Download Sales
exports.downloadSalesExcel= async (req, res) => {
    const userId = req.user.id;

    try {
        const sales = await Sales.find({ userId}).sort({ date: -1 });

        // Prepare data for excel
        const data = sales.map((item) => ({
            ProductName: item.productName,
            Size: item.size,
            CostPrice: item.costPrice,
            SalePrice: item.salePrice,
            Profit: item.profit ?? (item.salePrice - item.costPrice),
            Date: item.date,
        }));

        // Create a new Excel workbook
        const wb = xlsx.utils.book_new();
         // Convert the JSON data array into an Excel worksheet
        const ws = xlsx.utils.json_to_sheet(data);
        // Append the worksheet to the workbook with the sheet name "Sales"
        xlsx.utils.book_append_sheet(wb, ws, "Sales");
        // Convert to buffer instead of saving to file
        const buffer = xlsx.write(wb, {type: "buffer", bookType: "xlsx" });
        
        // Send file directly to client
        res.setHeader("Content-Disposition", 'attachment; filename="sales_details.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Sales
exports.updateSales = async (req, res) => {
    try {
        const updated = await Sales.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Sale item not found." });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};