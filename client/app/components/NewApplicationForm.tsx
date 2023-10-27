import React, { useState } from 'react'
import { convertDate } from '../utils'
import { addNewApplication } from '../rest/apiService'
import SubmitButton from './buttons/SubmitButton'

const NewApplicationForm = ({ isFormOpen, status, setStatusCode, setNewApplication }: any) => {
  const [error, setError] = useState<boolean>(false)
  const [nameError, setNameError] = useState<boolean>(false);
  const [jobIdError, setJobIdError] = useState<boolean>(false);
  const [jobLinkError, setJobLinkError] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    companyName: "",
    jobId: "",
    jobLink: "",
    applied: status === 'applied',
    referralRequested: status === 'referralRequested',
    referred: status === 'referred',
    interview: status === 'interview'
  })
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (formData.companyName.trim().length === 0) setNameError(true)
    if (formData.jobId.trim().length === 0) setJobIdError(true)
    if (formData.jobLink.trim().length === 0) setJobLinkError(true)
    if (nameError === true || jobIdError === true) {
      setError(true);
      return;
    }
    const response = await addNewApplication(formData)
    const code = response.statusCode;
    console.log(response)
    setStatusCode(code)
    setNewApplication((prev: any) => !prev)
  }
  return (
    isFormOpen &&
    <div className='bg-slate-900 p-4 my-2 antialiased rounded-xl text-neutral-300  '>
      <form className=" max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <label className="block">
            <span className="pb-1 font-semibold antialiased">Company name</span>
            <input
              type="text"
              className={`mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 
              outline-none ${nameError ? "border-red-400" : "border-neutral-500"}`}
              name='companyName'
              onChange={handleChange}
              required
            />  
          </label>  
          <label className="block">
            <span className=" pb-1 font-semibold antialiased">Job Id</span>
            <input
              type="text"
              className={`mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 ${jobIdError ? "border-red-400" : "border-neutral-500"} outline-none`}
              name='jobId'
              onChange={handleChange}
              required
            />
          </label>
          <label className="block">
            <span className=" pb-1  font-semibold antialiased">Job Link</span>
            <input
              type="text"
              className={`mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 ${jobLinkError ? "border-red-400" : "border-neutral-500"} outline-none`}
              name='jobLink'
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className='text-red-700'>Please fill all fields</p>}
          <SubmitButton>Add</SubmitButton>
        </div>
      </form>
    </div>

  )
}

export default NewApplicationForm