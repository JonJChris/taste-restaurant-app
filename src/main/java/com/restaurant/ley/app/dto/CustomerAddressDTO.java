package com.restaurant.ley.app.dto;

public record CustomerAddressDTO(
        Long addressId,
        String addressLine1,
        String addressLine2,
        String city,
        String state,
        String country,
        String phoneNumber,
        Boolean isDefault) {
}
