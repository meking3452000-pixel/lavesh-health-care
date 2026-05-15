const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readTable(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeTable(name, data) {
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

function nextId(records) {
  if (!records.length) return 1;
  return Math.max(...records.map(r => r.id)) + 1;
}

const db = {
  // Generic CRUD
  all(table) {
    return readTable(table);
  },
  find(table, id) {
    return readTable(table).find(r => r.id === Number(id)) || null;
  },
  where(table, predicate) {
    return readTable(table).filter(predicate);
  },
  insert(table, record) {
    const rows = readTable(table);
    const newRow = { ...record, id: nextId(rows), createdAt: new Date().toISOString() };
    rows.push(newRow);
    writeTable(table, rows);
    return newRow;
  },
  update(table, id, changes) {
    const rows = readTable(table);
    const idx = rows.findIndex(r => r.id === Number(id));
    if (idx === -1) return null;
    rows[idx] = { ...rows[idx], ...changes, updatedAt: new Date().toISOString() };
    writeTable(table, rows);
    return rows[idx];
  },
  delete(table, id) {
    const rows = readTable(table);
    const idx = rows.findIndex(r => r.id === Number(id));
    if (idx === -1) return false;
    rows.splice(idx, 1);
    writeTable(table, rows);
    return true;
  },
};

module.exports = db;
