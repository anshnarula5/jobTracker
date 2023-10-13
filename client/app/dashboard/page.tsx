"use client"
import React, { useEffect, useState } from 'react'
import StatusCard from '../components/StatusCard'
import { APPLIED, COLD, INTERVIEW, REFERRED, REFREQ, StatusMap, } from '../utils/Constants'

import { DndContext } from '@dnd-kit/core'
import { Application } from '../utils/Types'
import { getAllApplications, updateApplicationStatus } from '../rest/apiService'

const Dashboard = () => {
  const [coldApplications, setColdApplications] = useState<Application[]>([]);
  const [refreqApplications, setRefReqApplications] = useState<Application[]>([]);
  const [referredApplications, setReferredApplications] = useState<Application[]>([]);
  const [appliedApplications, setAppliedApplications] = useState<Application[]>([]);
  const [intApplications, setIntApplications] = useState<Application[]>([]);
  const [updateStatus, setUpdateStatus] = useState<any>({})

  const getAppliedApplications = async () => {
    const applied = await getAllApplications("applied")
    return applied
  }

  const getRefReqApplications = async () => {
    const applied = await getAllApplications("referralRequested")
    return applied
  }
  const getReferredApplications = async () => {
    const applied = await getAllApplications("referred")
    return applied
  }
  const getColdApplications = async () => {
    const applied = await getAllApplications("cold")
    return applied
  }
  const getApplications = async () => {
    const [applied, refereq, referred, cold] = await Promise.all([getAppliedApplications(), getRefReqApplications(), getReferredApplications(), getColdApplications()])
    setAppliedApplications(applied)
    setColdApplications(cold)
    setRefReqApplications(refereq)
    setReferredApplications(referred)
  }
  const fn = async (jobId: any, status: any, parent: any, application: Application) => {
    if (status === parent) return
    console.log(application)
    console.log(status)
    await updateApplicationStatus(jobId, status)
   
    switch (status) {
      case "referred":
        setReferredApplications([application, ...referredApplications])
        break;
      case "applied":
        setAppliedApplications([application, ...appliedApplications])
        break;
      case "referralRequested":
        setRefReqApplications([application, ...refreqApplications])
        break;
    }
    switch (parent) {
      case 'referred':
        setReferredApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 'applied':
        setAppliedApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 'referralRequested':
        setRefReqApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getApplications()
  }, [])

  useEffect(() => {
    fn(updateStatus.jobId, updateStatus.status, updateStatus.parent, updateStatus.application)
  },
    [updateStatus])

  function handleDragEnd(event: any) {
    // console.log("END", event)
    const startingCol = event.active.data.current?.parent ?? "";
    const updatedApplication = event.active.data.current?.application ?? {};
    const endingCol = event.over?.id;
    const jobId = event.active?.id
    if(endingCol === undefined) return
    setUpdateStatus({
      jobId,
      status: endingCol,
      parent: startingCol,
      application: updatedApplication
    })
    console.log("Job Id : " + jobId + " From : " + startingCol + " TO : " + endingCol)
  }
  function handleDragStart(event: any) {
    // console.log("START", event)
  }
  return (
    <div className='flex flex-row space-x-6 px-8 py-3 flex-wrap justify-between items-start bg-slate-900 min-h-screen'>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <StatusCard statusName={COLD} applications={coldApplications} />
        <StatusCard statusName={REFREQ} applications={refreqApplications} />
        <StatusCard statusName={REFERRED} applications={referredApplications} />
        <StatusCard statusName={APPLIED} applications={appliedApplications} />
        <StatusCard statusName={INTERVIEW} applications={intApplications} />
      </DndContext>
    </div>
  )
}

export default Dashboard