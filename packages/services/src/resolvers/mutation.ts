import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MutationResolvers, Task } from "@buddy-app/schema";
import { templateTaskListQuery, taskQuery, newbieQuery } from "../graphql";
import { sendEmail, getForgotPasswordTemplate } from "../email";
import ERRORS from "../errors";

const secret = process.env.APP_SECRET as string;

const addNewbie: MutationResolvers["addNewbie"] = async (
  parent,
  { buddyId, input },
  context
) => {
  const { email } = input;
  const password = await bcrypt.hash(input.password || "", 10);
  const userExist = await context.prisma.$exists.newbie({ email });

  if (userExist) {
    throw new ERRORS.ACCOUNT_EXIST();
  }

  const newbie = await context.prisma.createNewbie({
    ...input,
    password,
    buddy: {
      connect: { id: buddyId }
    }
  });

  return newbie;
};

const addBuddy: MutationResolvers["addBuddy"] = async (
  parent,
  { input },
  context
) => {
  const { email } = input;
  const password = await bcrypt.hash(input.password || "", 10);

  const userExist = await context.prisma.$exists.buddy({ email });

  if (userExist) {
    throw new ERRORS.ACCOUNT_EXIST();
  }

  const buddy = await context.prisma.createBuddy({ ...input, password });

  return buddy;
};

const addTalent: MutationResolvers["addTalent"] = async (
  parent,
  { input },
  context
) => {
  const password = await bcrypt.hash(input.password || "", 10);

  const userExist = await context.prisma.$exists.talent({
    email: input.email
  });

  if (userExist) {
    throw new ERRORS.ACCOUNT_EXIST();
  }

  const talent = await context.prisma.createTalent({ ...input, password });

  return talent;
};

const deleteNewbie: MutationResolvers["deleteNewbie"] = async (
  parent,
  { newbieId },
  context
) => {
  const result = await context.prisma.$graphql(newbieQuery, { id: newbieId });
  try {
    await context.prisma.deleteNewbie({ id: newbieId });
    return result.newbie.buddy;
  } catch (error) {
    throw new ERRORS.NO_USER_FOUND();
  }
};

const deleteBuddy: MutationResolvers["deleteBuddy"] = async (
  parent,
  { buddyId },
  context
) => {
  try {
    return await context.prisma.deleteBuddy({ id: buddyId });
  } catch (error) {
    throw new ERRORS.NO_USER_FOUND();
  }
};

const deleteTalent: MutationResolvers["deleteTalent"] = async (
  parent,
  { talentId },
  context
) => {
  try {
    return await context.prisma.deleteTalent({ id: talentId });
  } catch (error) {
    throw new ERRORS.NO_USER_FOUND();
  }
};

const updateUser: MutationResolvers["updateUser"] = async (
  parent,
  { userId, input },
  context
) => {
  if (input.password) {
    input.password = await bcrypt.hash(input.password || "", 10);
  }

  try {
    const updatedNewbie = await context.prisma.updateNewbie({
      data: {
        ...input
      },
      where: {
        id: userId
      }
    });
    return updatedNewbie;
  } catch (error) {}

  try {
    const updatedBuddy = await context.prisma.updateBuddy({
      data: {
        ...input
      },
      where: {
        id: userId
      }
    });

    return updatedBuddy;
  } catch (error) {}

  try {
    const updatedTalent = await context.prisma.updatedTalent({
      data: {
        ...input
      },
      where: {
        id: userId
      }
    });

    return updatedTalent;
  } catch (error) {}

  throw new ERRORS.NO_USER_FOUND();
};

const login: MutationResolvers["login"] = async (
  parent,
  { email, password },
  context
) => {
  const newbie = await context.prisma.newbie({ email });
  const buddy = await context.prisma.buddy({ email });
  const talent = await context.prisma.talent({ email });

  const user = newbie || buddy || talent;

  if (!user) {
    throw new ERRORS.NO_USER_FOUND();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ERRORS.INVALID_PASSWORD();
  }

  return {
    token: jwt.sign({ userId: user.id }, secret, {
      expiresIn: "1d"
    }),
    role: user.role,
    userId: user.id
  };
};

