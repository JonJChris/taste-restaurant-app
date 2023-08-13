package com.restaurant.ley.app.service;

import com.restaurant.ley.app.dto.ProductDTO;
import com.restaurant.ley.app.entity.Product;
import com.restaurant.ley.app.exceptions.ApplicationException;
import com.restaurant.ley.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
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
