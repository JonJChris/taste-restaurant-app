package com.restaurant.ley.app.transformer;

import com.restaurant.ley.app.dto.OrderItemDTO;
import com.restaurant.ley.app.entity.OrderItem;

public class OrderItemTransformer {
    public static OrderItemDTO modelToEntity(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getProduct().getProductId(),
                orderItem.getProduct().getProductName(),
                orderItem.getQuantity(),
                orderItem.getProduct().getProductPrice(),
                orderItem.getTotalPrice());
    }
}
