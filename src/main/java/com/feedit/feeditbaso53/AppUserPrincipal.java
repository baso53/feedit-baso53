package com.feedit.feeditbaso53;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class AppUserPrincipal implements UserDetails {

    private Users user;

    public AppUserPrincipal (Users user){
        this.user = user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (user.getIsadmin()){
            return Arrays.<GrantedAuthority>asList(
                    () -> "ROLE_ADMIN",
                    () -> "ROLE_USER"
            );
        } else{
            return Arrays.<GrantedAuthority>asList(
                    () -> "ROLE_USER"
            );
        }
    }

    @Override
    public String getPassword() {
        return user.getPass();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId(){
        return user.getUserid();
    }
}
