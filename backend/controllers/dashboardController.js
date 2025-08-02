const Expense = require("../models/Expense");
const Sales = require("../models/Sales")
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // ----------------------------- TOTAL EXPENSE -----------------------------
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);

        // -------------------- Total Sales ---------------------------------
        const totalSales = await Sales.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$salePrice" } } },
        ])

       // ------------------- Total profit
       const totalProfit = await Sales.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$profit" } } },
       ]);
       

        // ---------------- LAST 30 DAYS EXPENSE TRANSACTIONS ----------------
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.totalAmount,
            0
        );

        // ---------------- RECENT EXPENSE TRANSACTIONS ----------------
        const lastTransactions = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        const recentTransactions = lastTransactions.map(txn => ({
            ...txn,
            type: "expense"
        }));

        // -------------- Expenses Grouped By Category -------------
        const expensesByCategory = await Expense.aggregate([
            {$match: { userId: userObjectId }},
            {
                $group: {
                    _id: { $toLower: "$category" }, // group expenses by making them all lowercase
                    totalAmount: {$sum: "$totalAmount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalAmount: 1
                }
            }
        ]);

        // --------------- RECENT SALES ------------------------
        const lastSales = await Sales.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        const recentSales = lastSales.map(txn => ({
            ...txn,
            type: "sales"
        }));

        // ----------------- Profit/Loss --------------------
        const profitLossByMonth = await Sales.aggregate([
            { $match: { userId: userObjectId }},
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    totalSales: { $sum: "$salePrice" },
                    totalCost: { $sum: "$costPrice" }
                }
            },
            {
                $project: {
                    month: "$_id",
                    profit: { $subtract: ["$totalSales", "$totalCost"] },
                }
            },
            { $sort: { month: 1 } }
        ]);

        const expensesByMonth = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    totalExpense: { $sum: "$totalAmount" }
                }
            },
            {
                $project: {
                    month: "$_id",
                    totalExpense: 1,
                    _id: 0
                }
            },
            { $sort: { month: 1 } }
        ]);

        // Merge profits and expenses into one list
        const mergedProfitLoss = profitLossByMonth.map(profit => {
            const expenseEntry = expensesByMonth.find(e => e.month === profit.month) || {};
            return {
                month: profit.month,
                profit: profit.profit,
                expense: expenseEntry.totalExpense || 0
            };
        });



        // Final Response
        res.json({
            totalBalance: -(totalExpense[0]?.total || 0),
            totalExpense: totalExpense[0]?.total || 0,
            totalSales: totalSales[0]?.total || 0,
            totalProfit: totalProfit[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            recentTransactions,
            recentSales,
            expenses: expensesByCategory,
            profitLossData: mergedProfitLoss,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
