const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    this.dataPath = path.join(__dirname, '../../storage/data.json');
    this.contacts = new Map();
    this.ensureFileExists();
    this.loadData();
  }

  ensureFileExists() {
    const dir = path.dirname(this.dataPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    
    if (!fs.existsSync(this.dataPath)) {
      fs.writeFileSync(this.dataPath, JSON.stringify([], null, 2));
      console.log(`Created file: ${this.dataPath}`);
    }
  }

  loadData() {
    try {
      const fileContent = fs.readFileSync(this.dataPath, 'utf8');
      const jsonArray = JSON.parse(fileContent);
      
      jsonArray.forEach((contact) => {
        this.contacts.set(contact.email, contact);
      });
      
      console.log(`Loaded ${this.contacts.size} contacts from data.json`);
    } catch (err) {
      console.error('Error loading data:', err.message);
    }
  }

  saveData() {
    try {
      const dataArray = Array.from(this.contacts.values());
      fs.writeFileSync(this.dataPath, JSON.stringify(dataArray, null, 2));
    } catch (err) {
      console.error('Error saving data:', err.message);
    }
  }

  getContact(email) {
    return this.contacts.get(email) || null;
  }

  addContact(email, name, phone) {
    // Check if contact already exists
    if (this.contacts.has(email)) {
      console.log(`[ADD FAILED] Contact with email ${email} already exists`);
      return { error: "Contact with this email already exists", exists: true };
    }

    const newContact = { email, name, phone };
    this.contacts.set(email, newContact);
    this.saveData();
    console.log(`[ADD SUCCESS] Contact added: ${email}`);
    return { ...newContact, exists: false };
  }

  deleteContact(email) {
    const contact = this.contacts.get(email);
    if (!contact) {
      console.log(`[DELETE FAILED] Contact with email ${email} not found`);
      return null;
    }
    
    this.contacts.delete(email);
    this.saveData();
    console.log(`[DELETE SUCCESS] Contact deleted: ${email}`);
    return contact;
  }
}

module.exports = new DataService();