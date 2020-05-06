import { UserRole } from '@buddy-app/schema';
import { ROUTES } from 'shared/routes';
import {
  NEWBIE_CONTACT_DETAILS,
  BUDDY_CONTACT_DETAILS,
  TALENT_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';

export const getQueryData = (userId: string, newbieId: string, buddyId: string) =>
  !newbieId && !buddyId
    ? {
        [UserRole.Newbie]: {
          query: NEWBIE_CONTACT_DETAILS,
          variables: { newbieId: userId },
          userRole: UserRole.Newbie,
          editRoute: ROUTES.NEWBIE_EDIT_DETAILS,
        },
        [UserRole.Buddy]: {
          query: BUDDY_CONTACT_DETAILS,
          variables: { buddyId: userId },
          userRole: UserRole.Buddy,
          editRoute: ROUTES.BUDDY_EDIT_DETAILS,
        },
        [UserRole.Talent]: {
          query: TALENT_CONTACT_DETAILS,
          variables: { talentId: userId },
          userRole: UserRole.Talent,
          editRoute: ROUTES.TALENT_EDIT_DETAILS,
        },
      }
    : {
        [UserRole.Newbie]: {
          query: BUDDY_CONTACT_DETAILS,
          variables: { buddyId },
          userRole: UserRole.Buddy,
        },
        [UserRole.Buddy]: {
          query: NEWBIE_CONTACT_DETAILS,
          variables: { newbieId },
          userRole: UserRole.Newbie,
          editRoute: ROUTES.BUDDY_EDIT_NEWBIE_DETAILS.replace(':newbieId', newbieId),
        },
        [UserRole.Talent]: {
          query: newbieId ? NEWBIE_CONTACT_DETAILS : BUDDY_CONTACT_DETAILS,
          variables: { newbieId, buddyId },
          userRole: newbieId ? UserRole.Newbie : UserRole.Buddy,
          editRoute: newbieId
            ? ROUTES.TALENT_EDIT_NEWBIE_DETAILS.replace(':newbieId', newbieId)
            : ROUTES.TALENT_EDIT_BUDDY_DETAILS.replace(':buddyId', buddyId),
        },
      };
