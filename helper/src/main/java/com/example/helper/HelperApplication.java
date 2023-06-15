package com.example.helper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;


@SpringBootApplication
@EnableScheduling
public class HelperApplication {

//	@Bean
//	public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
//		ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
//		threadPoolTaskScheduler.setPoolSize(5);
//		threadPoolTaskScheduler.setThreadNamePrefix("ThreadPoolTaskScheduler");
//		return threadPoolTaskScheduler;
//	}


	public static void main(String[] args) {
		SpringApplication.run(HelperApplication.class, args);
	}

}
