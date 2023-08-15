package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="CART")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name="CART_ID")
    private Long cartId;

    @OneToOne
    @JoinColumn(name="CUSTOMER_ID")
    private Customer customer;

    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY)
    private List<CartItem> cartItemList;
}

