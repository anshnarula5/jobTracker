"use client"
import React, { useEffect, useState } from 'react'
import StatusCard from '../components/StatusCard'
import { APPLIED, COLD, INTERVIEW, REFERRED, REFREQ, StatusMap, } from '../utils/Constants'

import { DndContext } from '@dnd-kit/core'
import { Application } from '../utils/Types'
import { deleteApplication, getAllApplications, updateApplicationStatus } from '../rest/apiService'
import DeletionArea from './DeletionArea'

const Dashboard = () => {
  const [coldApplications, setColdApplications] = useState<Application[]>([]);
  const [refreqApplications, setRefReqApplications] = useState<Application[]>([]);
  const [referredApplications, setReferredApplications] = useState<Application[]>([]);
  const [appliedApplications, setAppliedApplications] = useState<Application[]>([]);
  const [intApplications, setIntApplications] = useState<Application[]>([]);
  const [updateStatus, setUpdateStatus] = useState<any>({})
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [newApplication, setNewApplication] = useState<boolean>(false)
  const getAppliedApplications = async () => {
    const apps = await getAllApplications("applied")
    return apps
  }

  const getRefReqApplications = async () => {
    const apps = await getAllApplications("referralRequested")
    return apps
  }
  const getReferredApplications = async () => {
    const apps = await getAllApplications("referred")
    return apps
  }
  const getColdApplications = async () => {
    const apps = await getAllApplications("cold")
    return apps
  }
  const getInterviewApplications = async () => {
    const apps = await getAllApplications("interview")
    return apps
  }
  const getApplications = async () => {
    const [applied, refereq, referred, cold, interview] = await Promise.all([getAppliedApplications(), getRefReqApplications(), getReferredApplications(), getColdApplications(), getInterviewApplications()])
    setAppliedApplications(applied)
    setColdApplications(cold)
    setRefReqApplications(refereq)
    setReferredApplications(referred)
    setIntApplications(interview)
  }
  const fn = async (jobId: any, status: any, parent: any, application: Application) => {
    if (status === parent) {
      setIsMoving(false)
      return
    }
    console.log(parent)
    console.log(status)
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
      case "cold":
        setColdApplications([application, ...coldApplications])
        break;
      case "interview":
        setIntApplications([application, ...intApplications])
        break;
      case "delete":
        await deleteApplication(jobId)
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
      case 'cold':
        setColdApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 'interview':
        setIntApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      default:
        break;
    }
    await updateApplicationStatus(jobId, status)
    setIsMoving(false)
  }

  useEffect(() => {
    getApplications()
  }, [newApplication])

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
    if (endingCol === undefined) return
    setUpdateStatus({
      jobId,
      status: endingCol,
      parent: startingCol,
      application: updatedApplication
    })
    console.log("Job Id : " + jobId + " From : " + startingCol + " TO : " + endingCol)
  }
  function handleDragStart(event: any) {
    setIsMoving(true)
    // console.log("START", event)
  }
  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className='flex flex-row space-x-6 px-8 py-3 flex-wrap justify-between items-start bg-slate-900 min-h-screen'>
        <StatusCard statusName={COLD} applications={coldApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={REFREQ} applications={refreqApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={REFERRED} applications={referredApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={APPLIED} applications={appliedApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={INTERVIEW} applications={intApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
      </div>
      {isMoving && <DeletionArea />}
    </DndContext>
  )
}

export default Dashboard


