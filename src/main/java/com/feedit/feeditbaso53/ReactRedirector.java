package com.feedit.feeditbaso53;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class ReactRedirector {

    @GetMapping("/api/currentuser")
    @ResponseBody
    public String currentUserName(Authentication authentication) {
        AppUserPrincipal userDetails = (AppUserPrincipal) authentication.getPrincipal();
        return "{\"username\": \"" + userDetails.getUsername() + "\", \"userId\": " + userDetails.getId() + "}";
    }
}
