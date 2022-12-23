package com.example.stackoverflowclone.tag.entity;

import com.example.stackoverflowclone.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Blob;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Tag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "tag_name", unique = true)
    @NotNull
    private String tagName;

    @Column(name = "tag_body")
    @Lob
    private String tagBody;

    @Column(name = "tag_url")
    private String tagUrl;

}
