package Anagrafica.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import Anagrafica.demo.DTO.ReqRes;
import Anagrafica.demo.service.AuthService;

@CrossOrigin("*")
@Controller
@RequestMapping("/auth")
public class RegistrationController {

    @Autowired
    private AuthService authServ;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signUp(@RequestBody ReqRes signUpRequest) {
        return ResponseEntity.ok(authServ.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signIn(@RequestBody ReqRes signInRequest) {
        return ResponseEntity.ok(authServ.signIn(signInRequest));
    }

    @PatchMapping("/updateUser")
    public ResponseEntity<ReqRes> updateUser(@RequestBody ReqRes updateRequest) {
        return ResponseEntity.ok(authServ.update(updateRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenRequest) {
        return ResponseEntity.ok(authServ.refreshToken(refreshTokenRequest));
    }
}
