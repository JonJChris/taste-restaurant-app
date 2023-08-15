package com.restaurant.app.repository;

import com.restaurant.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("from Product p where p.isActive=true")
    public List<Product> getAllActiveProducts();
}
