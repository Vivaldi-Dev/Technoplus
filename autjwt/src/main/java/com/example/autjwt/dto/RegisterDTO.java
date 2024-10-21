package com.example.autjwt.dto;


import com.example.autjwt.entity.UserRoles;

public record RegisterDTO(String login, String password, UserRoles role ,String name) {
}
