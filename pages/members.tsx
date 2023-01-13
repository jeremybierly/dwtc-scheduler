import type { NextPage } from 'next';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { set, ref, Database, getDatabase } from 'firebase/database';
import { useObject } from 'react-firebase-hooks/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

let firebaseApp: FirebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
}

// Get a reference to the database service
const database: Database = getDatabase(firebaseApp);

const Members: NextPage = () => {
  const [snapshot] = useObject(ref(database, 'users'));
  const members: any = snapshot && snapshot.val();
  console.log(members);
  let membersList = [];
  if (members !== undefined) {
    membersList = Object.values(members);
    membersList = membersList
      .filter((member) => member.hide !== true)
      .sort((a, b) => (a.last > b.last ? 1 : -1));
  }
  return (
    <>
      <h1>Members</h1>
      {membersList.map((member: any, index: number) => (
        <div
          className="text-gray-800, dark:text-white mb-4"
          key={index}
        >
          <div>
            Name: {member.first} {member.last}
          </div>
          <div>Phone: {member.phone}</div>
        </div>
      ))}
    </>
  );
};

export default Members;
