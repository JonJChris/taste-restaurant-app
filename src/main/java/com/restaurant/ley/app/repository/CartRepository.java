package com.restaurant.ley.app.repository;

import com.restaurant.ley.app.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
