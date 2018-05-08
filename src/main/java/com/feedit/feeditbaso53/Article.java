package com.feedit.feeditbaso53;

import lombok.Data;
import lombok.ToString;
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

    private Long usernameid;
}
