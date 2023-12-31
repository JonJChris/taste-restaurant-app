package com.restaurant.app.controller;

import com.restaurant.app.dto.ProductDTO;
import com.restaurant.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("products")
@CrossOrigin(origins = {"http://localhost","http://localhost:3000, 'https://taste-restaurant.onrender.com"})
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public Map<Long,List<ProductDTO>> getAllActiveProducts(){
        return productService.getAllActiveProducts();

    }
}
