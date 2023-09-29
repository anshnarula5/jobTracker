package com.jobtracker.rest;

import com.jobtracker.entity.Application;
import com.jobtracker.exception.ApplicationCreationException;
import com.jobtracker.exception.ApplicationNotFoundException;
import com.jobtracker.exception.SuccessResponse;
import com.jobtracker.service.ApplicationService;
import com.jobtracker.utils.ControllerHelper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@Validated
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

    @GetMapping ("/application")
    public List<Application> getAllApplications(){
        return  applicationService.getAllApplications();
    }
    @GetMapping("/")
    public ResponseEntity<List<Application>> getApplications(@RequestParam("query") final String query) {
        List<Application> applications;
        if ("applied".equals(query)) {
            applications = applicationService.getAllAppliedApplications();
        } else if ("referralRequested".equals(query)) {
            applications = applicationService.getAllReferralRequestedApplications();
        }else if ("referred".equals(query)) {
            applications = applicationService.getAllReferredApplications();
        }else if ("cold".equals(query)) {
            applications = applicationService.getAllColdApplications();
        } else {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/application/{id}/{status}")
    public void markReferralRequested(@PathVariable int id, @PathVariable String status){
        System.out.println(status);
        try {
            applicationService.updateApplicationStatus(id, status);
        } catch (Exception e){
            throw new ApplicationNotFoundException(e);
        }
    }
}
