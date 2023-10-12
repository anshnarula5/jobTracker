package com.jobtracker.dao;

import com.jobtracker.entity.Application;
import com.jobtracker.entity.ReferralDataResponse;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ApplicationDao {
    Application save(Application application);
    List<Application> getAllApplications();
    List<Application> getAllReferralRequestedApplications();
    List<Application> getAllReferredApplications();
    List<Application> getAllAppliedApplications();
    List<Application> getAllColdApplications();
    void markReferralRequested(int id, Date date);
    void markReferred(int id, Date date);
    void markApplied(int id, Date date);
    Boolean idExists(int id);
    Application getApplicationById(int id);
    ReferralDataResponse getReferralData();

}
