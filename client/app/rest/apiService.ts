import axios from "axios"
import { Application } from "../utils/Types"
const URI = "http://localhost:8080/api/application"

export const getAllApplications = async (query: string) => {
  const response = await fetch(URI + "?query=" + query, {
    method: "GET",
  })
  const { data } = await response.json()
  return data
}

export const addNewApplication = async (formData: Application) => {
  const response = await fetch(URI, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formData), // body data type must match "Content-Type" header
  })
  const data = await response.json()
  return data
}
export const updateApplicationStatus = async(id : number, newStatus : string) => {
  const response = await fetch(URI + `/${id}/${newStatus}`, {
    method: "PUT",
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
  })
}
export const deleteApplication = async(id : number) => {
  console.log(id)
  const response = await fetch(URI + `/${id}`, {
    method: "DELETE",
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
  })
}