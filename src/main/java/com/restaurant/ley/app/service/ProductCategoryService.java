package com.restaurant.ley.app.service;

import com.restaurant.ley.app.dto.ProductCategoryDTO;
import com.restaurant.ley.app.entity.ProductCategory;
import com.restaurant.ley.app.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<ProductCategoryDTO> getProductCategories(){
        List<ProductCategory> ProductCategories = productCategoryRepository.findAll();

        return ProductCategories.stream().map(item -> new ProductCategoryDTO(item.getProductCategoryId(), item.getProductCategoryName())).toList();
    }

}
