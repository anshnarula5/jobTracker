"use client"

import { useSelector } from "react-redux"
import withAuth from "./rest/withAuth"

const Home = () => {
  const userInfo = useSelector((state : any) => state.authReducer.value)
  console.log(userInfo)
  return (
      <main className="font-mono text-gray-50 ">
        Hello {userInfo.name}
      </main>
  )
}

export default withAuth(Home)