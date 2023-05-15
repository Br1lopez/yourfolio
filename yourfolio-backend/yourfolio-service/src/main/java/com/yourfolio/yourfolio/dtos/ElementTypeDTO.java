package com.yourfolio.yourfolio.dtos;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import lombok.Data;

import java.util.List;

@Data
public class ElementTypeDTO {


    private String id;

    private String name;

    private List<ElementTypeEntity> possibleChildren;

}