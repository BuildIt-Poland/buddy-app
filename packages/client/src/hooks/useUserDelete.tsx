import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { MutationResult } from '@apollo/react-common';
import { Mutation, Buddy, Query, UserRole } from '@buddy-app/schema';
import {
  DELETE_NEWBIE,
  DELETE_BUDDY,
  DELETE_TALENT,
} from 'graphql/delete-user.graphql';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import { BUDDY_SELECT } from 'graphql/buddy-select.graphql';
/* istanbul ignore file */
type UserDeleteHook = [(userId: string) => void, MutationResult];

const mutationQueries = {
  [UserRole.Newbie]: DELETE_NEWBIE,
  [UserRole.Buddy]: DELETE_BUDDY,
  [UserRole.Talent]: DELETE_TALENT,
};

const useUserDelete = (
  id: string,
  role: UserRole,
  userRole: UserRole,
  mutationOptions?: MutationHookOptions
): UserDeleteHook => {
  const [mutation, mutationResult] = useMutation<Partial<Mutation>>(
    mutationQueries[userRole],
    mutationOptions
  );
  const { client } = mutationResult;

  const deleteUser = (userId: string) => {
    if (client) {
      const deleteNewbie = () => {
        const data: Query | null = client.readQuery({
          query: NEWBIE_SELECT,
          variables: { buddyId: id },
        });

        if (data) {
          const optimisticResult = {
            ...data.buddy,
            newbies: data.buddy.newbies.filter(
              newbie => newbie && newbie.id !== userId
            ),
          };

          mutation({
            variables: { userId },
            optimisticResponse: {
              deleteNewbie: optimisticResult,
            },
          });
        }
      };

      try {
        switch (role) {
          case UserRole.Buddy:
            deleteNewbie();
            break;

          case UserRole.Talent:
            switch (userRole) {
              case UserRole.Newbie:
                deleteNewbie();
                break;

              case UserRole.Buddy:
                const talentData: Query | null = client.readQuery({
                  query: BUDDY_SELECT,
                  variables: { talentId: id },
                });

                if (talentData) {
                  const { buddies } = talentData.talent;
                  const buddyData = buddies.find(
                    buddy => buddy && buddy.id === userId
                  );

                  if (buddyData) {
                    const optimisticResult = {
                      ...buddyData,
                      talents: buddyData.talents.map(talent => ({
                        ...talent,
                        buddies:
                          talent &&
                          talent.buddies.filter(
                            buddy => buddy && buddy.id !== userId
                          ),
                      })),
                    } as Buddy;

                    mutation({
                      variables: { userId },
                      optimisticResponse: {
                        deleteBuddy: optimisticResult,
                      },
                    });
                  }
                }
                break;
            }

            break;
        }
      } catch (error) {}
    }
  };

  return [deleteUser, mutationResult];
};

export default useUserDelete;
