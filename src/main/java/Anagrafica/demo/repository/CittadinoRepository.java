package Anagrafica.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Anagrafica.demo.domain.Cittadino;

@Repository
public interface CittadinoRepository extends JpaRepository<Cittadino, Long> {
    
}
