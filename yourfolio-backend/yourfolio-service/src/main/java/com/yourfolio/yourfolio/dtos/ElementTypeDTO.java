package com.yourfolio.yourfolio.dtos;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ElementTypeDTO {


    private String id;

    private String name;

    private boolean male;

    private List<ElementTypeEntity> possibleChildren;

}