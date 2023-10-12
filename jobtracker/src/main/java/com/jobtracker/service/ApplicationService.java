package com.jobtracker.service;

import com.jobtracker.dao.ApplicationDao;
import com.jobtracker.entity.Application;
import com.jobtracker.exception.ApplicationNotFoundException;
import com.jobtracker.rest.ApplicationErrorResponse;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;
import java.util.logging.Logger;

@Service
@Log4j2
public class ApplicationService {
    private final ApplicationDao applicationDao;

    @Autowired
    public ApplicationService(final ApplicationDao applicationDao){
        this.applicationDao = applicationDao;
    }
    @Transactional
    public Application createNewApplication(final Application application){
        final Date date = new Date();
        System.out.println("Inside service, creating new application on date : " + date);
        application.currentStatusDate = date;
        application.currentStatus = "interested";
        if(application.referralRequested) {
            application.referralRequestDate = date;
            application.currentStatus = "referral_requested";
        }else if(application.referred){
            application.referredDate = date;
            application.currentStatus = "referred";
        }
        else if(application.applied){
            application.appliedDate = date;
            application.currentStatus = "applied";
        }
        Application response =  applicationDao.save(application);
        System.out.println("Application created  - success - service : "+ response.getId());
        return response;
    }

    public List<Application> getAllApplications(){
        return applicationDao.getAllApplications();
    }
    public List<List<Application>> getAllApplicationsForDashboard(){
        final List<Application> referralRequestedApplications =  applicationDao.getAllReferralRequestedApplications();
        final List<Application> allColdApplications =  applicationDao.getAllColdApplications();
        final List<Application> allAppliedApplications =  applicationDao.getAllAppliedApplications();
        final List<Application> allReferredApplications =  applicationDao.getAllReferredApplications();

        final List<List<Application>> allApplications = new ArrayList<>();
        allApplications.add(referralRequestedApplications);
        allApplications.add(allColdApplications);
        allApplications.add(allAppliedApplications);
        allApplications.add(allReferredApplications);
        return allApplications;
    }
    public List<Application> getAllReferralRequestedApplications() {
        final List<Application> referralRequestedApplications =  applicationDao.getAllReferralRequestedApplications();
        return referralRequestedApplications;
    }
    public List<Application> getAllReferredApplications() {
        final List<Application> allReferredApplications =  applicationDao.getAllReferredApplications();
        return allReferredApplications;
    }
    public List<Application> getAllAppliedApplications() {
        final List<Application> allAppliedApplications =  applicationDao.getAllAppliedApplications();
        return allAppliedApplications;
    }
    public List<Application> getAllColdApplications() {
        final List<Application> allColdApplications =  applicationDao.getAllColdApplications();
        return allColdApplications;
    }
    @Transactional
    public void updateApplicationStatus(int id, String status){
        if(!applicationDao.idExists(id)){
            throw new ApplicationContextException("Id does not exist - " + id );
        }
        Date date = new Date();
        switch (status){
            case "referralRequested":
                System.out.println("Inside service, marking referral requested for id" + id + "on date" + date);
                applicationDao.markReferralRequested(id, date);
                break;
            case "referred":
                System.out.println("Inside service, marking referred for id" + id + "on date" + date);
                applicationDao.markReferred(id, date);
                break;
            case "applied":
                System.out.println("Inside service, marking applied for id" + id + "on date" + date);
                applicationDao.markApplied(id, date);
                break;
            default:
                System.out.println("Bad request");
        }
        System.out.println("Signing off - service");
    }
}
