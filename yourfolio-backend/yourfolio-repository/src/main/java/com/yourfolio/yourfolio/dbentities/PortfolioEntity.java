package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "portfolio")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToOne(mappedBy = "portfolio", orphanRemoval = true)
    private StyleEntity style;

}