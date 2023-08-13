package com.restaurant.ley.app.service;

import com.restaurant.ley.app.dto.OrderDTO;
import com.restaurant.ley.app.dto.OrderItemDTO;
import com.restaurant.ley.app.entity.*;
import com.restaurant.ley.app.exceptions.ApplicationException;
import com.restaurant.ley.app.repository.CustomerRepository;
import com.restaurant.ley.app.repository.OrderRepository;
import com.restaurant.ley.app.repository.ProductRepository;
import com.restaurant.ley.app.transformer.CustomerAddressTransformer;
import com.restaurant.ley.app.transformer.OrderItemTransformer;
import com.restaurant.ley.app.transformer.OrderTransformer;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import java.util.stream.Collectors;

import static com.restaurant.ley.app.transformer.CustomerAddressTransformer.modelToEntity;

@Service
public class OrderService {

    private final static Logger LOG = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ProductRepository productRepository;

    @Transactional
    public OrderDTO createNewOrder(OrderDTO orderDetail) {
        Optional<Customer> customerOptional = customerRepository.findById(orderDetail.customerId());

        if (customerOptional.isEmpty()) {
            throw new ApplicationException("Customer does not exist");
        }

        Customer customer = customerOptional.get();

        CustomerAddress deliveryAddress = null;

        if (orderDetail.deliveryAddress().addressId() > 0) {
            // existing customer address
            List<CustomerAddress> addressList
                    = customer.getCustomerAddressList().stream()
                    .filter(item -> item.getAddressId().equals(orderDetail.deliveryAddress().addressId()))
                    .toList();

            if (addressList.isEmpty()) {
                throw new ApplicationException("Address does not belong to this customer");
            }
            deliveryAddress = addressList.get(0);
        } else {
            // new customer address
            deliveryAddress = modelToEntity(orderDetail.deliveryAddress());
            deliveryAddress.setCustomer(customer);
            // Add new address to customer addresses
            customer.getCustomerAddressList().add(deliveryAddress);
            // save customer in database
            customerRepository.save(customer);
        }

        // check if all the products sent exist in system
        List<Long> productIdList = orderDetail.orderItems().stream().map(OrderItemDTO::productId).toList();

        List<Product> productsList = productRepository.findAllById(productIdList);
        if (productIdList.size() != productsList.size()) {
            throw new ApplicationException("Not all products exists");
        }

        Map<Long, Product> productsMap = productsList.stream().collect(Collectors.toMap(Product::getProductId, Function.identity()));

        // build new order to persist
        Order orderEntity = OrderTransformer.modelToEntity(customer, deliveryAddress);





        List<OrderItem> orderItemList = orderDetail.orderItems().stream()
                .map(item -> new OrderItem(null, orderEntity, productsMap.get(item.productId()), item.productQuantity(), item.itemTotalPrice()))
                .toList();

        orderEntity.setOrderItemList(orderItemList);
        orderEntity.setOrderTotalPrice(orderDetail.orderTotalPrice());
        LOG.info("*****************************************************");
        LOG.info("DELIVERY ADDRESS  : "+orderEntity.getCustomerAddress());
        LOG.info("*****************************************************");
        // save order in database
        Order savedOrder = orderRepository.save(orderEntity);

        return OrderTransformer.entityToModel(savedOrder);
    }


}
