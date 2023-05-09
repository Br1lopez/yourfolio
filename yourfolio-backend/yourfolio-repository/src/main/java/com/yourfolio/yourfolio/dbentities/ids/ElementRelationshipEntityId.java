package com.yourfolio.yourfolio.dbentities.ids;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;



@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ElementRelationshipEntityId implements Serializable {
    private Integer parentId;
    private Integer childId;

}