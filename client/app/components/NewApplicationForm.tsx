import React, {useState}from 'react'
import { convertDate } from '../utils'
import { addNewApplication } from '../rest/apiService'
import SubmitButton from './buttons/SubmitButton'

const NewApplicationForm = ({ isFormOpen, status, setStatusCode}: any) => {
  const [formData, setFormData] = useState<any>({
    companyName : "",
    jobId : "",
    jobLink : "",
    applied : status === 'applied',
    referralRequested : status === 'referralRequested',
    referred : status === 'referred',
  })
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async () => {
    const response = await addNewApplication(formData)
    const code = response.statusCode;
    console.log(response)
    setStatusCode(code)
   
  }
  const mountedStyle = { animation: "inAnimation 190ms ease-in" };
  return (
    isFormOpen &&
    <div className='bg-slate-900 p-5 my-2 antialiased rounded-xl text-neutral-300 text-lg '>
      <div className=" max-w-md">
        <div className="flex flex-col gap-8">
          <label className="block">
            <span className="pb-2 text-lg font-semibold antialiased">Company name</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 border-neutral-400 outline-none"
              name='companyName'
              onChange={handleChange}
              required
            />
          </label>
          <label className="block">
            <span className=" pb-2 text-lg font-semibold antialiased">Job Id</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 border-neutral-400 outline-none"
              name='jobId'
              onChange={handleChange}
              required
            />
          </label>
          <label className="block">
            <span className=" pb-2 text-lg font-semibold antialiased">Job Link</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full  pt-2 pb-1 px-0.5 border-b-2 border-neutral-400 outline-none"
              name='jobLink'
              onChange={handleChange}
              required
            />
          </label>
        <SubmitButton handleClick = {handleSubmit}>Add</SubmitButton>
        </div>
      </div>
    </div>

  )
}

export default NewApplicationForm