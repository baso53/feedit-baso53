package com.feedit.feeditbaso53;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Generated;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString(exclude = "usernameid")
@SequenceGenerator(name = "article_articleid_seq", sequenceName = "article_articleid_seq", allocationSize = 1)
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore()
    private Long articleid;

    @Column(insertable = false)
    private Date datecreated;

    private String title;

    private String link;

    private String author;

    @Nullable
    private String voted;

    @Column(insertable = false)
    private Integer votes;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer usernameid;
}
