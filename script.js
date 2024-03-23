import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { complexesData } from "./firebase/complexes.js";
import { oldData } from "./firebase/jsonformatter.js";
import { db } from "./firebase/firebase.config.js";

// Function to get email from complexes data
const getEmail = (item) => {
  const complexData = complexesData.find(
    (c) => c.complexName === item.complexName
  );
  return complexData ? complexData.contact.email : "";
};
const getName = (item) => {
  const complexData = complexesData.find(
    (c) => c.complexName === item.complexName
  );
  return complexData ? complexData.contact.name : "";
};
const getPhone = (item) => {
  const complexData = complexesData.find(
    (c) => c.complexName === item.complexName
  );
  return complexData ? complexData.contact.contact : "";
};

// Function to generate a unique document ID
const generateDocId = (complexName, projectDescription) => {
  return `${complexName}-${projectDescription}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
};

// Function to migrate data
async function migrateData() {
  console.log("Starting data migration...");

  for (const item of oldData) {
    // Verify that complexName and projectDescription exist
    if (!item.complexName || !item.invoiceTitle) {
      console.error(`Missing data in item: ${JSON.stringify(item)}`);
      continue;
    }

    const docId = generateDocId(item.complexName, item.invoiceTitle); // Using complexName and invoiceTitle

    const newData = {
      id: docId, // Adding the document ID to the data object
      complex: item.complexName,
      dueDate: item.invoiceDueDate,
      email: getEmail(item),
      invoiceDate: item.invoiceDate,
      invoiceItems: item.list.map((subItem) => ({
        item: subItem.description,
        price: parseFloat(subItem.amount),
        quantity: parseInt(subItem.quantity),
      })),
      invoiceNumber: item.invoiceNumber,
      projectDescription: item.invoiceTitle,
      status: "Unpaid",
      total: item.total / 8,
      name: getName(item),
      contact: getPhone(item),
    };

    try {
      console.log(`Processing invoice: ${docId}`);
      await setDoc(doc(db, "invoices", docId), newData);
      console.log(`Successfully added invoice: ${docId}`);
    } catch (error) {
      console.error(`Error adding invoice: ${docId}`, error);
    }
  }

  console.log("Data migration completed successfully.");
}

migrateData();
