/* eslint-disable import/first, no-console */
require("dotenv").config();
import { prisma } from "../../src/generated/prisma-client";
import { newbiesData, buddyData } from "./seed-data";

async function main() {
  try {
    await prisma.deleteBuddy({ email: buddyData.email });
  } catch (error) {}

  const buddy = await prisma.createBuddy(buddyData);

  newbiesData.forEach(async newbieData => {
    const newbie = await prisma.createNewbie({
      ...newbieData.newbie,
      buddy: {
        connect: {
          id: buddy.id
        }
      }
    });

    for (const task of newbieData.newbieTasks) {
      await prisma.createNewbieTask({
        ...task,
        newbie: {
          connect: {
            id: newbie.id
          }
        }
      });
    }

    for (const task of newbieData.buddyTasks) {
      await prisma.createBuddyTask({
        ...task,
        newbie: {
          connect: {
            id: newbie.id
          }
        }
      });
    }
  });
}

main().catch(e => console.error(e));