const sendResetPasswordLink: MutationResolvers["sendResetPasswordLink"] = async (
  parent,
  { email, url },
  context
) => {
  const newbie = await context.prisma.newbie({ email });
  const buddy = await context.prisma.buddy({ email });
  const talent = await context.prisma.talent({ email });

  const user = newbie || buddy || talent;

  if (!user) {
    throw new ERRORS.INTERNAL();
  }

  const token = jwt.sign({ userId: user.id }, secret, {
    expiresIn: "1h"
  });
  const link = `${url}/${token}`;
  const { subject, html, text } = getForgotPasswordTemplate(user.name, link);

  try {
    await sendEmail(user.email, subject, html, text);
  } catch (error) {
    throw ERRORS.INTERNAL();
  }

  return {
    token,
    role: user.role,
    userId: user.id
  };
};

const addNewbieTask: MutationResolvers["addNewbieTask"] = async (
  parent,
  { newbieId, input },
  context
) =>
  await context.prisma.createNewbieTask({
    ...input,
    newbie: {
      connect: { id: newbieId }
    }
  });

const addBuddyTask: MutationResolvers["addBuddyTask"] = async (
  parent,
  { newbieId, input },
  context
) =>
  await context.prisma.createBuddyTask({
    ...input,
    newbie: {
      connect: { id: newbieId }
    }
  });

const addFromTemplate: MutationResolvers["addFromTemplate"] = async (
  parent,
  { newbieId, template },
  context,
  info
) => {
  const result = await context.prisma.$graphql(templateTaskListQuery, {
    template
  });

  try {
    const {
      newbie: { newbieTasks, buddyTasks }
    } = result;

    newbieTasks.forEach(
      async (input: Task) =>
        await addNewbieTask(parent, { input, newbieId }, context, info)
    );

    buddyTasks.forEach(
      async (input: Task) =>
        await addBuddyTask(parent, { input, newbieId }, context, info)
    );
  } catch (error) {
    throw new ERRORS.NO_TEMPLATE_FOUND();
  }

  return await context.prisma.newbie({ id: newbieId });
};

const deleteTask: MutationResolvers["deleteTask"] = async (
  parent,
  { taskId },
  context
) => {
  const result = await context.prisma.$graphql(taskQuery, { id: taskId });

  try {
    await context.prisma.deleteBuddyTask({
      id: taskId
    });

    return result.buddyTask.newbie;
  } catch (error) {}

  try {
    await context.prisma.deleteNewbieTask({
      id: taskId
    });

    return result.newbieTask.newbie;
  } catch (error) {}

  throw new ERRORS.NO_TASK_FOUND();
};

const updateTask: MutationResolvers["updateTask"] = async (
  parent,
  { taskId, input },
  context
) => {
  try {
    const updatedBuddyTask = await context.prisma.updateBuddyTask({
      data: {
        ...input
      },
      where: {
        id: taskId
      }
    });

    return updatedBuddyTask;
  } catch (error) {}

  try {
    const updatedNewbieTask = await context.prisma.updateNewbieTask({
      data: {
        ...input
      },
      where: {
        id: taskId
      }
    });
    return updatedNewbieTask;
  } catch (error) {}

  throw new ERRORS.NO_TASK_FOUND();
};

const mustations: MutationResolvers = {
  addNewbie,
  addBuddy,
  addTalent,
  deleteNewbie,
  deleteBuddy,
  deleteTalent,
  updateUser,
  login,
  sendResetPasswordLink,
  addNewbieTask,
  addBuddyTask,
  addFromTemplate,
  deleteTask,
  updateTask
};

export default mustations;
