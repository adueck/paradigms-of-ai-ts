type Condition = string;
type Operation = {
  action: string;
  preConds: Condition[];
  addList: Condition[];
  delList: Condition[];
};
type State = Condition[];

function GPS(goals: Condition[]): "solved" | null {
  if (goals.every(achieve)) {
    return "solved";
  } else {
    return null;
  }
}

/**
 * a goal is achieved if it already holds,
 * or there is an appropriate op for it that
 * is applicable
 */
function achieve(goal: Condition): boolean {
  /**
   * an op is appropriate to a goal if it is in its add list
   */
  function appropriateP(op: Operation): boolean {
    return op.addList.includes(goal);
  }
  return state.includes(goal) || ops.filter(appropriateP).some(applyOp);
}

/**
 * Print a message and update state if op is applicable
 */
function applyOp(op: Operation): boolean {
  if (op.preConds.every(achieve)) {
    console.log(`Executing ${op.action}...`);
    // remove the delList
    state = [...new Set(state.filter((s) => !op.delList.includes(s)))];
    // add the addList
    state = [...new Set([...state, ...op.addList])];
    return true;
  }
  return false;
}

let state: Condition[] = [
  "have money",
  "have time",
  "have car",
  "at home",
  "have photos",
];

const ops: Operation[] = [
  {
    action: "go home",
    preConds: ["have car"],
    addList: ["at home"],
    delList: ["at store"],
  },
  {
    action: "arrange photos",
    preConds: ["have photos", "have time", "have scrapbook", "at home"],
    addList: ["have a personal scrapbook"],
    delList: ["have scrapbook", "have time"],
  },
  {
    action: "buy scrapbook",
    preConds: ["have money", "at store"],
    addList: ["have scrapbook"],
    delList: ["have money"],
  },
  {
    action: "go to store",
    preConds: ["have car"],
    addList: ["at store"],
    delList: ["at home"],
  },
];

console.log(GPS(["have a personal scrapbook"]));
console.log("resulting state:");
console.log(state);
