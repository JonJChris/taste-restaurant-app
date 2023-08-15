package com.restaurant.app.dto;

public record ProductDTO(
        Long productId,
        String productName,
        Long productCategory,
        String productDescription,
        Double productPrice) {
}
