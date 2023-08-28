package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.dbentities.ids.ElementFileEntityId;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@IdClass(ElementFileEntityId.class)
@Table(name = "element_file")
public class ElementFileEntity  {

    @Id
    @Column(name = "file_id")
    private Integer fileId;

    @Id
    @Column(name = "element_id")
    private Integer elementId;

}


