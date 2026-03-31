package com.placement.config;

/**
 * Authenticated user details stored in the Spring Security context.
 */
public record AuthenticatedUser(Long userId, String username, String role) {
}
