import { useAuth0 } from "@auth0/auth0-react";
import { AUTH0_AUDIENCE } from "../app/utils/networkutils";

export default function LoginSignup() {  
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect({
    authorizationParams: {
      audience: AUTH0_AUDIENCE,
      scope: 'openid profile email read:pets',
    }
  })}>Log in or sign up</button>;
}