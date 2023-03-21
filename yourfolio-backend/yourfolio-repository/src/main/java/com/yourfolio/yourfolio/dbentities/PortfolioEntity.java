package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Table(name = "portfolio")
public class PortfolioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    //TODO: comprobar si puede ser lazy
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity user;


    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY)
    private Set<TabEntity> tabs = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Set<TabEntity> getTabs() {
        return tabs;
    }

    public void setTabs(Set<TabEntity> tabs) {
        this.tabs = tabs;
    }
}