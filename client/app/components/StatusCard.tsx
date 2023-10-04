import React, {useEffect, useState} from 'react'
import NewApplicationButton from './buttons/NewApplicationButton'
import Ticket from './Ticket'
import { Application } from '../utils/Types';
import NewApplicationForm from './NewApplicationForm';
import { StatusMap } from '../utils/Constants';
import { getAllApplications } from '../rest/apiService';

interface StatusCardProps {
  statusName?: string;
  applications?: Application[],
  onUpdate?: any
}

const StatusCard = ({ statusName } :any) => {
  const [isFormOpen, setIsFormOpen] = useState<Boolean>(false);
  const [statusCode, setStatusCode] = useState(0);
  const [applications, setApplications] = useState<Application[]>([])
  const status = StatusMap.get(statusName)  
  const setData = async() => {
    const response = await getAllApplications(status)
    setApplications(response)
  }
  useEffect(() => {
    setData();
    if(statusCode === 200){
      setIsFormOpen(false)
    }
  }, [statusCode])
  return (
    <div className=' bg-slate-300 rounded-lg bg-opacity-40 flex-1 flex flex-col pb-3'>
      <div className='flex justify-between p-2 px-4 items-center '>
        <h1 className='block font-sans text-3xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{statusName}</h1>
        <NewApplicationButton handleClick = {setIsFormOpen}  />
      </div>
      <div >
        <NewApplicationForm isFormOpen = {isFormOpen} status = {status} setStatusCode = {setStatusCode} />
        {applications && applications.length > 0 && applications.map((application :any) => (
          <Ticket application = {application} key = {application.id} status = {status} />
        ))}
      </div>
    </div>
  )
}

export default StatusCard