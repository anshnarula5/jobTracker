import axios from "axios"
import { Application } from "../utils/Types"
const URI = "http://localhost:8080/api/application"


export const getAllApplications = async (query: string, token: string) => {
  const response = await fetch(URI + "?query=" + query, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  const { data } = await response.json()
  return data
}

export const addNewApplication = async (formData: Application, token: string) => {
  const response = await fetch(URI, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formData), // body data type must match "Content-Type" header
  })
  const data = await response.json()
  return data
}
export const updateApplicationStatus = async (id: number, newStatus: string, token: string) => {
  const response = await fetch(URI + `/update/${id}/${newStatus}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
}
export const deleteApplication = async (id: number, token: string) => {
  console.log(id)
  const response = await fetch(URI + `/delete/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
}

export const authenticate = async (formData: any) => {
  console.log(formData)
  let response
  try {
    response = await fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      body: JSON.stringify(formData),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
  } catch (e) {
    console.log(e)
  }
  console.log(response)
  const {data} = await response?.json()
  console.log(data)
  return data
}

export const register = async (formData: any) => {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
  const {data} = await response.json()
  return data
}