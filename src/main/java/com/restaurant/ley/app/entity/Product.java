package com.restaurant.ley.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="PRODUCT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @Column(name="PRODUCT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long productId;

    @Column(name="PRODUCT_NAME")
    private String productName;


    @Column(name="PRODUCT_PRICE")
    private Double productPrice;


    @Column(name="PRODUCT_DESCRIPTION")
    private String productDescription;

    @Column(name="IS_OUT_OF_STOCK")
    private Boolean isOutOfStock;

    @Column(name="IS_ACTIVE")
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name="PRODUCT_CATEGORY_ID")
    private ProductCategory productCategory;

}
