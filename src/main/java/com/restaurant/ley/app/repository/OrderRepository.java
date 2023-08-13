package com.restaurant.ley.app.repository;

import com.restaurant.ley.app.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
