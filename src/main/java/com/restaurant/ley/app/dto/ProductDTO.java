package com.restaurant.ley.app.dto;

public record ProductDTO(
        Long productId,
        String productName,
        Long productCategory,
        String productDescription,
        Double productPrice) {
}
