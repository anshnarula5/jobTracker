package com.jobtracker.service;

import com.jobtracker.dao.ApplicationDao;
import com.jobtracker.entity.Application;
import com.jobtracker.entity.User;
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
    private final AuthService authService;

    @Autowired
    public ApplicationService(final ApplicationDao applicationDao, final AuthService authService){
        this.applicationDao = applicationDao;
        this.authService = authService;
    }
    @Transactional
    public Application createNewApplication(final Application application){
        final Date date = new Date();
        System.out.println("Inside service, creating new application on date : " + date);

        User user = authService.getLoggedInUser();
        if (user != null) {
            application.setUserId(user.getId());
        } else {
            // Handle the case where the user is not found
            throw new ApplicationContextException("User not found");
        }

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
        else if(application.interview){
            application.interviewDate = date;
            application.currentStatus = "interview";
        }
        Application response =  applicationDao.save(application);
        System.out.println("Application created  - success - service : "+ response.getId());
        return response;
    }

    public List<Application> getAllApplications(){
        final User user = authService.getLoggedInUser();
        if (user != null) {
            return applicationDao.getAllApplications(user.getId());
        } else {
            // Handle the case where the user is not found
            throw new ApplicationContextException("User not found");
        }
    }
//    public List<List<Application>> getAllApplicationsForDashboard(){
//
//        final List<Application> referralRequestedApplications =  applicationDao.getAllReferralRequestedApplications();
//        final List<Application> allColdApplications =  applicationDao.getAllColdApplications();
//        final List<Application> allAppliedApplications =  applicationDao.getAllAppliedApplications();
//        final List<Application> allReferredApplications =  applicationDao.getAllReferredApplications();
//
//        final List<List<Application>> allApplications = new ArrayList<>();
//        allApplications.add(referralRequestedApplications);
//        allApplications.add(allColdApplications);
//        allApplications.add(allAppliedApplications);
//        allApplications.add(allReferredApplications);
//        return allApplications;
//    }
    public List<Application> getAllReferralRequestedApplications() {
        User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        final List<Application> referralRequestedApplications =  applicationDao.getAllReferralRequestedApplications(user.getId());
        return referralRequestedApplications;
    }
    public List<Application> getAllReferredApplications() {
        User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        final List<Application> allReferredApplications =  applicationDao.getAllReferredApplications(user.getId());
        return allReferredApplications;
    }
    public List<Application> getAllAppliedApplications() {
         User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        final List<Application> allAppliedApplications =  applicationDao.getAllAppliedApplications(user.getId());
        return allAppliedApplications;
    }
    public List<Application> getAllColdApplications() {
         User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        final List<Application> allColdApplications =  applicationDao.getAllColdApplications(user.getId());
        return allColdApplications;
    }
    public List<Application> getAllInterviewApplications() {
         User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        final List<Application> allInterviewApplications =  applicationDao.getAllInterviewApplications(user.getId());
        return allInterviewApplications;
    }
    @Transactional
    public void deleteApplicationById(int id){
        User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        applicationDao.deleteApplicationById(id, user.getId());
    }
    @Transactional
    public void updateApplicationStatus(int id, String status){
        User user = authService.getLoggedInUser();
        if(user == null) throw new ApplicationContextException("User not found");
        if(!applicationDao.idExists(id, user.getId())){
            throw new ApplicationContextException("Id does not exist - " + id );
        }
        Date date = new Date();
        switch (status){
            case "referralRequested":
                System.out.println("Inside service, marking referral requested for id" + id + "on date" + date);
                applicationDao.markReferralRequested(id, date, user.getId());
                break;
            case "referred":
                System.out.println("Inside service, marking referred for id" + id + "on date" + date);
                applicationDao.markReferred(id, date, user.getId());
                break;
            case "applied":
                System.out.println("Inside service, marking applied for id" + id + "on date" + date);
                applicationDao.markApplied(id, date, user.getId());
                break;
            case "interview":
                System.out.println("Inside service, marking interview for id" + id + "on date" + date);
                applicationDao.markInterview(id, date, user.getId());
                break;
            default:
                System.out.println("Bad request");
        }
        System.out.println("Signing off - service");
    }
}
