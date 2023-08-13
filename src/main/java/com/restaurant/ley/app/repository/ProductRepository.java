package com.restaurant.ley.app.repository;

import com.restaurant.ley.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("from Product p where p.isActive=true")
    public List<Product> getAllActiveProducts();
}
