package Anagrafica.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.http.HttpStatus;
import Anagrafica.demo.domain.Cittadino;
import Anagrafica.demo.service.CittadinoService;
import jakarta.transaction.Transactional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/cittadino", produces = "application/json")
@SessionAttributes("cittadino")
public class CittadinoController {

    @Autowired
    private CittadinoService cittadinoService;

    @GetMapping
    public String showCittadinoPage() {
        return "cittadino";
    }

    @PostMapping("/inserisciCittadino")
    public ResponseEntity<Cittadino> inserisciCittadino(Cittadino cittadino) {
        cittadinoService.inserisciCittadino(cittadino);
        return new ResponseEntity<Cittadino>(cittadino, HttpStatus.OK);
    };

    @PatchMapping("/aggiornaCittadino")
    public ResponseEntity<Cittadino> aggiornaCittadino(Cittadino cittadino) {
        cittadinoService.aggiornaCittadino(cittadino);
        return new ResponseEntity<Cittadino>(cittadino, HttpStatus.OK);
    }

    @GetMapping("/ricercaCittadino/{id}")
    public ResponseEntity<Cittadino> ricercaCittadino(@PathVariable("id") Long id) {
        Cittadino x = cittadinoService.ricercaCittadino(id);
        return new ResponseEntity<Cittadino>(x, HttpStatus.OK);
    }

    @DeleteMapping("/cancellaCittadino/{id}")
    @Transactional
    public ResponseEntity<String> cancellaCittadino(@PathVariable("id") Long id) {
        cittadinoService.cancellaCittadino(id);
        return new ResponseEntity<String>("utente con id: " + id + " cancellato", HttpStatus.OK);
    }

}
