function cancelSlot(courtSlot: string, court: string, slot: string): void {
  confirm(`Are you sure you want to cancel for ${court} from ${slot}?`);
}

export function TimeSlotDisplay({
  userName,
  slot,
  court,
  courtSlot,
  reservedBy,
  isOpen,
  canCancel = false,
  reserveSlot,
}: {
  userName: string;
  slot: string;
  court: string;
  courtSlot: string;
  reservedBy: string;
  isOpen: boolean;
  canCancel?: boolean;
  reserveSlot: Function;
}) {
  if (isOpen) {
    return (
      <li className="grid bg-green-400 dark:bg-green-600 rounded mb-4 lg:mb-0">
        <label
          htmlFor={courtSlot}
          className="flex text-green-800 dark:text-green-100"
        >
          <span className="grow p-2 pb-0 text-xs">{slot}</span>
          <span className="grow p-2 pb-0 text-xs text-right">{court}</span>
        </label>
        <button
          onClick={() => reserveSlot(courtSlot, court, slot, userName)}
          className="rounded-b h-20 font-bold text-xl text-green-200 dark:text-green-700 bg-green-600 dark:bg-green-400 mt-2"
          name={courtSlot}
          value={userName}
          id={courtSlot}
        >
          Reserve
        </button>
      </li>
    );
  } else if (canCancel) {
    return (
      <li className="grid bg-gray-400 dark:bg-gray-600 rounded mb-4 lg:mb-0">
        <label
          htmlFor={courtSlot}
          className="flex text-gray-700 dark:text-gray-100"
        >
          <span className="grow p-2 pb-0 text-xs">{slot}</span>
          <span className="grow p-2 pb-0 text-xs text-right">{court}</span>
        </label>
        <button
          onClick={() => cancelSlot(courtSlot, court, slot)}
          className="rounded-b h-20 font-bold text-xl text-white dark:text-gray-800 bg-gray-600 dark:bg-gray-400 mt-2"
          name={courtSlot}
          value={userName}
          id={courtSlot}
        >
          Cancel Reservation
        </button>
      </li>
    );
  } else {
    return (
      <li className="grid bg-red-300 dark:bg-red-600 rounded mb-4 lg:mb-0">
        <label
          htmlFor={courtSlot}
          className="flex text-red-800 dark:text-red-100"
        >
          <span className="grow p-2 pb-0 text-xs">{slot}</span>
          <span className="grow p-2 pb-0 text-xs text-right">{court}</span>
        </label>
        <button
          disabled
          className="
                  rounded-b
                  h-20
                  font-bold
                  text-xl text-white
                  dark:text-gray-800
                  bg-red-600
                  dark:bg-red-400
                  mt-2
                "
          name={courtSlot}
          id={courtSlot}
        >
          Reserved: {reservedBy}
        </button>
      </li>
    );
  }
}
