const xlsx = require("xlsx");
const Expense = require("../models/Expense");


// Add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amountBeforeTax, taxPaid, totalAmount, date } = req.body;

        // Validation: check for missing fields
        if (!category || !amountBeforeTax || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Adjust to local midnight 
        const inputDate = new Date(date);
        inputDate.setMinutes(inputDate.getMinutes() + inputDate.getTimezoneOffset());

        // Create new expense oject using income mongoose model
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amountBeforeTax,
            taxPaid,
            totalAmount,
            date: inputDate,
        });

        // Save new income to database
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err){
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id; // Retriver userId and store 

    try {
        // Find all expense records that belong to this user, sorted by most recent first
        const expense = await Expense.find({ userId}).sort({ date: -1 });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: "Server Error"});
    }
};


// Delete Expense source
exports.deleteExpense = async (req, res) => {
    try {
         // Delete the income record with the ID provided in the URL parameters
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

// Download excel
exports.downloadExpenseExcel= async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId}).sort({ date: -1 });

        // Prepare data for excel
        const data = expense.map((item) => ({
            category: item.category,
            amountBeforeTax: item.amountBeforeTax,
            taxPaid: item.taxPaid,
            totalAmount: item.totalAmount,
            Date: item.date,
        }));
        // Create a new Excel workbook
        const wb = xlsx.utils.book_new();
         // Convert the JSON data array into an Excel worksheet
        const ws = xlsx.utils.json_to_sheet(data);
        // Append the worksheet to the workbook with the sheet name "Income"
        xlsx.utils.book_append_sheet(wb, ws, "expense");
         // Write the workbook to a file named 'income_details.xlsx'
        xlsx.writeFile(wb, 'expense_details.xlsx');
        // Send the Excel file as a downloadable response to the client
        res.download('expense_details.xlsx')
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};