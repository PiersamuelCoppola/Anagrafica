package Anagrafica.demo.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import Anagrafica.demo.domain.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
/*
 * Classe di supporto che definisce i diversi campi json che le risposte devono
 * ritornare in base alla richiesta effettuata
 */
public class ReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private Long identificativo;
    private String name;
    private String email;
    @NotNull
    private String role;
    private String password;
    private User ourUsers;
}
