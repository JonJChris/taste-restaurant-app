package com.restaurant.app.repository;

import com.restaurant.app.entity.CustomerLogActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerLogsRepository extends JpaRepository<CustomerLogActivity, Long> {

}
