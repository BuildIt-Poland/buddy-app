import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
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
export declare type AuthPayload = {
    __typename?: 'AuthPayload';
    token: Scalars['String'];
    role: UserRole;
    userId: Scalars['ID'];
};
export declare type Buddy = User & {
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
export declare type BuddyTask = Task & {
    __typename?: 'BuddyTask';
    id: Scalars['ID'];
    title: Scalars['String'];
    description: Scalars['String'];
    createdAt: Scalars['DateTime'];
    status: TaskStatus;
    newbie: Newbie;
    implementationDate?: Maybe<Scalars['DateTime']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    addBuddy: Buddy;
    addNewbie: Newbie;
    deleteNewbie: Buddy;
    deleteBuddy: Buddy;
    login: AuthPayload;
    addNewbieTask: Task;
    addBuddyTask: Task;
    addFromTemplate: Newbie;
    deleteTask: Newbie;
    updateTask: Task;
};
export declare type MutationAddBuddyArgs = {
    input: UserInput;
};
export declare type MutationAddNewbieArgs = {
    buddyId: Scalars['ID'];
    input: UserInput;
};
export declare type MutationDeleteNewbieArgs = {
    newbieId: Scalars['ID'];
};
export declare type MutationDeleteBuddyArgs = {
    buddyId: Scalars['ID'];
};
export declare type MutationLoginArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationAddNewbieTaskArgs = {
    newbieId: Scalars['ID'];
    input: TaskInput;
};
export declare type MutationAddBuddyTaskArgs = {
    newbieId: Scalars['ID'];
    input: TaskInput;
};
export declare type MutationAddFromTemplateArgs = {
    newbieId: Scalars['ID'];
    template: TaskTemplates;
};
export declare type MutationDeleteTaskArgs = {
    taskId: Scalars['ID'];
};
export declare type MutationUpdateTaskArgs = {
    taskId: Scalars['ID'];
    input: TaskInput;
};
export declare type Newbie = User & {
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
};
export declare type NewbieTask = Task & {
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
export declare type Query = {
    __typename?: 'Query';
    newbie: Newbie;
    buddy: Buddy;
    task: Task;
    newbies: Array<Maybe<Newbie>>;
    newbieTasks: Array<Maybe<Task>>;
    buddyTasks: Array<Maybe<Task>>;
};
export declare type QueryNewbieArgs = {
    newbieId: Scalars['ID'];
};
export declare type QueryBuddyArgs = {
    buddyId: Scalars['ID'];
};
export declare type QueryTaskArgs = {
    taskId: Scalars['ID'];
};
export declare type QueryNewbiesArgs = {
    filter?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type QueryNewbieTasksArgs = {
    title?: Maybe<Scalars['String']>;
    status?: Maybe<TaskStatus>;
    first?: Maybe<Scalars['Int']>;
};
export declare type QueryBuddyTasksArgs = {
    title?: Maybe<Scalars['String']>;
    status?: Maybe<TaskStatus>;
    first?: Maybe<Scalars['Int']>;
};
export declare type Task = {
    id: Scalars['ID'];
    title: Scalars['String'];
    description: Scalars['String'];
    createdAt: Scalars['DateTime'];
    implementationDate?: Maybe<Scalars['DateTime']>;
    status: TaskStatus;
    newbie: Newbie;
};
export declare type TaskInput = {
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    status?: Maybe<TaskStatus>;
    implementationDate?: Maybe<Scalars['DateTime']>;
    notes?: Maybe<Scalars['String']>;
};
export declare enum TaskStatus {
    Completed = "COMPLETED",
    Uncompleted = "UNCOMPLETED"
}
export declare enum TaskTemplates {
    TplPl = "TPL_PL",
    TplIn = "TPL_IN",
    TplUs = "TPL_US",
    TplUkIe = "TPL_UK_IE"
}
export declare type User = {
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
export declare type UserInput = {
    email: Scalars['EmailAddress'];
    name: Scalars['String'];
    password: Scalars['String'];
    position?: Maybe<Scalars['String']>;
    photo?: Maybe<Scalars['URL']>;
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    startDate?: Maybe<Scalars['DateTime']>;
};
export declare enum UserRole {
    Newbie = "NEWBIE",
    Buddy = "BUDDY"
}
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes>;
export declare type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    Query: ResolverTypeWrapper<{}>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Newbie: ResolverTypeWrapper<Newbie>;
    User: ResolverTypeWrapper<User>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UserRole: UserRole;
    URL: ResolverTypeWrapper<Scalars['URL']>;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Buddy: ResolverTypeWrapper<Buddy>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    NewbieTask: ResolverTypeWrapper<NewbieTask>;
    Task: ResolverTypeWrapper<Task>;
    TaskStatus: TaskStatus;
    BuddyTask: ResolverTypeWrapper<BuddyTask>;
    Mutation: ResolverTypeWrapper<{}>;
    UserInput: UserInput;
    AuthPayload: ResolverTypeWrapper<AuthPayload>;
    TaskInput: TaskInput;
    TaskTemplates: TaskTemplates;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    Query: {};
    ID: Scalars['ID'];
    Newbie: Newbie;
    User: User;
    EmailAddress: Scalars['EmailAddress'];
    String: Scalars['String'];
    UserRole: UserRole;
    URL: Scalars['URL'];
    PhoneNumber: Scalars['PhoneNumber'];
    DateTime: Scalars['DateTime'];
    Boolean: Scalars['Boolean'];
    Buddy: Buddy;
    Int: Scalars['Int'];
    NewbieTask: NewbieTask;
    Task: Task;
    TaskStatus: TaskStatus;
    BuddyTask: BuddyTask;
    Mutation: {};
    UserInput: UserInput;
    AuthPayload: AuthPayload;
    TaskInput: TaskInput;
    TaskTemplates: TaskTemplates;
};
export declare type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
};
export declare type BuddyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Buddy'] = ResolversParentTypes['Buddy']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
    position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    photo?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    allowPushedNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    newbiesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    newbies?: Resolver<Array<Maybe<ResolversTypes['Newbie']>>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
};
export declare type BuddyTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuddyTask'] = ResolversParentTypes['BuddyTask']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
    newbie?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType>;
    implementationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
};
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
    name: 'EmailAddress';
}
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    addBuddy?: Resolver<ResolversTypes['Buddy'], ParentType, ContextType, RequireFields<MutationAddBuddyArgs, 'input'>>;
    addNewbie?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType, RequireFields<MutationAddNewbieArgs, 'buddyId' | 'input'>>;
    deleteNewbie?: Resolver<ResolversTypes['Buddy'], ParentType, ContextType, RequireFields<MutationDeleteNewbieArgs, 'newbieId'>>;
    deleteBuddy?: Resolver<ResolversTypes['Buddy'], ParentType, ContextType, RequireFields<MutationDeleteBuddyArgs, 'buddyId'>>;
    login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
    addNewbieTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationAddNewbieTaskArgs, 'newbieId' | 'input'>>;
    addBuddyTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationAddBuddyTaskArgs, 'newbieId' | 'input'>>;
    addFromTemplate?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType, RequireFields<MutationAddFromTemplateArgs, 'newbieId' | 'template'>>;
    deleteTask?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
    updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'taskId' | 'input'>>;
};
export declare type NewbieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Newbie'] = ResolversParentTypes['Newbie']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
    position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    photo?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    allowPushedNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    buddy?: Resolver<ResolversTypes['Buddy'], ParentType, ContextType>;
    notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    newbieTasks?: Resolver<Array<Maybe<ResolversTypes['NewbieTask']>>, ParentType, ContextType>;
    buddyTasks?: Resolver<Array<Maybe<ResolversTypes['BuddyTask']>>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
};
export declare type NewbieTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewbieTask'] = ResolversParentTypes['NewbieTask']> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
    newbie?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType>;
    implementationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
};
export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    newbie?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType, RequireFields<QueryNewbieArgs, 'newbieId'>>;
    buddy?: Resolver<ResolversTypes['Buddy'], ParentType, ContextType, RequireFields<QueryBuddyArgs, 'buddyId'>>;
    task?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryTaskArgs, 'taskId'>>;
    newbies?: Resolver<Array<Maybe<ResolversTypes['Newbie']>>, ParentType, ContextType, QueryNewbiesArgs>;
    newbieTasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType, QueryNewbieTasksArgs>;
    buddyTasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType, QueryBuddyTasksArgs>;
};
export declare type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
    __resolveType: TypeResolveFn<'NewbieTask' | 'BuddyTask', ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    implementationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
    newbie?: Resolver<ResolversTypes['Newbie'], ParentType, ContextType>;
};
export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
    name: 'URL';
}
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    __resolveType: TypeResolveFn<'Newbie' | 'Buddy', ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
    position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    photo?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    allowPushedNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    AuthPayload?: AuthPayloadResolvers<ContextType>;
    Buddy?: BuddyResolvers<ContextType>;
    BuddyTask?: BuddyTaskResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
    EmailAddress?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Newbie?: NewbieResolvers<ContextType>;
    NewbieTask?: NewbieTaskResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    Query?: QueryResolvers<ContextType>;
    Task?: TaskResolvers;
    URL?: GraphQLScalarType;
    User?: UserResolvers;
};
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
