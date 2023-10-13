import React, {useEffect, useMemo, useState} from 'react'
import NewApplicationButton from './buttons/NewApplicationButton'
import Ticket from './Ticket'
import { Application } from '../utils/Types';
import NewApplicationForm from './NewApplicationForm';
import { StatusMap } from '../utils/Constants';
import { deleteApplication, getAllApplications, updateApplicationStatus } from '../rest/apiService';
import { Droppable } from '../dashboard/Droppable';
import { SortableContext } from '@dnd-kit/sortable';

interface StatusCardProps {
  statusName: string;
  applications: Application[],
  setNewApplication : Function,
  newApplication: boolean
}

const StatusCard:React.FC<StatusCardProps> = ({ statusName, applications, setNewApplication, newApplication }) => {
  const [isFormOpen, setIsFormOpen] = useState<Boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(0)
  const status = useMemo(() => StatusMap.get(statusName), [statusName])
  useEffect(() => {
    setIsFormOpen(false)
  }, [newApplication])

  return (
    <div className=' bg-slate-700 rounded-lg flex-1 flex flex-col w-full text-neutral-300'>
      <Droppable id = {status}>
      <div className="px-2">
      <div className='flex justify-between p-2 items-center '>
        <h1 className='block font-sans text-3xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{statusName}</h1>
        <NewApplicationButton handleClick = {setIsFormOpen} isFormOpen = {isFormOpen}  />
      </div>
      <div >
        <NewApplicationForm isFormOpen = {isFormOpen} status = {status} setStatusCode = {setStatusCode} setNewApplication = {setNewApplication} />
        {applications && applications.length > 0 && applications.map((application :any) => (
          <Ticket application = {application} key = {application.id} status = {status} parent = {status}/>
        ))}
      </div>
      </div>

      </Droppable>
    </div>
  )
}

export default StatusCard