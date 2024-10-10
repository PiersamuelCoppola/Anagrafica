package Anagrafica.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Anagrafica.demo.domain.Cittadino;
import Anagrafica.demo.repository.CittadinoRepository;

@Service
public class CittadinoService {

    @Autowired
    private CittadinoRepository cittadinoRepo;

    public Cittadino inserisciCittadino(Cittadino cittadino) {
        return cittadinoRepo.save(cittadino);
    }

    public Cittadino aggiornaCittadino(Cittadino cittadino) {
        Cittadino x = cittadinoRepo.findById(cittadino.getId()).orElse(null);
        x.setNome(cittadino.getNome());
        x.setCognome(cittadino.getCognome());
        x.setCf(cittadino.getCf());
        x.setIndirizzo(cittadino.getIndirizzo());
        x.setCellulare(cittadino.getCellulare());
        return cittadinoRepo.save(x);
    }

    public Cittadino ricercaCittadino(Long id) {
        Cittadino x = cittadinoRepo.findById(id).orElse(null);
        return x;
    }

    public void cancellaCittadino(Long id) {
        cittadinoRepo.deleteById(id);
    }

}
