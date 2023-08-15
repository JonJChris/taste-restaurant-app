package com.restaurant.app.controller;

import com.restaurant.app.dto.CustomerAddressDTO;
import com.restaurant.app.dto.LoginDTO;
import com.restaurant.app.service.OrderService;
import com.restaurant.app.dto.OrderDTO;
import com.restaurant.app.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
@CrossOrigin(origins = {"http://localhost","http://localhost:3000, 'https://taste-restaurant.onrender.com"})
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    OrderService orderService;

    @GetMapping("/{customerId}/addresses")
    public List<CustomerAddressDTO> getCustomerAddress(@PathVariable @Valid long customerId){
        return customerService.getCustomerAddress(customerId);
    }

    @PostMapping("/{customerId}/addresses")
    public List<CustomerAddressDTO> getCustomerAddress(@PathVariable @Valid long customerId, @RequestBody CustomerAddressDTO customerAddress){
        System.out.println(">>>> "+customerId);
        System.out.println(">>>> "+customerAddress);
        return customerService.addNewCustomerAddress(customerId, customerAddress);
    }


    @GetMapping("/{customerId}/orders")
    public List<OrderDTO> getAllOrdersForCustomer(@PathVariable("customerId") long customerId){
        System.out.println(">> Request : "+customerId);
        List<OrderDTO> ordersForCustomer = customerService.getOrdersForCustomer(customerId);
        System.out.println("::: "+ordersForCustomer);
        return ordersForCustomer;
    }
    @PostMapping("/{customerId}/orders")
    public OrderDTO addNewOrder(@RequestBody OrderDTO orderDetail, @PathVariable("customerId") Long customerId){
        System.out.println("Placing Order **** "+orderDetail);
        return orderService.createNewOrder(orderDetail);
    }

    @GetMapping("/{customerId}/orders/{orderId}")
    public OrderDTO getOrderDetail(@PathVariable("customerId") long customerId,
                                                  @PathVariable("orderId") long orderId){
        System.out.println(">> Request : "+customerId);
        OrderDTO orderDetails = customerService.getOrderDetails(customerId, orderId);
        System.out.println("::: "+orderDetails);
        return orderDetails;
    }

    @PostMapping("login")
    public LoginDTO loginCustomer(@RequestBody LoginDTO loginUser){
        System.out.println("Username "+loginUser.username());
        System.out.println("password "+loginUser.password());
        return customerService.loginUser(loginUser.username(), loginUser.password());

    }
}


