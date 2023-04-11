package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@IdClass(RelationshipEntityId.class)
@Table(name = "element_element")
public class RelationshipEntity implements Comparable<RelationshipEntity> {

    @Id
    @Column(name = "parent_id")
    private Integer parentId;

    @Id
    @Column(name = "child_id")
    private Integer childId;

    @Column(name = "position")
    private Integer position;

    @Override
    public int compareTo(RelationshipEntity o) {
        return this.getPosition() - o.getPosition();
    }
}


