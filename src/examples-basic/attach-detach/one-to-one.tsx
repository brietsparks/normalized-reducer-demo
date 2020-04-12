import React, { useReducer, useState } from 'react';
import normalizedSlice, { Cardinalities, Id, Schema } from 'normalized-reducer';
import Grid from '@material-ui/core/Grid';

import { Layout } from '../../components/layout';
import { CardsContainer } from '../../components/card';
import Card from './Card';

export interface Account {
  email: string,
  profileId?: Id
}

export interface Profile {
  name: string
  accountId?: Id
}

export interface EntitiesState {
  entities: {
    account: Record<Id, Account>,
    profile: Record<Id, Profile>
  },
  ids: {
    account: Id[],
    profile: Id[],
  }
}

const schema: Schema = {
  account: {
    profileId: {
      type: 'profile',
      cardinality: Cardinalities.ONE,
      reciprocal: 'accountId',
    }
  },
  profile: {
    accountId: {
      type: 'account',
      cardinality: Cardinalities.ONE,
      reciprocal: 'profileId'
    }
  }
};

const { selectors, reducer, actionCreators } = normalizedSlice<EntitiesState>(schema);

const initialState: EntitiesState = {
  entities: {
    account: {
      'a1': { email: 'account1@example.com', profileId: 'u2' },
      'a2': { email: 'account2@example.com', profileId: 'u3' },
      'a3': { email: 'account3@example.com', profileId: undefined }
    },
    profile: {
      'u1': { name: 'Profile 1', accountId: undefined },
      'u2': { name: 'Profile 2', accountId: 'a1' },
      'u3': { name: 'Profile 3', accountId: 'a2' },
    }
  },
  ids: {
    account: ['a1', 'a2', 'a3'],
    profile: ['u1', 'u2', 'u3']
  }
};

export default function Example() {
  const [entitiesState, dispatch] = useReducer(reducer, initialState);
  const [selectedAccount, setSelectedAccount] = useState<Id|undefined>(undefined);
  const [selectedProfile, setSelectedProfile] = useState<Id|undefined>(undefined);

  const deselectAccount = () => setSelectedAccount(undefined);
  const deselectProfile = () => setSelectedProfile(undefined);

  const selectAccount = (id: Id) => {
    setSelectedAccount(id);
    deselectProfile();
  };

  const selectProfile = (id: Id) => {
    setSelectedProfile(id);
    deselectAccount();
  };

  const accountId = selectors.getIds(entitiesState, { type: 'account' });
  const profileId = selectors.getIds(entitiesState, { type: 'profile' });

  const attach = (ids: { accountId: Id, profileId: Id }) => {
    dispatch(actionCreators.attach('account', ids.accountId, 'profileId', ids.profileId));
  };

  const detach = (ids: { accountId: Id, profileId: Id }) => {
    dispatch(actionCreators.detach('account', ids.accountId, 'profileId', ids.profileId));
  };

  const main = (
    <Grid container>
      <Grid item sm={6}>
        <CardsContainer>
          {accountId.map(accountId => {
            const account = selectors.getEntity<Account>(entitiesState, { type: 'account', id: accountId });

            if (!account) {
              return null;
            }

            return (
              <Card
                id={accountId}
                text={account.email}
                isSelected={accountId === selectedAccount}
                attached={account.profileId}
                selectedRelatedId={selectedProfile}
                select={selectAccount}
                deselect={deselectAccount}
                attach={(accountId: Id, profileId: Id) => attach({ accountId, profileId })}
                detach={(accountId: Id, profileId: Id) => detach({ accountId, profileId })}
                checkboxSide="right"
              />
            )
          })}
        </CardsContainer>
      </Grid>
      <Grid item sm={6}>
        <CardsContainer>
          {profileId.map(profileId => {
            const profile = selectors.getEntity<Profile>(entitiesState, { type: 'profile', id: profileId });

            if (!profile) {
              return null;
            }

            return (
              <Card
                id={profileId}
                text={profile.name}
                isSelected={profileId === selectedProfile}
                attached={profile.accountId}
                selectedRelatedId={selectedAccount}
                select={selectProfile}
                deselect={deselectProfile}
                attach={(profileId: Id, accountId: Id) => attach({ profileId, accountId })}
                detach={(profileId: Id, accountId: Id) => detach({ profileId, accountId })}
                checkboxSide="left"
              />
            )
          })}
        </CardsContainer>
      </Grid>
    </Grid>
  );

  return (
    <Layout
      main={main}
      state={entitiesState}
    />
  )
}
