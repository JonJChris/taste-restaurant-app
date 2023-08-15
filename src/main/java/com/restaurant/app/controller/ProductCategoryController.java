package com.restaurant.app.controller;

import com.restaurant.app.dto.ProductCategoryDTO;
import com.restaurant.app.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("productCategory")
@CrossOrigin(origins = {"http://localhost","http://localhost:3000, 'https://taste-restaurant.onrender.com"})
public class ProductCategoryController {
    @Autowired
    ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategoryDTO> getProductCategories(){
        return productCategoryService.getProductCategories();
    }
}
