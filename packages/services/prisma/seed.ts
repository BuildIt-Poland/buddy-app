/* eslint-disable import/first, no-console */
require("dotenv").config();
import { prisma } from "../src/generated/prisma-client";
import {
  sampleBuddy,
  sampleBuddyTasks,
  sampleNewbie,
  sampleNewbieTasks
} from "./seed-data";

async function main() {
  const buddy = await prisma.createBuddy(sampleBuddy);

  const newbie = await prisma.createNewbie({
    ...sampleNewbie,
    buddy: {
      connect: {
        id: buddy.id
      }
    }
  });

  for (const task of sampleNewbieTasks) {
    await prisma.createNewbieTask({
      ...task,
      newbie: {
        connect: {
          id: newbie.id
        }
      }
    });
  }

  for (const task of sampleBuddyTasks) {
    await prisma.createBuddyTask({
      ...task,
      newbie: {
        connect: {
          id: newbie.id
        }
      }
    });
  }
}

main().catch(e => console.error(e));
