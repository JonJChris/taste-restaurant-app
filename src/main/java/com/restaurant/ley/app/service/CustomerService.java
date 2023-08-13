package com.restaurant.ley.app.service;

import com.restaurant.ley.app.dto.CustomerAddressDTO;
import com.restaurant.ley.app.dto.LoginDTO;
import com.restaurant.ley.app.dto.OrderDTO;
import com.restaurant.ley.app.entity.Customer;
import com.restaurant.ley.app.entity.CustomerAddress;
import com.restaurant.ley.app.entity.Order;
import com.restaurant.ley.app.exceptions.ApplicationException;
import com.restaurant.ley.app.repository.CustomerRepository;
import com.restaurant.ley.app.transformer.CustomerAddressTransformer;
import com.restaurant.ley.app.transformer.OrderTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerLogActivityService customerLogActivityService;

    public List<CustomerAddressDTO> getCustomerAddress(long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);

        if (customer.isEmpty()) {
            throw new ApplicationException("Customer Not Found");
        }

        return customer.get().getCustomerAddressList().stream().map(CustomerAddressTransformer::entityToModel).toList();
    }

    public List<OrderDTO> getOrdersForCustomer(long customerId){
        Optional<Customer> customerEntity = customerRepository.findById(customerId);

        if(customerEntity.isEmpty()){
            throw new ApplicationException("Customer not found");
        }

        List<Order> customerOrders = customerEntity.get().getCustomerOrders();

        return customerOrders.stream().map(OrderTransformer::entityToModel).toList();

    }

    public List<CustomerAddressDTO> addNewCustomerAddress(Long customerId, CustomerAddressDTO customerAddressDTO){
        if(customerAddressDTO.addressId() != null && customerAddressDTO.addressId().doubleValue() > 0){
            throw new ApplicationException("Address already exists");
        }
        Optional<Customer> customerEntity = customerRepository.findById(customerId);
        if(customerEntity.isEmpty()){
            throw new ApplicationException("Customer not exist");
        }
        CustomerAddress customerAddress = CustomerAddressTransformer.modelToEntity(customerAddressDTO);
        Customer customer = customerEntity.get();
        customerAddress.setCustomer(customer);
        customer.getCustomerAddressList().add(customerAddress);
        Customer customerSaved = customerRepository.save(customer);
        return customerSaved.getCustomerAddressList().stream().map(CustomerAddressTransformer::entityToModel).toList();
    }

    public OrderDTO getOrderDetails(long customerId, long orderId){
        Optional<Customer> customerEntity = customerRepository.findById(customerId);
        if(customerEntity.isEmpty()){
            throw new ApplicationException("Customer not found");
        }
        List<Order> customerOrder = customerEntity.get().getCustomerOrders().stream().filter(item -> item.getOrderId().equals(orderId)).toList();
        if(customerOrder.isEmpty()){
            throw new ApplicationException("Order not found");
        }
        return OrderTransformer.entityToModel(customerOrder.get(0));
    }

    public LoginDTO loginUser(String username, String password){
        Optional<Customer> customerEntity = customerRepository.findByUserName(username);
        if(customerEntity.isEmpty()){
            throw new ApplicationException("Not a valid user name");
        }
        if(!customerEntity.get().getPassword().equals(password)){
            throw new ApplicationException("Not a valid password");
        }
        Customer customer = customerEntity.get();
        customerLogActivityService.customerLoggingIn(customer);
        return new LoginDTO(customer.getCustomerId(), customer.getUserName(), customer.getFirstName(), customer.getLastName(),null);

    }
}
