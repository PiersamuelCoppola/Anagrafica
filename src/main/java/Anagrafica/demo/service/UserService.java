package Anagrafica.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Anagrafica.demo.domain.User;
import Anagrafica.demo.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    public User inserisciUser(User user) {
        return userRepo.save(user);
    }

    public User aggiornaUser(User user) {
        User y = userRepo.findById(user.getId()).orElse(null);
        y.setEmail(user.getEmail());
        y.setPassword(user.getPassword());
        return userRepo.save(y);
    }

    public User ricercaUser(Long id) {
        User y = userRepo.findById(id).orElse(null);
        return y;
    }

    public Iterable<User> getAllUser(){
        return userRepo.findAll();
    }

    public void cancellaUser(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByEmail(username).orElseThrow();
    }
}
