import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  set,
  ref,
  Database,
  getDatabase,
  DataSnapshot,
} from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { TimeSlotDisplay } from "../../components/timeslot";

// Set the configuration for your app
// TODO: Replace with your project's config object
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

const ScheduleDay: NextPage = () => {
  const router: NextRouter = useRouter();
  const path: string = "schedule/" + router.query.schedule;

  const [snapshot] = useObject(ref(database, path));
  const courtSlots = snapshot && snapshot.val();
  console.log(courtSlots);
  let slots: string[] = [
    "08:00 - 10:00 AM",
    "10:00 - 12:00 PM",
    "12:00 - 02:00 PM",
    "02:00 - 04:00 PM",
    "04:00 - 06:00 PM",
    "06:00 - 07:30 PM",
    "07:30 - 09:00 PM",
    "09:00 - 10:30 PM",
  ];

  let user = {
    userName: "admin",
  };

  if (typeof window !== "undefined") {
    user.userName = window.localStorage.getItem("userName") || "admin";
  }

  function reserveSlot(
    courtSlot: string,
    court: string,
    slot: string,
    userName: string
  ): void {
    if (
      confirm(
        `Are you sure you want to set a reservation for ${court} from ${slot}?`
      )
    ) {
      set(
        ref(database, "schedule/" + router.query.schedule + "/" + courtSlot),
        userName
      );
    }
  }

  return (
    <>
      <Head>
        <title>DWTC Schedule</title>
      </Head>
      <ul className="lg:grid lg:grid-cols-4 lg:gap-4 lg:mt-4">
        <li className="hidden lg:block dark:text-gray-300 text-sm uppercase font-bold tracking-wide">
          Time
        </li>
        <li className="hidden lg:block dark:text-gray-300 text-sm uppercase font-bold tracking-wide">
          Court 1
        </li>
        <li className="hidden lg:block dark:text-gray-300 text-sm uppercase font-bold tracking-wide">
          Court 2
        </li>
        <li className="hidden lg:block dark:text-gray-300 text-sm uppercase font-bold tracking-wide">
          Court 3
        </li>
        {slots.map((slot: string, index: number) => (
          <>
            <li className="text-gray-500 mt-4 lg:mt-0 mb-2" key={index}>
              {slot}
            </li>
            <TimeSlotDisplay
              slot={slot}
              reserveSlot={reserveSlot}
              court="Court 1"
              courtSlot={`court1slot${index + 1}`}
              userName={
                courtSlots &&
                courtSlots[`court1slot${index + 1}`] === user.userName
                  ? "cancel"
                  : user.userName
              }
              reservedBy={courtSlots && courtSlots[`court1slot${index + 1}`]}
              isOpen={courtSlots && courtSlots[`court1slot${index + 1}`] === ""}
              canCancel={
                courtSlots &&
                courtSlots[`court1slot${index + 1}`] === user.userName
              }
            />
            <TimeSlotDisplay
              slot={slot}
              reserveSlot={reserveSlot}
              court="Court 2"
              courtSlot={`court2slot${index + 1}`}
              userName={
                courtSlots &&
                courtSlots[`court2slot${index + 1}`] === user.userName
                  ? "cancel"
                  : user.userName
              }
              reservedBy={courtSlots && courtSlots[`court2slot${index + 1}`]}
              isOpen={courtSlots && courtSlots[`court2slot${index + 1}`] === ""}
              canCancel={
                courtSlots &&
                courtSlots[`court2slot${index + 1}`] === user.userName
              }
            />
            <TimeSlotDisplay
              slot={slot}
              reserveSlot={reserveSlot}
              court="Court 3"
              courtSlot={`court3slot${index + 1}`}
              userName={
                courtSlots &&
                courtSlots[`court3slot${index + 1}`] === user.userName
                  ? "cancel"
                  : user.userName
              }
              reservedBy={courtSlots && courtSlots[`court3slot${index + 1}`]}
              isOpen={courtSlots && courtSlots[`court3slot${index + 1}`] === ""}
              canCancel={
                courtSlots &&
                courtSlots[`court3slot${index + 1}`] === user.userName
              }
            />
          </>
        ))}
      </ul>
    </>
  );
};

export default ScheduleDay;
