const { getAllRecords } = require("../utils/sqlFunctions"); 

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllRecords("users"); 
    const safeUsers = users
      .filter(u => u.role === "USER")
      .map(u => ({
        userId: u.userId,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        username: u.username,
        role: u.role
      }));
    
    res.json(safeUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers };
