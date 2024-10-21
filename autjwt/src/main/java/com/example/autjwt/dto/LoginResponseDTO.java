package com.example.autjwt.dto;

public record LoginResponseDTO(String token, String login, String name, String role) {
}
