"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.addTask = void 0;
const yup = __importStar(require("yup"));
const database_1 = require("../database");
const taskValidations = yup.object().shape({
    id: yup.number().required(),
    date: yup.string().required(),
    description: yup.string().required().min(3),
    dateCreated: yup.string().required().min(10),
    deadline: yup.string().required().min(10),
    status: yup.string().required(),
    dateCompleted: yup.string()
});
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = Object.assign({ id: Math.random() }, req.body);
    const validTask = yield taskValidations.isValid(task);
    if (validTask) {
        database_1.client.connect(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const db = database_1.client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_NAME);
                const documentDay = collection.find({ date: task.date });
                const documentDayArray = yield documentDay.toArray();
                if (documentDayArray.length) {
                    const documentTasksArray = yield documentDayArray[0].tasks;
                    documentTasksArray.push(task);
                    yield collection.updateOne({
                        date: task.date
                    }, {
                        $set: { tasks: documentTasksArray }
                    });
                }
                else {
                    yield collection.insertOne({
                        date: task.date,
                        tasks: [task]
                    });
                }
                return res.send('Task adding successfully');
            }
            catch (error) {
                console.log('Erro de conexão com o banco de dados!', error);
            }
        }));
    }
    else {
        return res.send('Invalid Task');
    }
});
exports.addTask = addTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.client.connect(() => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const db = database_1.client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_NAME);
                const date = req.query.date;
                const datas = yield collection.findOne({ date: date });
                const tasks = (_a = yield (datas === null || datas === void 0 ? void 0 : datas.tasks)) !== null && _a !== void 0 ? _a : [];
                console.log(tasks);
                res.json(tasks);
            }
            catch (error) {
                console.log('Erro de conexão com o banco de dados!', error);
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTask = getTask;
