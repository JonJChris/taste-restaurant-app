package com.restaurant.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="CUSTOMER_LOG_ACTIVITY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerLogActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name="LOG_ENTRY_ID")
    private Long logEntryId;

    @Enumerated(EnumType.STRING)
    @Column(name="LOG_ENTRY_TYPE")
    private LogEntry longEntry;

    @Column(name="LOG_ENTRY_TIMESTAMP")
    private LocalDateTime logEntryTimestamp;

    @ManyToOne
    @JoinColumn(name="CUSTOMER_ID")
    private Customer customer;

}
