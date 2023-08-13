package com.restaurant.ley.app.repository;

import com.restaurant.ley.app.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    public Optional<Customer> findByUserName(String username);
}
