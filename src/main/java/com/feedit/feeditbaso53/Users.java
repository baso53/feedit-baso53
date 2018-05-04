package com.feedit.feeditbaso53;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue
    private Long userid;

    private String username;

    private String pass;

    private Boolean isadmin;

}
