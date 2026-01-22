import { useApolloClient, useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { LOGOUT } from "../graphql/mutations";

export function useLogout() {
    const client = useApolloClient();
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const [logoutMutation] = useMutation(LOGOUT);
  
    return async () => {
      try {
        const res = await logoutMutation({
            context: {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            },
          });
        console.log('res', res);
      } catch (err) {
       console.log('err', err)
      } finally {
        await client.clearStore();     
        useUserStore.getState().logout(); 
        navigate("/");                   
      }
    };
  }
