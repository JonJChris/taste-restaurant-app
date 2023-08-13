package com.restaurant.ley.app.service;

import com.restaurant.ley.app.entity.Customer;
import com.restaurant.ley.app.entity.CustomerLogActivity;
import com.restaurant.ley.app.entity.LogEntry;
import com.restaurant.ley.app.repository.CustomerLogsRepository;
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
