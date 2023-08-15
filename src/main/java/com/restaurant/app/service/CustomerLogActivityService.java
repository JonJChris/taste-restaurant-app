package com.restaurant.app.service;

import com.restaurant.app.entity.Customer;
import com.restaurant.app.repository.CustomerLogsRepository;
import com.restaurant.app.entity.CustomerLogActivity;
import com.restaurant.app.entity.LogEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomerLogActivityService {

    @Autowired
    CustomerLogsRepository customerLogsRepository;

    public void customerLoggingIn(Customer customer){
        CustomerLogActivity logActivity = new CustomerLogActivity(null, LogEntry.LOGIN, LocalDateTime.now(), customer);
        customerLogsRepository.save(logActivity);
    }

}
