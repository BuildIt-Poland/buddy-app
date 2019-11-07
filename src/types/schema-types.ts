export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: any;
  URL: any;
  PhoneNumber: any;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  role: UserRole;
  userId: Scalars['ID'];
};

export type Buddy = User & {
  __typename?: 'Buddy';
  id: Scalars['ID'];
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  role: UserRole;
  position?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['URL']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  startDate?: Maybe<Scalars['DateTime']>;
  allowPushedNotifications: Scalars['Boolean'];
  newbiesCount: Scalars['Int'];
  newbies: Array<Maybe<Newbie>>;
};

export type BuddyTask = Task & {
  __typename?: 'BuddyTask';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  status: TaskStatus;
  newbie: Newbie;
  implementationDate?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBuddy: Buddy;
  addNewbie: Newbie;
  deleteNewbie: Newbie;
  deleteBuddy: Buddy;
  login: AuthPayload;
  addNewbieTask: Task;
  addBuddyTask: Task;
  deleteTask: Task;
  updateTask: Task;
  updateTaskStatus: Task;
};

export type MutationAddBuddyArgs = {
  input: UserInput;
};

export type MutationAddNewbieArgs = {
  buddyId: Scalars['ID'];
  input: UserInput;
};

export type MutationDeleteNewbieArgs = {
  newbieId: Scalars['ID'];
};

export type MutationDeleteBuddyArgs = {
  buddyId: Scalars['ID'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationAddNewbieTaskArgs = {
  newbieId: Scalars['ID'];
  input: TaskInput;
};

export type MutationAddBuddyTaskArgs = {
  newbieId: Scalars['ID'];
  input: TaskInput;
};

export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID'];
};

export type MutationUpdateTaskArgs = {
  taskId: Scalars['ID'];
  input: TaskInput;
};

export type MutationUpdateTaskStatusArgs = {
  taskId: Scalars['ID'];
};

export type Newbie = User & {
  __typename?: 'Newbie';
  id: Scalars['ID'];
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  role: UserRole;
  position?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['URL']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  startDate?: Maybe<Scalars['DateTime']>;
  allowPushedNotifications: Scalars['Boolean'];
  buddy: Buddy;
  notes?: Maybe<Scalars['String']>;
  newbieTasks: Array<Maybe<NewbieTask>>;
  buddyTasks: Array<Maybe<BuddyTask>>;
  tasksInfo: TasksInfo;
};

export type NewbieTask = Task & {
  __typename?: 'NewbieTask';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  status: TaskStatus;
  newbie: Newbie;
  implementationDate?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  newbie: Newbie;
  buddy: Buddy;
  task: Task;
  newbies: Array<Maybe<Newbie>>;
  newbieTasks: Array<Maybe<Task>>;
  buddyTasks: Array<Maybe<Task>>;
};

export type QueryNewbieArgs = {
  newbieId: Scalars['ID'];
};

export type QueryBuddyArgs = {
  buddyId: Scalars['ID'];
};

export type QueryTaskArgs = {
  taskId: Scalars['ID'];
};

export type QueryNewbiesArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

export type QueryNewbieTasksArgs = {
  title?: Maybe<Scalars['String']>;
  status?: Maybe<TaskStatus>;
  first?: Maybe<Scalars['Int']>;
};

export type QueryBuddyTasksArgs = {
  title?: Maybe<Scalars['String']>;
  status?: Maybe<TaskStatus>;
  first?: Maybe<Scalars['Int']>;
};

export type Task = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  implementationDate?: Maybe<Scalars['DateTime']>;
  status: TaskStatus;
  newbie: Newbie;
};

export type TaskInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<TaskStatus>;
  implementationDate?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
};

export type TasksInfo = {
  __typename?: 'TasksInfo';
  newbieProgress: Scalars['Float'];
  buddyProgress: Scalars['Float'];
  newbieCompleted: Scalars['Int'];
  newbieUncompleted: Scalars['Int'];
  buddyCompleted: Scalars['Int'];
  buddyUncompleted: Scalars['Int'];
};

export enum TaskStatus {
  Completed = 'COMPLETED',
  Uncompleted = 'UNCOMPLETED',
}

export type User = {
  id: Scalars['ID'];
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  role: UserRole;
  position?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['URL']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  startDate?: Maybe<Scalars['DateTime']>;
  allowPushedNotifications: Scalars['Boolean'];
};

export type UserInput = {
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  password: Scalars['String'];
  position?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['URL']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export enum UserRole {
  Newbie = 'NEWBIE',
  Buddy = 'BUDDY',
}
