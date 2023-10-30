package com.jobtracker.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "application")
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Getter
@Setter
public class Application {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;

    @Column(name = "user_id")
    public int userId;

    @Column(name = "job_id")
    @NotBlank(message = "jobId cannot be blank")
    @NotNull(message = "jobId cannot be null")
    public final String jobId;

    @NotBlank(message = "companyName cannot be blank")
    @NotNull(message = "companyName cannot be null")
    @Column(name = "company_name")
    public final String companyName;

    @Column(name = "job_link")
    @NotBlank(message = "jobLink cannot be blank")
    @NotNull(message = "jobLink cannot be null")
    public final String jobLink;

    @Column(name = "referral_requested")
    public  Boolean referralRequested;

    @Column(name = "referred")
    public  Boolean referred;

    @Column(name = "applied")
    public  Boolean applied;

    @Column(name = "referral_request_date")
    public  Date referralRequestDate;

    @Column(name = "referred_date")
    public  Date referredDate;

    @Column(name = "applied_date")
    public  Date appliedDate;

    @Column(name = "current_status")
    public String currentStatus;

    @Column(name = "current_status_date")
    public Date currentStatusDate;

    @Column(name = "interview")
    public Boolean interview;

    @Column(name = "interview_date")
    public Date interviewDate;
}
