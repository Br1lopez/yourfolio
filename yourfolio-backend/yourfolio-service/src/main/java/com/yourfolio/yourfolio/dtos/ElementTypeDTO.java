package com.yourfolio.yourfolio.dtos;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.lang.annotation.ElementType;
import java.util.List;

@Data
public class ElementTypeDTO {


    private String id;

    private String name;

    private List<ElementTypeEntity> possibleChildren;

}