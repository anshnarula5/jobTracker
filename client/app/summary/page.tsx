"use client"
import React, { useEffect, useState } from 'react'
import withAuth from '../rest/withAuth'
import Chart from "react-apexcharts";
import { getApplicationsCount, getCompanyDistribution, getReferralAnalysis, getStatusDistribution } from '../rest/apiService'
import { useSelector } from 'react-redux'
import PieChart from '../components/charts/PieChart';
import ReferralAnalysisChart from '../components/charts/ReferralAnalysisChart';
import BarChart from '../components/charts/BarChart';

const Summary = () => {
  const [statusDistribution, setStatusDistribution] = useState<any>()
  const [referralAnalysis, setReferralAnalysis] = useState<any>()
  const [applicationsCount, setApplicationsCount] = useState<number>()
  const [companyDistribution, setCompanyDistribution] = useState<any>()
  const userState = useSelector((state: any) => state.authReducer.value)
  const authtoken = userState.authToken;
  const getData = async () => {
    const status = await getStatusDistribution(authtoken)
    const referral = await getReferralAnalysis(authtoken)
    const count = await getApplicationsCount(authtoken)
    const companyData = await getCompanyDistribution(authtoken)
    console.log(referral)
    setStatusDistribution(status)
    setReferralAnalysis(referral)
    setApplicationsCount(count)
    setCompanyDistribution(companyData)
    console.log(companyData)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='min-h-screen min-w-full text-white flex flex-row flex-wrap justify-center items-center text-[50px] bg-slate-800 '>
      <div className=''>
        <div className='bg-green-500 p-4 rounded-md m-3 text-center'>
          <h4 className='text-[2.4rem]'>Total Applications</h4>
          <h5 className='text-[1.8rem]'>{applicationsCount}</h5>
        </div>
        <div className='bg-green-500 p-4 rounded-md m-3'> {companyDistribution && companyDistribution.length > 0 && <BarChart data={companyDistribution} />}</div>
      </div>
      <div className=''>
      <div className='bg-green-500 p-4 rounded-md m-3'>
          {statusDistribution && statusDistribution.length > 0 && <PieChart data={statusDistribution} />}
        </div>
        <div className='bg-green-500 p-4 rounded-md m-3'>
          {referralAnalysis && <ReferralAnalysisChart data={referralAnalysis} />}
        </div>
      </div>
    </div>
  )
}

export default withAuth(Summary)