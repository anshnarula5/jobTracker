package com.jobtracker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JobtrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobtrackerApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(){
		return r -> System.out.println("Hello world");
	}
}
