package Anagrafica.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Anagrafica.demo.domain.User;
import Anagrafica.demo.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String showUserPage() {
        return "user";
    }

    @PostMapping("/inserisciUser")
    public ResponseEntity<User> inserisciUser(@RequestBody User user) {
        userService.inserisciUser(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PatchMapping("/aggiornaUtente")
    public ResponseEntity<User> aggiornaUser(@RequestBody User user) {
        userService.aggiornaUser(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/ricercaUser/{id}")
    public ResponseEntity<User> ricercaUser(@PathVariable Long id) {
        User y = userService.ricercaUser(id);
        return new ResponseEntity<User>(y, HttpStatus.OK);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<Iterable<User>> getAllUser() {
        return new ResponseEntity<Iterable<User>>(userService.getAllUser(), HttpStatus.OK);
    }

    @DeleteMapping("/cancellaUser/{id}")
    public ResponseEntity<String> cancellaUser(@PathVariable Long id) {
        userService.cancellaUser(id);
        return new ResponseEntity<String>("User con " + id + " cancellato", HttpStatus.OK);
    }

}
