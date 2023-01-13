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

  /*let membersList = [
    ['Mark', 'Ahlemann', '630-302-2458', 'markahlemann@aol.com'],
    ['Kang-Hyun', 'Ahn', '650-400-8483', 'khahn92@gmail.com'],
    ['Mark', 'Ailes', '630-956-6334', 'markailes@att.net'],
    ['Bob', 'Almada', '630-290-7903', 'balmaday@yahoo.com'],
    ['Naveen', 'Amradi', '901-299-4483', 'namradi@gmail.com'],
    ['Douglas', 'Anderson', '773-993-9213', 'dja709@gmail.com'],
    ['Teri', 'Ayotte', '630-418-2027', 'tennisnut1510@aol.com'],
    [
      'Charles',
      'Balisalisa',
      '630-333-0652',
      'charles_balisalisa@yahoo.com',
    ],
    [
      'Jack',
      'Battiste',
      '773-331-0281',
      'chicagojack.tennis@gmail.com',
    ],
    ['Mike', 'Berk', '312-498-6120', 'mike.d.berk@gmail.com'],
    [
      'Katharine',
      'Bertani',
      '773-259-3056',
      'katharinebertani@gmail.com',
    ],
    ['Vipin', 'Bhatia', '608-852-0466', 'vipinbhatia1@gmail.com'],
    ['Adam', 'Bierly', '630-991-6661', 'jeremybierly@gmail.com'],
    ['Jeremy', 'Bierly', '773-520-4501', 'jeremybierly@gmail.com'],
    ['Joy', 'Brabec', '312-406-1764', 'joybrabec@gmail.com'],
    ['Sasha', 'Brady', '340-626-4877', 'sashabrady@yahoo.com'],
    ['Marek', 'Brozyna', '847-208-7093', 'Brozynamark@hotmail.com'],
    ['Craig', ' Brutlag', ' 630-518-8778', 'ravenbrutlag@gmail.com'],
    [
      'Christian',
      'Cayetuna',
      '331-775-8889',
      'christiancayetuna@gmail.com',
    ],
    ['Sabrina', 'Chan', '630-965-5559', 'sabrinacml@gmail.com'],
    ['Bob', 'Cherry', '630-415-9252', 'BPCherry@aol.com'],
    ['Quan', 'Choi', '847-207-6459', 'quanchoi@gmail.com'],
    ['Veronica', 'Cisowski', '630-842-0998', 'vcisowski@comcast.net'],
    ['Mason', 'Cullerton', '630-862-7064', 'e.s.cullerton@gmail.com'],
    ['Om', 'Dhingra', '630-886-9290', 'okindia@aol.com'],
    ['Canh', 'Diep', '815-931-4521', 'csdiep@sbcglobal.net'],
    [
      'Steve',
      'Dolatowski',
      '630-886-8537',
      'steve.dolatowski@gmail.com',
    ],
    ['Danielle', 'Dulzer', '630-408-8327', 'danidulzer@yahoo.com'],
    ['Jim', 'Egerton', '630-209-5072', 'egertonj22@aol.com'],
    ['Charmaine', 'Fair', '630-452-2368', 'firstsaturdays@proton.me'],
    ['Michael', 'Feldman', '630-877-6846', 'mikemsf41@comcast.net'],
    ['Victor', 'Fiala', '630-202-4652', 'vafiala@gmail.com'],
    ['David', ' Ficht', '630-779-3880', 'david_ficht@comcast.net'],
    ['Anne', 'Flanz', '630 710-0876', 'aflanz-cmr@att.net'],
    ['David', 'Fortner', '239-297-0737', 'dwfortn@msn.com'],
    ['Ethan', 'Fowler', '315-440-7330', 'ethan.fowler@comcast.net'],
    ['Charles', 'Furrer', '630-408-5400', 'cthecrest@gmail.com'],
    ['Tom', 'Fuster', '630-926-1763', 'tom.fuster8@gmail.com'],
    ['Glenn', 'Gaffney', '630-202-4989', 'glenn@gaffneylawpc.com '],
    ['Joseph', 'Gjata', '630-346-0269', 'jgjata08@gmail.com'],
    ['Dave', 'Gradl', '630-983-0128', 'gradldave@gmail.com'],
    ['Douglas', 'Green 224-634-8366', 'greendoug142@gmail.com'],
    ['Mark', 'Gross 630-209-8324', 'mgrossgb@gmail.com'],
    ['Rahul', 'Gupta', '815-575-4357', 'rgupy1211@gmail.com'],
    ['Craig', 'Hagerman', '312-925-6419', 'chagermansa@gmail.com'],
    ['Darlene', 'Harris', '630-308-0668', 'viola1055@comcast.net'],
    ['Lyle', 'Haskin', '630-977-8494', 'lylehaskin@gmail.com'],
    ['Kate', 'Hinson', '312-952-5801', 'katzhinson@gmail.com'],
    ['Deven', 'Hinson', '312-952-5801', 'katzhinson@gmail.com'],
    ['Tao', 'Hong', '7576303355', 'hongtao23@gmail.com'],
    ['Scott', 'Houston 331-457-3216', 'houston.scott@yahoo.com'],
    ['Gerry', 'Houston 630-673-0698', 'geraldahouston@hotmail.com'],
    ['Liz', 'Huffman', ' 630-947-4857', 'bizhuffman@gmail.com'],
    ['Nate', 'Janssen 847-224-7859', 'NATEJANSSEN@YAHOO.COM'],
    ['Ron', 'Johnson 630-917-3236', 'upsman75@outlook.com'],
    ['Kristine', 'Johnson 630-901-5415', 'kyteh555@msn.com'],
    ['Kelley', 'Kalinich', '16304642631 kalinich@sbcglobal.net'],
    [
      'Ryan',
      'Kannegiesser',
      '630-442-8313',
      'rkannegiesser@gmail.com',
    ],
    ['Kirk', 'Kerndl', '630-995-5954', 'kirkkerndl@gmail.com'],
    ['Laurel', 'Kietzman', '331-645-6569', 'lollypaloo@gmail.com'],
    ['Edward', 'Knight', '630-751-9075', 'krisanded@gmail.com'],
    ['Daniel', 'Koeritz 630-346-5473', 'dkoeritz@comcast.net'],
    ['HAENG', 'KOO', '312-480-0707', 'hskoo1@gmail.com'],
    ['Katrina', 'Kuhn', '630-415-7151', 'katjimkuhn@comcast.net'],
    ['Sudhir', 'Kunnath 630-701-0921', 'kmsudhir@hotmail.com'],
    ['Kelley', 'Laesch', '630-207-8328', 'klaesch@comcast.net'],
    ['John', 'Lamberts', '630-205-0179', 'jrlamberts@gmail.com'],
    ['Justin', 'Lee 630-965-8315', 'Leetime06@gmail.com'],
    ['Yanson', 'Lew 16307305835 jacklynchin@gmail.com'],
    ['Arin', 'M', '331-645-0027', 'baba10soccer@gmail.com'],
    ['Ryan', 'Madjos', '708-657-5274', 'ryanmadjos@yahoo.com'],
    ['Lauri Malee 773-315-9933', 'lauriguyon@hotmail.com'],
    ['Susanna Maltby', '6306600667', 'jmmaltby@msn.com'],
    ['Brian McCoy 630-699-8187', 'brianpmccoy1@gmail.com'],
    ['Martne', 'McCoy 630-742-3536', 'martne.brian@gmail.com'],
    ['Brian McCoy 630-699-8187', 'brianpmccoy1@gmail.com'],
    ['Jacalyn McElmeel', '630-247-6277', 'jackiemcelmeel@gmail.com'],
    ['Mayank', 'Mehta 630-624-7043', 'Mayank96@gmail.com'],
    ['Charlie Meyer 773-218-4800', 'cjmplacid@gmail.com'],
    ['Joseph', 'Miller', '630-209-9970', 'jmiller@ottosenbritz.com'],
    ['Rick', 'Miller', '630-800-6341', 'rickpmiller@gmail.com'],
    ['Jack', 'Miller', '630 456 3035', 'jbmyep@gmail.com'],
    ['Kevin Moore 630-697-9585', 'kevlamoore@yahoo.com'],
    ['Connie', 'Morawski', '630-842-0510', 'rxconmun@aol.com'],
    ['Connie', 'Morawski', '630-842-0510', 'rxconmun@aol.com'],
    ['June', 'Nano', '630-345-0103', 'june.nano@yahoo.com'],
    ['Andrew', 'Nguyen', '630-675-7892', 'ahnguyen60@gmail.com'],
    ['Jinho Park', '630.991.3445', 'jinhopark1972@gmail.com'],
    ['Joonhee Elliot', 'Park', '630-881-0627', 'filmpark@gmail.com'],
    ['Derek Paschal 312-282-1218', 'dcpaschal@yahoo.com'],
    ['Michael', ' Patrick 630-674-0850', 'readysports@yahoo.com'],
    ['Edgar Pe', '630-776-0696', 'peeg02@hotmail.com'],
    [
      'Margaret',
      'Pierce',
      '630-327-0143',
      'margiepierce48@gmail.com',
    ],
    ['Durai Ponnalagu 224-628-5029', 'hidurai@gmail.com'],
    ['Cathy Reick 630-991-1527', 'creick@yorktownindustries.com'],
    ['Kenny Reick 630-418-1583', 'reick@wisc.edu'],
    ['Kenny Reick 630-418-1583', 'reick@wisc.edu'],
    ['Ty', 'Reiman', '303708974 tyjreiman@yahoo.com'],
    ['kathryn Reinhart', '630-696-2707', 'kdreinhart@comcast.net'],
    ['max Reinhart', '6306962707', 'kdreinhart@comcast.net'],
    ['Kay Richards', '630-242-0742', 'klrichards501@yahoo.com'],
    ['Mike', 'Robb', '630-770-7899', 'robb.michael@gmail.com'],
    ['Barb', 'Rueth 630-215-3010', 'barb.rueth@gmail.com'],
    ['Hannah', 'Sams', '6303383422', 'beckysams21@gmail.com'],
    ['Thomas', 'Scaliatine', '847-875-9273', 'tscaliatine@gmail.com'],
    ['J', 'Schwan', '312-371-3425', 'j@theschwans.io'],
    ['Pratik', 'Shah', '847-372-1002', 'Pratikshah26@gmail.com'],
    ['Scott Sheaman 530-908-1271', 'sheaman71b@gmail.com'],
    ['Youngho Shin', '708-927-1901', 'iyouwealllive@gmail.com'],
    ['Chad', 'Simon', '630-333-7342', 'chadsimon@live.com'],
    ['Jeet', 'Singh', '630-544-9707', 'jeetsingh377@gmail.com'],
    ['Mike', 'Smith', '773-960-5830', 'tmsjr0111@gmail.com'],
    ['Kathy', 'Steele', '630-205-3342', 'kathy@redcaffeine.com'],
    ['Jacob', 'Steiger 2015275900', 'jacob.s.steiger@gmail.com'],
    ['Bob', 'Stozek', '630-606-7497', 'kezots@prodigy.net'],
    ['Reynaldo', 'Tate', '815-603-3110', 'junrey7473@yahoo.com'],
    ['Mauricio', 'Tellez', '630-750-3845', 'mitpro@netzero.com'],
    ['Mash', 'Tolentino 630 618 1244', 'tennismas@aol.com'],
    [
      'Wilson',
      'Troutman',
      '312-576-9125',
      'wilson.troutman@gmail.com',
    ],
    [
      'Srikanth',
      'Vellanki',
      '630-561-7930',
      'vellanki.srikanth@gmail.com',
    ],
    ['Mel', 'Venegas', ' 630 222 6439', 'melevenegas@gmail.com'],
    ['Andy', 'Vuong', '815-209-8120', 'andyvuong@gmail.com'],
    ['Jeff', 'White', '630-336-9250', 'jeffwhite1224@gmail.com'],
    ['Wojciech', 'Wiacek', '773-491-4171', 'wo.wiacek@gmail.com'],
    ['Vincent Wong', '630-918-1019', 'vwong9@gmail.com'],
    ['Jae', 'Yu', '224-766-1478', 'tennismasterjae@gmail.com'],
    ['Aaron', 'Zhu ', '312-823-3547', 'kefeng.zhu@gmail.com'],
    ['Walt', 'Zlotow', '630-442-3045', 'zlotow@hotmail.com'],
  ];*/
  return (
    <>
      <h1>Members</h1>
      {membersList.map((member: Array, index: number) => (
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
