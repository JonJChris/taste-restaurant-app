package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="STOCK")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    @Column(name="STOCK_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long stockId;

    @OneToOne
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name="AVAILABLE_QUANTITY")
    private Long availableQuantity;

}
