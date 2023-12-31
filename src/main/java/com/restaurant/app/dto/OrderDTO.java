package com.restaurant.app.dto;

import com.restaurant.app.entity.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDTO(
        Long orderId,
        Long customerId,
        CustomerAddressDTO deliveryAddress,
        LocalDateTime orderDate,
        OrderStatus orderStatus,
        Double orderTotalPrice,
        List<OrderItemDTO> orderItems) {
}
