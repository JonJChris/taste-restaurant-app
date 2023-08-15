package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="CUSTOMER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @Column(name="CUSTOMER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long customerId;


    @Column(name="USERNAME")
    private String userName;


    @Column(name="FIRSTNAME")
    private String firstName;


    @Column(name="LASTNAME")
    private String lastName;


    @Column(name="USER_PASSWORD")
    private String password;

    @Column(name="ACTIVE")
    private Boolean isActive;


    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<CustomerAddress> customerAddressList;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private List<Order> customerOrders;
}
