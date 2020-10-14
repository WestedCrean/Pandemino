"use strict";
/**
 * Required External Modules
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("routes"));
dotenv.config();
/**
 * App Variables
 */
if (!process.env.API_PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.API_PORT, 10);
const app = express_1.default();
/**
 *  App Configuration
 */
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
routes_1.default(app);
/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwrQ0FBZ0M7QUFDaEMsc0RBQTZCO0FBQzdCLGdEQUF1QjtBQUN2QixvREFBMkI7QUFDM0IsOERBQW9DO0FBRXBDLG9EQUFnQztBQUVoQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFZjs7R0FFRztBQUVILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0NBQ2xCO0FBRUQsTUFBTSxJQUFJLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUVqRSxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUE7QUFFckI7O0dBRUc7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQTtBQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRTFCLGdCQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFaEI7O0dBRUc7QUFFSCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQSJ9