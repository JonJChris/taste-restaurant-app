package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="CUSTOMER_ADDRESS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAddress {

    @Id
    @Column(name="ADDRESS_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;


    @Column(name="ADDRESS_LINE1")
    private String addressLine1;


    @Column(name="ADDRESS_LINE2")
    private String addressLine2;


    @Column(name="CITY")
    private String city;


    @Column(name="STATE")
    private String State;


    @Column(name="COUNTRY")
    private String country;


    @Column(name="PHONE_NUMBER")
    private String phoneNumber;

    @Column(name="IS_DEFAULT")
    private Boolean isDefault;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

    @Override
    public String toString() {
        return "CustomerAddress{" +
                "addressId=" + addressId +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", city='" + city + '\'' +
                ", State='" + State + '\'' +
                ", country='" + country + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", isDefault=" + isDefault +
                '}';
    }
}
