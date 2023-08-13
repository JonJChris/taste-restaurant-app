package com.restaurant.ley.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="CART_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name="CART_ITEM_ID")
    private Long cartItemId;

    @ManyToOne
    @JoinColumn(name="CART_ID")
    private Cart cart;

    @OneToOne
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name="QUANTITY")
    private Long quantity;
}
