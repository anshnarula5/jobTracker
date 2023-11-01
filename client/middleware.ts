import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("IN MIDDLEARE")
  if (typeof window !== "undefined") {
    // Accessing localStorage here
    const localStorageData = localStorage.getItem("USER");
    console.log("Data from localStorage:", localStorageData);
  } else {
    console.log("Window object not available");
  }

  // Do something with the value
  // const userToken = request.cookies.get('your-key')?.value;
  // if(!userToken) {
  //   console.log("JIIII")
  //    return NextResponse.redirect(new URL('/auth',request.url))
  // }

}

export const config = {
  matcher: [ '/dashboard', '/summary'],
}