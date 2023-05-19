package com.yourfolio.yourfolio.dbentities.ids;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ElementFileEntityId implements Serializable {
    private Integer fileId;
    private Integer elementId;

}