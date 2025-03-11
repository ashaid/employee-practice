"use strict";
exports.__esModule = true;
require("reflect-metadata");
var express_1 = require("express");
var cors_1 = require("cors");
var data_source_ts_1 = require("./data-source.ts");
// import userRoutes from "./routes/users.js";
// Initialize Express app
var app = (0, express_1["default"])();
var PORT = 3000;
// Middleware
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
// Routes
// app.use("/api/users", userRoutes);
// Root route
app.get("/", function (req, res) {
    res.json({ message: "Welcome to Express TypeORM API" });
});
// Initialize database connection then start server
data_source_ts_1.AppDataSource.initialize()
    .then(function () {
    console.log("Database connection established");
    // Start the server
    app.listen(PORT, function () {
        console.log("Server is running on port ".concat(PORT));
    });
})["catch"](function (error) {
    console.error("Error connecting to database:", error);
});
