package com.restaurant.ley.app.transformer;

import com.restaurant.ley.app.dto.OrderDTO;
import com.restaurant.ley.app.dto.OrderItemDTO;
import com.restaurant.ley.app.entity.Customer;
import com.restaurant.ley.app.entity.CustomerAddress;
import com.restaurant.ley.app.entity.Order;
import com.restaurant.ley.app.entity.OrderStatus;

import java.time.LocalDateTime;

public class OrderTransformer {
    public static OrderDTO entityToModel(Order item) {
        return new OrderDTO(
                item.getOrderId(),
                item.getCustomer().getCustomerId(),
                CustomerAddressTransformer.entityToModel(item.getCustomerAddress()),
                item.getCreatedDate(),
                item.getOrderStatus(),
                item.getOrderTotalPrice(),
                item.getOrderItemList()
                        .stream()
                        .map(orderItem -> new OrderItemDTO(
                                orderItem.getProduct().getProductId(),
                                orderItem.getProduct().getProductName(),
                                orderItem.getQuantity(),
                                orderItem.getProduct().getProductPrice(),
                                orderItem.getTotalPrice())).toList()
                );
    }

    public static Order modelToEntity(Customer customer, CustomerAddress deliveryAddress) {

        Order orderEntity = new Order();

        orderEntity.setCreatedDate(LocalDateTime.now());
        orderEntity.setCustomer(customer);
        orderEntity.setCustomerAddress(deliveryAddress);
        orderEntity.setOrderStatus(OrderStatus.COMPLETED);


        return orderEntity;
    }
}
