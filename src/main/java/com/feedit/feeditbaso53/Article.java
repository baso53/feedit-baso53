package com.feedit.feeditbaso53;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@ToString(exclude = "usernameid")
public class Article {

    @Id
    @GeneratedValue
    @JsonIgnore()
    private Long articleid;

    private Date datecreated;

    private String title;

    private String link;

    private String author;

    private Integer votes;

    @JsonIgnore
    private Integer usernameid;
}
