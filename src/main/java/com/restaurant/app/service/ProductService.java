package com.restaurant.app.service;

import com.restaurant.app.entity.Product;
import com.restaurant.app.repository.ProductRepository;
import com.restaurant.app.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public Map<Long, List<ProductDTO>> getAllActiveProducts(){
        List<Product> allActiveProducts = productRepository.getAllActiveProducts();
        Map<Long, List<ProductDTO>> productsMap = allActiveProducts.stream()
                .map(item -> new ProductDTO(item.getProductId(), item.getProductName(), item.getProductCategory().getProductCategoryId(), item.getProductDescription(), (double) Math.round(item.getProductPrice() * 100) /100))
                .collect(Collectors.groupingBy(ProductDTO::productCategory));
//        if(productsMap.isEmpty()){
////            throw new ApplicationException("Data Not Found");
//        }
        return productsMap;
    }

}
