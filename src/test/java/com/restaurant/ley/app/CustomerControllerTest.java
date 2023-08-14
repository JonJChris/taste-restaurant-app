package com.restaurant.ley.app;

import com.restaurant.ley.app.controller.CustomerController;
import com.restaurant.ley.app.dto.CustomerAddressDTO;
import com.restaurant.ley.app.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;


@ExtendWith(MockitoExtension.class)
public class CustomerControllerTest {

    MockMvc mockMvc;

    @Mock
    CustomerService customerService;

    @InjectMocks
    CustomerController customerController;

    @BeforeEach
    public void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(customerController).build();
    }

    @Test
    public void getCustomers_Success() throws Exception{
        CustomerAddressDTO e1 = new CustomerAddressDTO (2001L,
                "ADD LINE 1",
                "ADD LINE 2", "CITY", "STATE", "COUNTRY", "PHONE", false);
               ;
        List<CustomerAddressDTO> customerAddressDTOList = List.of(e1);
        Mockito.when(customerService.getCustomerAddress(1001)).thenReturn(customerAddressDTOList);

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/customers/1001/addresses")
                .contentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].addressId").value(2001));

    }
}
