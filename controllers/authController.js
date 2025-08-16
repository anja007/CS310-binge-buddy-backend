const db = require('../db/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const {
    registerValidation,
    loginValidation
} = require('../validation/validation');

const {
    checkRecordExists,
    insertRecord
} = require('../utils/sqlFunctions');


const register = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, email, username, password } = req.body;
    const userRole = "USER";

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            role: userRole
        };

        const userAlreadyExists = await checkRecordExists("users", "email", email);
        if (userAlreadyExists) {
            return res.status(409).json({ error: "Email already exists" });
        }

        await insertRecord("users", newUser);
        return res.status(201).json({ message: "User created successfully!" });
    
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await checkRecordExists("users", "email", email);
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(existingUser);

        return res.status(200).json({
            message: "Login successful!",
            token
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
    register,
    login
};
