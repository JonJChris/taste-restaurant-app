package com.restaurant.app.transformer;

import com.restaurant.app.dto.CustomerAddressDTO;
import com.restaurant.app.entity.CustomerAddress;

public class CustomerAddressTransformer {

      public static CustomerAddressDTO entityToModel(CustomerAddress customerAddress){
        return new CustomerAddressDTO(customerAddress.getAddressId(),
                customerAddress.getAddressLine1(),
                customerAddress.getAddressLine2(),
                customerAddress.getCity(),
                customerAddress.getState(),
                customerAddress.getCountry(),
                customerAddress.getPhoneNumber(),
                customerAddress.getIsDefault());
    }

    public static CustomerAddress modelToEntity(CustomerAddressDTO customerAddress) {
        return new CustomerAddress(null,
                customerAddress.addressLine1(),
                customerAddress.addressLine2(),
                customerAddress.city(),
                customerAddress.state(),
                customerAddress.country(),
                customerAddress.phoneNumber(),
                customerAddress.isDefault(), null);
    }
}
