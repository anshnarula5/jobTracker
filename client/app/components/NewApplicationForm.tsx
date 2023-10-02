import React, {useState}from 'react'
import { convertDate } from '../utils'
import { addNewApplication } from '../rest/apiService'

const NewApplicationForm = ({ isFormOpen, status, setStatusCode}: any) => {
  const [formData, setFormData] = useState({
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
  return (
    isFormOpen &&
    <div className='bg-red-100 p-3 my-2 mx-4 antialiased'>
      <div className=" max-w-md">
        <div className="flex flex-col gap-8">
          <label className="block">
            <span className="text-gray-700 pb-2">Company name</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full px-0.5 py-2 border-b-2 border-indigo-900"
              placeholder="Amazon"
              name='companyName'
              onChange={handleChange}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 pb-2">Job Id</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full px-0.5 py-2 border-b-2 border-indigo-900"
              placeholder="1234"
              name='jobId'
              onChange={handleChange}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 pb-2">Job Link</span>
            <input
              type="text"
              className="mt-0 bg-inherit block w-full px-0.5 py-2 border-b-2 border-indigo-900"
              name='jobLink'
              onChange={handleChange}
            />
          </label>
        <button onClick = {handleSubmit}>Submit</button>
        </div>
      </div>
    </div>

  )
}

export default NewApplicationForm