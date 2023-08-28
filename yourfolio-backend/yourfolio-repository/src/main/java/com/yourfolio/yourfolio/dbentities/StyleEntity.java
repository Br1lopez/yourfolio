package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "style")
public class StyleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "bg_color", length = 32)
    private String bgColor;

    @Column(name = "font_color", length = 32)
    private String fontColor;

    @Column(name = "font_family", length = 64)
    private String fontFamily;

    @OneToOne
    @JoinColumn(name = "portfolio_id")
    private ElementEntity portfolio;


}