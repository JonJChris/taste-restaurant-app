package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="PRODUCT_CATEGORY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategory {
    @Id
    @Column(name="PRODUCT_CATEGORY_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productCategoryId;

    @Column(name="PRODUCT_CATEGORY_NAME")
    private String productCategoryName;

    @OneToMany(mappedBy = "productCategory", fetch = FetchType.LAZY)
    private List<Product> prooductsList;

}
