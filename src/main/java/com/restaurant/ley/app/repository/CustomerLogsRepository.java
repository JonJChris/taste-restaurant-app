package com.restaurant.ley.app.repository;

import com.restaurant.ley.app.entity.CustomerLogActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerLogsRepository extends JpaRepository<CustomerLogActivity, Long> {

}
