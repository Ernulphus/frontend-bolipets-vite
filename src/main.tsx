import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH0_AUDIENCE } from './app/utils/networkutils.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-mfr7elequ1t8bzzk.us.auth0.com"
      clientId="X6NjwxbU0SFg4GZkiy9wFYfYCSnuZxGG"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_AUDIENCE,
        scope: 'openid profile email read:pets create:pets'
      }}
      // useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
