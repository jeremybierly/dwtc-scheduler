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
      <h1 className="py-4 mb-4 text-gray-500 text-2xl border-b-2 border-gray-500">
        Members
      </h1>
      {membersList.map((member: any, index: number) => (
        <div
          className="text-gray-700, dark:text-gray-200 mb-4"
          key={index}
        >
          <div className="text-xl">
            {member.first} {member.last}
          </div>
          <a
            href={'sms:' + member.phone}
            className="inline-block my-2 py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold"
          >
            {member.phone}
          </a>
          <hr className="my-4" />
        </div>
      ))}
    </>
  );
};

export default Members;
