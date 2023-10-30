package com.jobtracker.dao;

import com.jobtracker.entity.Application;
import com.jobtracker.entity.ReferralDataResponse;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ApplicationDao {
    Application save(Application application);
    List<Application> getAllApplications(int userId);
    void deleteApplicationById(int id, int userId);
    List<Application> getAllReferralRequestedApplications(int userId);
    List<Application> getAllReferredApplications(int userId);
    List<Application> getAllAppliedApplications(int userId);
    List<Application> getAllColdApplications(int userId);
    List<Application> getAllInterviewApplications(int userId);
    void markReferralRequested(int id, Date date, int userId);
    void markReferred(int id, Date date, int userId);
    void markApplied(int id, Date date, int userId);
    void markInterview(int id, Date date, int userId);
    Boolean idExists(int id, int userId);
    Application getApplicationById(int id, int userId);
    ReferralDataResponse getReferralData(int userId);
}
