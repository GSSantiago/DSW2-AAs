import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load database
const dbPath = path.join(__dirname, "db.json");
let db = {};

try {
  const data = fs.readFileSync(dbPath, "utf8");
  db = JSON.parse(data);
} catch (error) {
  console.error("Error loading database:", error);
  process.exit(1);
}

// Helper function to get next ID
const getNextId = (collection) => {
  const items = db[collection] || [];
  return items.length > 0
    ? Math.max(...items.map((item) => parseInt(item.id))) + 1
    : 1;
};

// Helper function to save database
const saveDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// Standard CRUD routes for users
app.get("/users", (req, res) => {
  res.json(db.users || []);
});

app.get("/users/:id", (req, res) => {
  const user = db.users?.find((u) => u.id === req.params.id);
  const userFamily = db.families?.find((f) => f.id === user.currentFamilyId);

  user.family = userFamily;
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: getNextId("users").toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.users = db.users || [];
  db.users.push(newUser);
  saveDb();
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const userIndex = db.users?.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDb();
  res.json(db.users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = db.users?.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  db.users.splice(userIndex, 1);
  saveDb();
  res.status(204).send();
});

// Standard CRUD routes for families
app.get("/family", (req, res) => {
  res.json(db.families || []);
});

app.get("/family/:id", (req, res) => {
  const family = db.families?.find((f) => f.id === req.params.id);
  if (!family) return res.status(404).json({ error: "Family not found" });
  res.json(family);
});

app.post("/family", (req, res) => {
  const newFamily = {
    id: getNextId("families").toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.families = db.families || [];
  db.families.push(newFamily);
  saveDb();
  res.status(201).json(newFamily);
});

app.put("/family/:id", (req, res) => {
  const familyIndex = db.families?.findIndex((f) => f.id === req.params.id);
  if (familyIndex === -1)
    return res.status(404).json({ error: "Family not found" });

  db.families[familyIndex] = {
    ...db.families[familyIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDb();
  res.json(db.families[familyIndex]);
});

app.delete("/family/:id", (req, res) => {
  const familyIndex = db.families?.findIndex((f) => f.id === req.params.id);
  if (familyIndex === -1)
    return res.status(404).json({ error: "Family not found" });

  db.families.splice(familyIndex, 1);
  saveDb();
  res.status(204).send();
});

// Standard CRUD routes for entries
app.get("/entries", (req, res) => {
  const entries = db.entries || [];
  // Sort by date descending (newest first)
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  res.json(sortedEntries);
});

app.get("/entries/:id", (req, res) => {
  const entry = db.entries?.find((e) => e.id === req.params.id);
  if (!entry) return res.status(404).json({ error: "Entry not found" });
  res.json(entry);
});

app.post("/entries", (req, res) => {
  const newEntry = {
    id: getNextId("entries").toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.entries = db.entries || [];
  db.entries.push(newEntry);
  saveDb();
  res.status(201).json(newEntry);
});

app.put("/entries/:id", (req, res) => {
  const entryIndex = db.entries?.findIndex((e) => e.id === req.params.id);
  if (entryIndex === -1)
    return res.status(404).json({ error: "Entry not found" });

  db.entries[entryIndex] = {
    ...db.entries[entryIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDb();
  res.json(db.entries[entryIndex]);
});

app.delete("/entries/:id", (req, res) => {
  const entryIndex = db.entries?.findIndex((e) => e.id === req.params.id);
  if (entryIndex === -1)
    return res.status(404).json({ error: "Entry not found" });

  db.entries.splice(entryIndex, 1);
  saveDb();
  res.status(204).send();
});

// CUSTOM ROUTE: Get all entries from users in a specific family
app.get("/family/:familyId/entries", (req, res) => {
  const familyId = req.params.familyId;

  // Get all users from the specified family
  const usersInFamily =
    db.users?.filter((user) => user.currentFamilyId === familyId) || [];

  // Extract user IDs
  const userIds = usersInFamily.map((user) => user.id);

  // Get all entries from these users
  const entries =
    db.entries?.filter((entry) => userIds.includes(entry.userId)) || [];

  // Add user information to each entry
  const entriesWithUserInfo = entries.map((entry) => {
    const user = usersInFamily.find((u) => u.id === entry.userId);
    return {
      ...entry,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      },
    };
  });

  // Sort by date descending (newest first)
  const sortedEntries = entriesWithUserInfo.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  res.json(sortedEntries);
});

// CUSTOM ROUTE: Get entries summary for a family
app.get("/family/:familyId/entries/summary", (req, res) => {
  const familyId = req.params.familyId;

  // Get all users from the specified family
  const usersInFamily =
    db.users?.filter((user) => user.currentFamilyId === familyId) || [];

  // Extract user IDs
  const userIds = usersInFamily.map((user) => user.id);

  // Get all entries from these users
  const entries =
    db.entries?.filter((entry) => userIds.includes(entry.userId)) || [];

  // Calculate summary
  const summary = {
    totalEntries: entries.length,
    totalIncome: entries
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.value, 0),
    totalExpenses: entries
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.value, 0),
    netBalance: entries.reduce((sum, e) => {
      return e.type === "income" ? sum + e.value : sum - e.value;
    }, 0),
    entriesByUser: userIds.map((userId) => {
      const user = usersInFamily.find((u) => u.id === userId);
      const userEntries = entries.filter((e) => e.userId === userId);
      return {
        userId: userId,
        userName: `${user.firstName} ${user.lastName}`,
        totalEntries: userEntries.length,
        totalIncome: userEntries
          .filter((e) => e.type === "income")
          .reduce((sum, e) => sum + e.value, 0),
        totalExpenses: userEntries
          .filter((e) => e.type === "expense")
          .reduce((sum, e) => sum + e.value, 0),
        netBalance: userEntries.reduce((sum, e) => {
          return e.type === "income" ? sum + e.value : sum - e.value;
        }, 0),
      };
    }),
  };

  res.json(summary);
});

// CUSTOM ROUTE: Get all entries for a specific user
app.get("/users/:userId/entries", (req, res) => {
  const userId = req.params.userId;

  // Check if user exists
  const user = db.users?.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get all entries for this user
  const entries = db.entries?.filter((entry) => entry.userId === userId) || [];

  // Sort by date descending (newest first)
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  res.json(sortedEntries);
});

// CUSTOM ROUTE: Get entries summary for a specific user
app.get("/users/:userId/entries/summary", (req, res) => {
  const userId = req.params.userId;

  // Check if user exists
  const user = db.users?.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get all entries for this user
  const entries = db.entries?.filter((entry) => entry.userId === userId) || [];

  // Calculate summary
  const summary = {
    totalEntries: entries.length,
    totalIncome: entries
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.value, 0),
    totalExpenses: entries
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.value, 0),
    netBalance: entries.reduce((sum, e) => {
      return e.type === "income" ? sum + e.value : sum - e.value;
    }, 0),
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    },
  };

  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /users`);
  console.log(`  GET    /family`);
  console.log(`  GET    /entries`);
  console.log(
    `  GET    /users/:userId/entries              # Get all entries for a specific user`,
  );
  console.log(
    `  GET    /users/:userId/entries/summary     # Get entries summary for a specific user`,
  );
  console.log(
    `  GET    /family/:familyId/entries          # Get all entries from users in a family`,
  );
  console.log(
    `  GET    /family/:familyId/entries/summary # Get entries summary for a family`,
  );
  console.log(`  POST   /users`);
  console.log(`  POST   /family`);
  console.log(`  POST   /entries`);
  console.log(`  PUT    /users/:id`);
  console.log(`  PUT    /family/:id`);
  console.log(`  PUT    /entries/:id`);
  console.log(`  DELETE /users/:id`);
  console.log(`  DELETE /family/:id`);
  console.log(`  DELETE /entries/:id`);
});
