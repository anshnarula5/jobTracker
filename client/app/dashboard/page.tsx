"use client"
import React, { useState } from 'react'
import StatusCard from '../components/StatusCard'
import { APPLIED, COLD, INTERVIEW, REFERRED, REFREQ, StatusMap, } from '../utils/Constants'

import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { DndContext } from '@dnd-kit/core'

const Dashboard = () => {
  const [newAppliedId, setnewAppliedId] = useState(0)
  const [newReferredId, setnewReferredId] = useState(0)
  const [newRefReqId, setnewRefReqId] = useState(0)
  function handleDragEnd(event : any) {
    console.log("END", event)
    const startingCol = event.active.data.current?.parent ?? "";
    const endingCol= event.over?.id;
    const jobId = event.active?.id
    switch (endingCol){
      case StatusMap.get(REFERRED):
        setnewReferredId(jobId);
        break;
      case StatusMap.get(APPLIED):
        setnewAppliedId(jobId);
        break;
      case StatusMap.get(REFREQ):
        setnewRefReqId(jobId)
        break;
    }
     
  }
  function handleDragStart(event : any) {
    console.log("START", event)
  }
  return (
    <div className='flex flex-row space-x-6 px-8 py-3 flex-wrap justify-between items-start'>
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <StatusCard statusName = {COLD} />
        <StatusCard statusName = {REFREQ} updateCol = {newRefReqId} />
        <StatusCard statusName = {REFERRED} updateCol = {newReferredId} />
        <StatusCard statusName = {APPLIED} updateCol = {newAppliedId} />
        <StatusCard statusName = {INTERVIEW}/>
      </DndContext>
   
    </div>
  )
}

export default Dashboard