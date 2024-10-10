package Anagrafica.demo.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Anagrafica.demo.DTO.ReqRes;
import Anagrafica.demo.domain.User;
import Anagrafica.demo.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setRole((registrationRequest.getRole()));
            User userResult = userRepo.save(user);
            if (userResult != null && userResult.getId() > 0) {
                resp.setOurUsers(userResult);
                resp.setMessage("User Saved Successfully!");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes signIn(ReqRes signinRequest) {
        ReqRes resp = new ReqRes();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            var user = userRepo.findByEmail(signinRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            System.out.println("token: " + jwt);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            System.out.println("RefreshToken: " + refreshToken);
            resp.setStatusCode(200);
            resp.setRole(user.getRole());
            resp.setToken(jwt);
            resp.setRefreshToken(refreshToken);
            resp.setExpirationTime("24Hr");
            resp.setMessage("Successfully Signed In!");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes update(ReqRes updateRequest) {
        ReqRes resp = new ReqRes();
        var user = userRepo.findById(updateRequest.getIdentificativo()).orElseThrow();
        try {
            user.setEmail(updateRequest.getEmail());
            if (updateRequest.getPassword().startsWith("$2a")) {
                user.setPassword(updateRequest.getPassword());
            } else {
                user.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
            }
            user.setRole((updateRequest.getRole()));
            userRepo.updateUser(updateRequest.getIdentificativo(), updateRequest.getEmail(),
                    user.getPassword(), updateRequest.getRole());
            resp.setStatusCode(200);
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRegiest) {
        ReqRes resp = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRegiest.getToken());
        User user = userRepo.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRegiest.getToken(), user)) {
            var jwt = jwtUtils.generateToken(user);
            resp.setStatusCode(200);
            resp.setToken(jwt);
            resp.setRefreshToken(refreshTokenRegiest.getToken());
            resp.setExpirationTime("24Hr");
            resp.setMessage("Successfully Refreshed Token!");
        } else {
            resp.setStatusCode(500);
        }
        return resp;
    }

}
