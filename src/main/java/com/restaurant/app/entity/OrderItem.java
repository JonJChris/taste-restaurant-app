package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="ORDER_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name="ORDER_ID")
    private Order order;

    @ManyToOne
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name="QUANTITY")
    private Long quantity;

    @Column(name="TOTAL_PRICE")
    private Double totalPrice;


}
