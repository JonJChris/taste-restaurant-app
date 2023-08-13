package com.restaurant.ley.app.controller;

import com.restaurant.ley.app.dto.ProductCategoryDTO;
import com.restaurant.ley.app.entity.ProductCategory;
import com.restaurant.ley.app.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("productCategory")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductCategoryController {
    @Autowired
    ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategoryDTO> getProductCategories(){
        return productCategoryService.getProductCategories();
    }
}
