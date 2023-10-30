package com.jobtracker.rest;

import com.jobtracker.entity.Application;
import com.jobtracker.exception.ApplicationCreationException;
import com.jobtracker.exception.ApplicationNotFoundException;
import com.jobtracker.exception.SuccessResponse;
import com.jobtracker.service.ApplicationService;
import com.jobtracker.utils.ControllerHelper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.*;
import static com.jobtracker.utils.Constants.*;

@RestController
@RequestMapping("/api")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = {"Requester-Type", "Authorization"}, exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials, X-Get-Header"})

public class ApplicationController {
    private final ApplicationService applicationService;
    private final ControllerHelper controllerHelper;
    @Autowired
    public ApplicationController(final ApplicationService applicationService, final ControllerHelper controllerHelper){
        this.applicationService = applicationService;
        this.controllerHelper = controllerHelper;
    }
    @PostMapping("/application")
    public ResponseEntity<SuccessResponse<Application>> createNewApplication(@Valid @RequestBody final Application application,
                                                                             final BindingResult bindingResult){
        controllerHelper.validateInput(bindingResult);
        System.out.println("Creating a new application");
        try {
            Application app = applicationService.createNewApplication(application);
            System.out.println("Added new application - success - controller : " + app.getId());
            return controllerHelper.buildSuccessResponse(app);
        } catch (Exception e){
            System.out.println("Application creation failed");
            throw new ApplicationCreationException(e);
        }
    }

    @GetMapping("/application")
    public ResponseEntity<SuccessResponse<List<Application>>> getApplications(@RequestParam(name = "query", required = false) final String query) {
        System.out.println("Fetching applications");
        List<Application> applications = applicationService.getAllApplications();
        if (APPLIED.equals(query)) {
            applications = applicationService.getAllAppliedApplications();
        } else if (REFERRAL_REQUESTED.equals(query)) {
            applications = applicationService.getAllReferralRequestedApplications();
        }else if (REFERRED.equals(query)) {
            applications = applicationService.getAllReferredApplications();
        }else if (COLD.equals(query)) {
            applications = applicationService.getAllColdApplications();
        }
        else if (INTERVIEW.equals(query)) {
            applications = applicationService.getAllInterviewApplications();
        }
        return controllerHelper.buildSuccessResponse(applications);
    }
    @PutMapping("/application/update/{id}/{status}")
    public void updateStatus(@PathVariable int id, @PathVariable String status){
        System.out.println("Starting update for id : "+ id + " Status : " +  status);
        try {
            applicationService.updateApplicationStatus(id, status);
        } catch (Exception e){
            throw new ApplicationNotFoundException(e);
        }
    }
    @DeleteMapping("/application/delete/{id}")
    public void deleteApplication(@PathVariable int id){
        System.out.println("Got request to delete application with Id " + id);
        try{
            applicationService.deleteApplicationById(id);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
