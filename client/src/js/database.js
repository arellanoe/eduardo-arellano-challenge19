import { openDB as openIndexedDB } from 'idb';

const databaseName = 'jate-db';
const databaseVersion = 1;
const objectStoreName = 'jate-store';

const initializeDatabase = async () => {
  try {
    const jateDB = await openIndexedDB(databaseName, databaseVersion, {
      upgrade(database) {
        if (database.objectStoreNames.contains(objectStoreName)) {
          console.log('J.A.T.E database already exists.');
          return;
        }

        database.createObjectStore(objectStoreName, { keyPath: 'id', autoIncrement: true });
        console.log('J.A.T.E database created.');
      },
    });
    return jateDB;
  } catch (error) {
    console.error(error);
  }
};

const addTextToIndexedDB = async (content) => {
  try {
    const jateDB = await initializeDatabase();
    const transaction = jateDB.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const retrieveTextFromIndexedDB = async (e) => {
  try {
    const jateDB = await initializeDatabase();
    const transaction = jateDB.transaction(objectStoreName, 'readonly');
    const store = transaction.objectStore(objectStoreName);
    const request = store.get(1);
    const result = await request;
    return result?.value;
  } catch (error) {
    console.error(error);
  }
};

initializeDatabase();
