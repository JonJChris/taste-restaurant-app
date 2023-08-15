package com.restaurant.app.transformer;

import com.restaurant.app.entity.OrderItem;
import com.restaurant.app.dto.OrderItemDTO;

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
