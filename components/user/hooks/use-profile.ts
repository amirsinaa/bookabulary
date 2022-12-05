import type {
  ProfileState,
  ProfileAction,
  ProfileReducerFunc
} from "@/components/user/types/profile";
import { UPDATE_PROFILE } from "@/components/user/api/UPDATE_PROFILE";
import { GET_PROFILE } from "@/components/user/api/GET_PROFILE";
import { useEffect, useReducer } from "react";

function profileReducer(state: ProfileState, action: ProfileAction) {
  const { type, payload } = action
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload.loading }
    case "SET_PROFILE":
      return {
        ...state, data: {
          username: payload.data.username,
          website: payload.data.website,
        }
      }
    case "SET_ERROR":
      return { ...state, error: payload.error };
    default:
      throw Error("Unkown action");
  }
}

export function useProfile(id: string) {
  const [profile, profileDispatch] = useReducer<ProfileReducerFunc>(profileReducer, {
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    (async () => {
      try {
        profileDispatch({ type: "SET_LOADING", payload: { loading: true } });
        const { data, error, status } = await GET_PROFILE(id);
        if (error && status !== 406) {
          profileDispatch({ type: "SET_ERROR", payload: { error: error.message } });
        }

        if (data) {
          profileDispatch({
            type: "SET_PROFILE", payload: {
              data: {
                username: data.username,
                website: data.website
              }
            }
          });
        }
      } finally {
        profileDispatch({ type: "SET_LOADING", payload: { loading: false } });
      }

    })();
  }, [id]);

  const update = async (profile) => {
    try {
      profileDispatch({ type: "SET_LOADING", payload: { loading: true } });
      const updates = {
        username: profile.username,
        website: profile.website,
        id: id
      }

      const { error, status } = await UPDATE_PROFILE(id, updates);
      if (error && status !== 200) {
        profileDispatch({ type: "SET_ERROR", payload: { error: error.message } });
      }

    }
    finally {
      profileDispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }
  return [{ profile }, { update }];
}