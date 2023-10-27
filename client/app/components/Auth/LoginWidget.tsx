import React from 'react'
import {redirect} from 'next/navigation'
import {useOktaAuth} from "@okta/okta-react"
import OktaSigninWidget from './OktaSigninWidget'

const LoginWidget = ({config } : any) => {
    const {oktaAuth, authState} = useOktaAuth()
    const onSuccess = (tokens : any) => {
        oktaAuth.handleLoginRedirect(tokens)
    }   
    const onError = (err : any) => {
        console.log("Sign in Error : ", err)
    }
    if(!authState){
        return <div>Loading....</div>
    }

    return authState.isAuthenticated ? redirect('/') :  <div>
         <OktaSigninWidget config = {config} onSuccess = {onSuccess} onError = {onError} />
    </div>
}

export default LoginWidget