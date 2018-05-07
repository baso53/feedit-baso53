package com.feedit.feeditbaso53;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties("pass")
public class Users {

    @Id
    @GeneratedValue
    private Long userid;

    private String username;

    private String pass;

    private Boolean isadmin;

}
