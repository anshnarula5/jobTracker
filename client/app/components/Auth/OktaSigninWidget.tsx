import React, { useEffect, useRef } from 'react'
import LoginWidget from './LoginWidget'
import OktaSignIn from '@okta/okta-signin-widget'
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"
import { oktaConfig } from '@/app/utils/oktaConfig'

const OktaSigninWidget = ({ onSuccess, onError }: any) => {
  const widgetRef = useRef<any>()
  useEffect(() => {
    if (!widgetRef.current) return;
    const widget = new OktaSignIn(oktaConfig)
    widget.showSignInToGetTokens({
      el : widgetRef.current
    }).then(onSuccess).catch(onError)
    return () => widget.remove()
  }, [onSuccess, onError])

  return (
    <div className='p-5 m-5'>
      <div ref={widgetRef}></div>
    </div>  
  )
}

export default OktaSigninWidget