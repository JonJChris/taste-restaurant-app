package com.restaurant.ley.app.dto;

public record OrderItemDTO(
        Long productId,
        String productName,
        Long productQuantity,
        Double productPrice,
        Double itemTotalPrice) {
}
