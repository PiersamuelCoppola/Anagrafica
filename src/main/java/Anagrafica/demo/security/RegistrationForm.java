package Anagrafica.demo.security;

import org.springframework.security.crypto.password.PasswordEncoder;

import Anagrafica.demo.domain.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class RegistrationForm {

    
    private String email;
    @NotNull
    private String password;
    
    private String role;

    public User toUser(PasswordEncoder passwordEncoder) {
        return new User(email, passwordEncoder.encode(password),role);
    }

}
