package com.restaurant.app.service;

import com.restaurant.app.dto.ProductCategoryDTO;
import com.restaurant.app.entity.ProductCategory;
import com.restaurant.app.repository.ProductCategoryRepository;
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
